import {Component, Injectable, Injector, Input, NgModule} from '@angular/core';
import {
  HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app.routing';

export enum OAuthEvent {
  LOGOUT = 'oauth:logout',
  AUTHORIZED = 'oauth:autorized',
  DENIED = 'oauth:denied',
}

export interface OAuthConfig {
  clientId: string
  redirectUri?: URL | string
  profileUri?: URL | string
  scope?: string
  state?: string
  storage?: Storage
}

export interface ResourceOAuthConfig extends OAuthConfig {
  tokenPath: URL | string
  username: string
  password: string
  clientSecret: string
  grantType?: string
}

export interface ImplicitOAuthConfig extends OAuthConfig {
  authorizePath: URL | string
  responseType?: string
}

export class DefaultOAuthConfig implements ResourceOAuthConfig, ImplicitOAuthConfig {
  authorizePath = null;
  tokenPath = null;
  profileUri = null;
  redirectUri = window.location.origin;
  clientId = 'client';
  clientSecret = '';
  grantType = 'password';
  username = '';
  password = '';
  responseType = 'token';
  scope = '';
  state = '';
  storage = sessionStorage;
}

@Injectable()
export class OAuthService extends DefaultOAuthConfig {

  status = OAuthEvent.LOGOUT;
  timer: any;
  profile: any;
  token: {
    access_token?: string
    refresh_token?: string
    token_type?: string
    state?: string
    error?: string
    expires_in?: Number
  };

  constructor(protected http: HttpClient, protected router: Router) {
    super();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url.match('/#access_token=')) {
        const hash = event.url.substr(2);
        const params = this.parseOauthUri(hash);
        if (params) {
          this.cleanLocationHash();
          this.setToken(params);
        }
      }
    });
  }

  init() {
    const tokenStr = this.storage['token'];
    if (tokenStr) {
      const token = JSON.parse(tokenStr);
      if (token && token.access_token) {
        this.setToken(token);
      }
    }
  }

  configure(oauthConfig: ResourceOAuthConfig | ImplicitOAuthConfig) {
    Object.assign(this, oauthConfig);
    this.init();
  }

  login() {
    if (this.authorizePath) {
      console.log('Authorize');
      const appendChar = this.authorizePath.indexOf('?') === -1 ? '?' : '&';
      const authUrl = `${this.authorizePath}${appendChar}response_type=${this.responseType}&client_id=${this.clientId
        }&redirect_uri=${this.redirectUri}&scope=${this.scope}&state=${this.state}`;
      location.replace(authUrl);
    }
    if (this.tokenPath) {
      console.log('Tokenize');
      const appendChar = this.tokenPath.indexOf('?') === -1 ? '?' : '&';
      const authUrl = `${this.tokenPath}${appendChar}client_id=${this.clientId}&client_secret=${this.clientSecret
        }&grant_type=${this.grantType}&username=${this.username}&password=${this.password}`;
      this.http.post(authUrl, null).subscribe(params => this.setToken(params));
    }
  }

  logout() {
    delete this.storage['token'];
    delete this.token;
    this.status = OAuthEvent.LOGOUT;
  }

  private setToken(params) {
    if (params.error) {
      this.status = OAuthEvent.DENIED;
      return;
    }
    this.token = this.token || {};
    Object.assign(this.token, params);
    this.storage['token'] = JSON.stringify(this.token);
    this.status = OAuthEvent.AUTHORIZED;
    this.startExpirationTimer();
    if (this.profileUri) {
      this.http.get(this.profileUri, {
        headers: {
          Authorization: `Bearer ${this.token.access_token}`
        }
      }).subscribe(profile => this.profile = profile);
    }
  }

  private startExpirationTimer() {
    clearTimeout(this.timer);
    if (this.token.expires_in) {
      this.timer = setTimeout(() => {
        if (this.tokenPath && this.token.refresh_token) {
          const appendChar = this.tokenPath.indexOf('?') === -1 ? '?' : '&';
          const authUrl = `${this.tokenPath}${appendChar}refresh_token=${this.token.refresh_token
            }&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=&grant_type=refresh_token`;
          this.http.post(authUrl, null).subscribe(params => this.setToken(params));
        } else {
          this.logout();
        }
      }, Number(this.token.expires_in) * 1000);
    }
  }

  private parseOauthUri(hash) {
    const regex = /([^&=]+)=([^&]*)/g;
    let params = {};
    let m;
    while ((m = regex.exec(hash)) !== null) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (params['access_token'] || params['error']) {
      return params;
    }
  }

  private cleanLocationHash() {
    let curHash = location.hash;
    const haskKeys = ['#access_token', 'token_type', 'expires_in', 'scope', 'state', 'error', 'error_description'];
    haskKeys.forEach((hashKey) => {
      const re = new RegExp('&' + hashKey + '(=[^&]*)?|^' + hashKey + '(=[^&]*)?&?');
      curHash = curHash.replace(re, '');
    });
    location.hash = curHash;
  }
}

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {

  private oauth: OAuthService;

  constructor(injector: Injector) {
    setTimeout(() => this.oauth = injector.get(OAuthService));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.oauth && this.oauth.token && this.oauth.token.access_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.oauth.token.access_token}`
        }
      });
    }
    return next.handle(req);
  }
}

@Component({
  selector: 'my-implicit-oauth',
  template: `
    <a href="#" class="oauth {{className}}">
      <span *ngIf="isLogout()" (click)="oauth.login()">{{i18nLogin}}</span>
      <span *ngIf="isAuthorized()" (click)="oauth.logout()">{{i18nLogout}}&nbsp;<strong>{{getEmail()}}</strong></span>
      <span *ngIf="isDenied()" (click)="oauth.login()">{{i18nDenied}}</span>
    </a>
  `
})
export class ImplicitOAuthComponent {

  @Input()
  className: string;
  @Input()
  i18nLogin = 'Sign in';
  @Input()
  i18nLogout = 'Logout';
  @Input()
  i18nDenied = 'Access denied. Try Again';

  @Input()
  set storage(storage: Storage) {
    this.oauth.storage = storage;
  }

  @Input()
  set oauthConfig(oauthConfig: ImplicitOAuthConfig) {
    this.oauth.configure(oauthConfig);
  }

  constructor(protected oauth: OAuthService) {
  }

  isLogout() {
    return this.oauth.status === OAuthEvent.LOGOUT;
  }

  isAuthorized() {
    return this.oauth.status === OAuthEvent.AUTHORIZED;
  }

  isDenied() {
    return this.oauth.status === OAuthEvent.DENIED;
  }

  getEmail() {
    return this.oauth.profile ? this.oauth.profile.name : '';
  }
}

@Component({
  selector: 'my-resource-oauth',
  template: `
    // TODO
  `
})
export class ResourceOAuthComponent {
  // TODO
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    ImplicitOAuthComponent,
    ResourceOAuthComponent
  ],
  exports: [
    ImplicitOAuthComponent,
    ResourceOAuthComponent
  ],
  providers: [
    OAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OAuthInterceptor,
      multi: true,
    }
  ]
})
export class OAuthModule {
}


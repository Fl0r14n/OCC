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
  authorizePath: URL | string
  tokenPath?: URL | string
  responseType?: string
  redirectUri?: URL | string
  profileUri?: URL | string
  clientId: string
  scope?: string
  state?: string
  storage?: Storage
}

export class DefaultOAuthConfig implements OAuthConfig {
  authorizePath = 'http://localhost/oauth/authorize';
  tokenPath = 'http://localhost/oauth/token';
  profileUri = null;
  responseType = 'token';
  redirectUri = window.location.origin;
  clientId = 'client';
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
    token_type?: string
    state?: string
    error?: string
    expires_in?: Number
    expires_at?: Date
  };

  constructor(protected http: HttpClient, protected router: Router) {
    super();
    this.init();
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

  configure(oauthConfig: OAuthConfig) {
    Object.assign(this, oauthConfig);
    this.init();
  }

  login() {
    const appendChar = this.authorizePath.indexOf('?') === -1 ? '?' : '&';
    const authUrl = `${this.authorizePath}${appendChar}response_type=${this.responseType}&client_id=${this.clientId
      }&redirect_uri=${this.redirectUri}&scope=${this.scope}&state=${this.state}`;
    location.replace(authUrl);
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
      console.log('Profile');
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
        this.logout();
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
      console.log('Add Authorization header');
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
  selector: 'my-oauth',
  template: `
    <a href="#" class="oauth {{className}}">
      <span *ngIf="isLogout()" (click)="oauth.login()">{{i18nLogin}}</span>
      <span *ngIf="isAuthorized()" (click)="oauth.logout()">{{i18nLogout}}&nbsp;<strong>{{getEmail()}}</strong></span>
      <span *ngIf="isDenied()" (click)="oauth.login()">{{i18nDenied}}</span>
    </a>
  `
})
export class OAuthComponent {

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
  set oauthConfig(oauthConfig: OAuthConfig) {
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

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    OAuthComponent,
  ],
  exports: [
    OAuthComponent
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


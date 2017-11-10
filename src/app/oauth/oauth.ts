import {Component, Injectable, Input, NgModule} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app.routing';

export enum OAuthEvent {
  LOGOUT = 'oauth:logout',
  EXPIRED = 'oauth:expired',
  AUTHORIZED = 'oauth:autorized',
  DENIED = 'oauth:denied',
  PROFILE = 'oauth:profile'
}

export interface OAuthConfig {
  authorizePath: string
  responseType?: string
  redirectUri?: string
  profileUri?: string
  clientId: string
  scope?: string
  state?: string
  storage?: Storage
}

export class DefaultOAuthConfig implements OAuthConfig {
  authorizePath = 'http://localhost/oauth/authorize';
  responseType = 'token';
  redirectUri = window.location.origin;
  profileUri = `http://localhost/oauth/profile`;
  clientId = 'client';
  scope = '';
  state = '';
  storage = sessionStorage;
}

@Injectable()
export class OAuthService extends DefaultOAuthConfig implements HttpInterceptor {

  status = OAuthEvent.LOGOUT;
  token: {
    access_token?: string
    token_type?: string
    state?: string
    error?: string
    expires_in?: string
    expires_at?: Date
  };

  constructor(protected http: HttpClient, protected router: Router) {
    super();
    const tokenStr = this.storage['token'];
    if (tokenStr) {
      const token = JSON.parse(tokenStr);
      if (token && token.access_token) {
        this.setToken(token);
      }
    }
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

  configure(oauthConfig: OAuthConfig) {
    Object.assign(this, oauthConfig);
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

  expired() {

  }

  profile(): Observable<any> {
    // TODO
    return this.http.get(this.profileUri);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token && this.token.access_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    return next.handle(req);
  }

  private setToken(params) {
    if (params.error) {
      this.status = OAuthEvent.DENIED;
      return;
    }
    this.token = this.token || {};
    Object.assign(this.token, params);
    this.setExpires();
    this.storage['token'] = JSON.stringify(this.token);
    this.setExpiredAtEvent();
    this.status = OAuthEvent.AUTHORIZED;
  }

  private setExpires() {
    if (!this.token) {
      return;
    }
    if (typeof (this.token.expires_in) !== 'undefined' && this.token.expires_in !== null) {
      let expires_at = new Date();
      // 60 seconds less to secure browser and response latency
      expires_at.setSeconds(expires_at.getSeconds() + Number(this.token.expires_in) - 60);
      this.token.expires_at = expires_at;
    } else {
      this.token.expires_at = null;
    }
  }

  private setExpiredAtEvent() {
    if (typeof (this.token.expires_at) === 'undefined' || this.token.expires_at === null) {
      return;
    }
    const time = Number(new Date(this.token.expires_at)) - Number(new Date());
    if (time) {
      setTimeout(() => {
        this.status = OAuthEvent.EXPIRED;
      }, time);
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
    // TODO
    return 'Test';
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
  ]
})
export class OAuthModule {
}


import {Component} from '@angular/core';
import {OAuthConfig} from '../../oauth/oauth';

@Component({
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OAuthConfig {
  authorizePath = 'http://localhost:9001/authorizationserver/oauth/authorize';
  tokenPath = 'http://localhost:9001/authorizationserver/oauth/token';
  profileUri = 'http://localhost:9001/rest/v2/electronics/users/current';
  redirectUri = window.location.origin;
  responseType = 'token';
  clientId = 'client-side';
  scope = 'basic';
}

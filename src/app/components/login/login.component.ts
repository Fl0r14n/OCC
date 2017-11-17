import {Component} from '@angular/core';
import {ImplicitOAuthConfig, OAuthConfig, ResourceOAuthConfig} from '../../oauth/oauth';

export class ImplicitOauthSettings implements ImplicitOAuthConfig {
  authorizePath = 'http://localhost:9001/authorizationserver/oauth/authorize';
  profileUri = 'http://localhost:9001/rest/v2/electronics/users/current';
  clientId = 'client-side';
  scope = 'basic';
}

export class ResourceOAuthSettings implements ResourceOAuthConfig {
  tokenPath = 'https://localhost:9002/authorizationserver/oauth/token';
  profileUri = 'http://localhost:9001/rest/v2/electronics/users/current';
  clientId = 'mobile_android';
  clientSecret = 'secret';
  username = '';
  password = '';
}

@Component({
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent extends ResourceOAuthSettings {

  constructor() {
    super()
  }
}

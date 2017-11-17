import {Component} from '@angular/core';
import {ImplicitOAuthConfig, OAuthConfig, ResourceOAuthConfig} from '../../oauth/oauth';

export class ImplicitOauthSettings implements ImplicitOAuthConfig {
  authorizePath = '/authorizationserver/oauth/authorize';
  profileUri = '/rest/v2/electronics/users/current';
  clientId = 'client-side';
  scope = 'basic';
}

export class ResourceOAuthSettings implements ResourceOAuthConfig {
  tokenPath = '/authorizationserver/oauth/token';
  profileUri = '/rest/v2/electronics/users/current';
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

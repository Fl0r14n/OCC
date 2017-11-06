import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ForgottenPasswordTokensService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/forgottenpasswordtokens`;
  }

  resetForgottenPasswordToken(userId: string): Observable<void> {
    return this.post<void>(this.toHttpParams({
      userId: userId
    }), null, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }
}

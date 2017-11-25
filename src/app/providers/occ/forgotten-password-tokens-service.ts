import {RestService} from '../rest-service';
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

  /**
   * Generates a token to restore customer's forgotten password.
   * @param {string} userId Customer's user id. Customer user id is case insensitive.
   * @returns {Observable<void>}
   */
  resetForgottenPasswordToken(userId: string): Observable<void> {
    return this.post<void>(this.toHttpParams({userId: userId}));
  }
}

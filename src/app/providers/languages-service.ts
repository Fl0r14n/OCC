import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LanguageListWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LanguagesService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/languages`;
  }

  getLanguages(): Observable<LanguageListWsDTO> {
    return this.query<LanguageListWsDTO>();
  }
}

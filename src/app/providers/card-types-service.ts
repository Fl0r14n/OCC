import {Injectable} from '@angular/core';
import {RestService} from './rest-service';
import {CardTypeListWsDTO, CardTypeWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CardTypesService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/cardtypes`;
  }

  /**
   * Lists supported payment card types.
   * @returns {Observable<CardTypeListWsDTO>}
   */
  getCardTypes(): Observable<CardTypeListWsDTO> {
    return this.query<CardTypeListWsDTO>();
  }
}

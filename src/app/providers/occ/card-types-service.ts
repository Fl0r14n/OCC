import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../rest-service';
import {CardTypeListWsDTO, RequestWsDTO} from '../types/ycommercewebservices';

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
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<CardTypeListWsDTO>}
   */
  getCardTypes(queryParams?: RequestWsDTO): Observable<CardTypeListWsDTO> {
    return this.query<CardTypeListWsDTO>({params: queryParams});
  }
}

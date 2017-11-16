import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LanguageListWsDTO, RequestWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LanguagesService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/languages`;
  }

  /**
   * Lists all available languages (all languages used for a particular store).<br/>
   * If the list of languages for a base store is empty, a list of all languages available in the system will be returned.
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<LanguageListWsDTO>}
   */
  getLanguages(queryParams?: RequestWsDTO): Observable<LanguageListWsDTO> {
    return this.query<LanguageListWsDTO>({params: queryParams});
  }
}

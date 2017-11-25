import {RestService} from '../rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RequestWsDTO, TitleListWsDTO} from '../types/ycommercewebservices';

@Injectable()
export class TitlesService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/titles`;
  }

  /**
   * Lists all localized titles.
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<TitleListWsDTO>}
   */
  getTitles(queryParams?: RequestWsDTO): Observable<TitleListWsDTO> {
    return this.query<TitleListWsDTO>({params: queryParams});
  }
}

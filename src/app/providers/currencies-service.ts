import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {CurrencyListWsDTO, RequestWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CurrenciesService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/currencies`;
  }

  /**
   * Lists all available currencies (all usable currencies for the current store).<br/>
   * If the list of currencies for stores is empty, a list of all currencies available in the system is returned.
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<CurrencyListWsDTO>}
   */
  getCurrencies(queryParams?: RequestWsDTO): Observable<CurrencyListWsDTO> {
    return this.query<CurrencyListWsDTO>({params: queryParams});
  }
}

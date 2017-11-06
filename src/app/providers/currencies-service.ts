import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {CurrencyListWsDTO} from './types/ycommercewebservices';
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

  getCurrencies(): Observable<CurrencyListWsDTO> {
    return this.query<CurrencyListWsDTO>();
  }
}

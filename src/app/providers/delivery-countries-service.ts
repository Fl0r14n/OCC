import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {CountryListWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DeliveryCountriesService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/deliverycountries`;
  }

  /**
   * Lists all supported delivery countries for the current store. The list is sorted alphabetically.
   * @returns {Observable<CountryListWsDTO>}
   */
  getDeliveryCountries(): Observable<CountryListWsDTO> {
    return this.query<CountryListWsDTO>();
  }
}

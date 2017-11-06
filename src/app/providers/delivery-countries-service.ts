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

  getDeliveryCountries(): Observable<CountryListWsDTO> {
    return this.query<CountryListWsDTO>();
  }
}

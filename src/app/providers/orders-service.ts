import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OrderWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrdersService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/orders`;
  }

  getOrder(code: string): Observable<OrderWsDTO> {
    return this.get<OrderWsDTO>(code);
  }
}

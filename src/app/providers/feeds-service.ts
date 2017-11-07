import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OrderStatusUpdateElementListWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';

export interface OrderStatusUpdateQueryParams {
  timestamp?: Date
}

@Injectable()
export class FeedsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/feeds`;
  }

  getOrderStatusUpdate(queryParams?: OrderStatusUpdateQueryParams): Observable<OrderStatusUpdateElementListWsDTO> {
    return this.get<OrderStatusUpdateElementListWsDTO>(`orders/statusfeed`, {params: queryParams});
  }
}

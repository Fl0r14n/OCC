import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OrderStatusUpdateElementListWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FeedsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/feeds`;
  }

  /**
   * Returns the orders the status has changed for.
   * Returns only the elements from the current baseSite, updated after the provided timestamp.
   * @param {{timestamp?: Date}} queryParams
   * @returns {Observable<OrderStatusUpdateElementListWsDTO>}
   */
  getOrderStatusUpdate(queryParams?: {
    /**
     * Only items newer than the given parameter are retrieved. This parameter should be in RFC-8601 format.
     */
    timestamp?: Date
  }): Observable<OrderStatusUpdateElementListWsDTO> {
    return this.get<OrderStatusUpdateElementListWsDTO>(`orders/statusfeed`, {params: queryParams});
  }
}

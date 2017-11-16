import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OrderWsDTO, RequestWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrdersService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/orders`;
  }

  /**
   * Returns details of a specific order based on order GUID (Globally Unique Identifier) or order CODE.<br/>
   * The response contains a detailed order information.
   * @param {string} code Order GUID (Globally Unique Identifier) or order CODE
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<OrderWsDTO>}
   */
  getOrder(code: string, queryParams?: RequestWsDTO): Observable<OrderWsDTO> {
    return this.get<OrderWsDTO>(code, {params: queryParams});
  }
}

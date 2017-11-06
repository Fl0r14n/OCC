import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {ProductListWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface ExportQueryParams {
  pageSize?: number
  currentPage?: number
}

@Injectable()
export class ExportService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/export`;
  }

  getProducts(queryParams?: ExportQueryParams): Observable<ProductListWsDTO> {
    return this.get(`products`, queryParams);
  }
}

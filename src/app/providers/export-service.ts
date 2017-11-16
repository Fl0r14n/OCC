import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {PageableRequestWsDTO, ProductListWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ExportService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/export`;
  }

  /**
   * Used for product export.
   * Depending on the timestamp parameter, it can return all products or only products modified after the given time.
   * @param {{catalog?: string; version?: string; timestamp?: Date} & PageableRequestWsDTO} queryParams
   * @returns {Observable<ProductListWsDTO>}
   */
  getProducts(queryParams?: {
    /**
     * Catalog from which get products. Must be provided along with version.
     */
    catalog?: string
    /**
     * Catalog version. Must be provided along with catalog.
     */
    version?: string
    /**
     * When this parameter is set, only products modified after given time will be returned.
     * This parameter should be in RFC-8601 format.
     */
    timestamp?: Date
  } & PageableRequestWsDTO): Observable<ProductListWsDTO> {
    return this.get(`products`, {params: queryParams});
  }
}

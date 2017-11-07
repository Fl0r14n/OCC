import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PointOfServiceWsDTO, StoreFinderSearchPageWsDTO} from './types/ycommercewebservices';
import {Observable} from 'rxjs/Observable';
import {RestService} from './rest-service';

export interface StoreQueryParams {
  /**
   * Location in natural language i.e. city or country.
   */
  query?: string
  /**
   * Coordinate that specifies the north-south position of a point on the Earth's surface.
   */
  latitude?: number
  /**
   * The number of results returned per page. 20 default
   */
  pageSize?: number
  /**
   * Accuracy in meters.
   */
  accuracy?: number
  /**
   * Sorting method applied to the return results.
   */
  sort?: string
  /**
   * The current result page requested.
   */
  currentPage?: number
  /**
   * Radius in meters. Max value: 40075000.0 (Earth's perimeter).
   */
  radius?: number
  /**
   * Coordinate that specifies the east-west position of a point on the Earth's surface.
   */
  longitude?: number
}

@Injectable()
export class StoresService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/stores`;
  }

  getStores(queryParams?: StoreQueryParams): Observable<StoreFinderSearchPageWsDTO> {
    return this.query<StoreFinderSearchPageWsDTO>({params: queryParams});
  }

  getStore(storeId?: string): Observable<PointOfServiceWsDTO> {
    return this.get(storeId);
  }
}

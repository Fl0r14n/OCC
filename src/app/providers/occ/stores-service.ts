import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  PointOfServiceWsDTO, RequestWsDTO, SortableRequestWsDTO, StoreFinderSearchPageWsDTO
} from '../types/ycommercewebservices';
import {Observable} from 'rxjs/Observable';
import {RestService} from '../rest-service';

@Injectable()
export class StoresService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/stores`;
  }

  /**
   * Lists all store locations that are near the location specified in a query or based on latitude and longitude.
   * @param {{query?: string; latitude?: number; accuracy?: number; radius?: number; longitude?: number} & SortableRequestWsDTO} queryParams
   * @returns {Observable<StoreFinderSearchPageWsDTO>}
   */
  getStores(queryParams?: {
    /**
     * Location in natural language i.e. city or country.
     */
    query?: string
    /**
     * Coordinate that specifies the north-south position of a point on the Earth's surface.
     */
    latitude?: number
    /**
     * Accuracy in meters.
     */
    accuracy?: number
    /**
     * Radius in meters. Max value: 40075000.0 (Earth's perimeter).
     */
    radius?: number
    /**
     * Coordinate that specifies the east-west position of a point on the Earth's surface.
     */
    longitude?: number
  } & SortableRequestWsDTO): Observable<StoreFinderSearchPageWsDTO> {
    return this.query<StoreFinderSearchPageWsDTO>({params: queryParams});
  }

  /**
   * Returns store location based on its unique name.
   * @param {string} storeId. Store identifier (currently store name)
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<PointOfServiceWsDTO>}
   */
  getStore(storeId?: string, queryParams?: RequestWsDTO): Observable<PointOfServiceWsDTO> {
    return this.get(storeId, {params: queryParams});
  }
}

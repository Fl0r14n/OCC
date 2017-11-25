import {RestService} from '../rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PromotionListWsDTO, PromotionWsDTO, RequestWsDTO} from '../types/ycommercewebservices';

export enum PromotionType {
  ALL = 'all',
  PRODUCT = 'product',
  ORDER = 'order'
}

@Injectable()
export class PromotionsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/promotions`;
  }

  /**
   * Returns promotions defined for a current base site.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {{promotionGroup?: string; type?: PromotionType} & RequestWsDTO} queryParams
   * @returns {Observable<PromotionListWsDTO>}
   */
  getPromotions(queryParams?: {
    /**
     * Only promotions from this group are returned
     */
    promotionGroup?: string
    /**
     * Defines what type of promotions should be returned.
     */
    type?: PromotionType
  } & RequestWsDTO): Observable<PromotionListWsDTO> {
    return this.query<PromotionListWsDTO>({params: queryParams});
  }

  /**
   * Returns details of a single promotion specified by a promotion code.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {string} code. Promotion identifier (code)
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<PromotionWsDTO>}
   */
  getPromotion(code?: string, queryParams?: RequestWsDTO): Observable<PromotionWsDTO> {
    return this.get(code, {params: queryParams});
  }
}

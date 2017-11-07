import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PromotionListWsDTO, PromotionWsDTO} from './types/ycommercewebservices';

export interface PromotionQueryParams {
  /**
   * Only promotions from this group are returned
   */
  promotionGroup?: string
}

@Injectable()
export class PromotionsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/promotions`;
  }

  getPromotions(queryParams?: PromotionQueryParams): Observable<PromotionListWsDTO> {
    return this.query<PromotionListWsDTO>({params: queryParams});
  }

  getPromotion(code?: string): Observable<PromotionWsDTO> {
    return this.get(code);
  }
}

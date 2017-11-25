import {RestService} from '../rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
  PageableRequestWsDTO,
  ProductExpressUpdateElementListWsDTO, ProductReferenceListWsDTO,
  ProductSearchPageWsDTO, ProductWsDTO, RequestWsDTO, ReviewListWsDTO, ReviewWsDTO, SortableRequestWsDTO, StockWsDTO,
  StoreFinderStockSearchPageWsDTO,
  SuggestionListWsDTO
} from '../types/ycommercewebservices';

export enum ProductReferenceType {
  ACCESSORIES = 'ACCESSORIES',
  BASE_PRODUCT = 'BASE_PRODUCT',
  CONSISTS_OF = 'CONSISTS_OF',
  DIFF_ORDERUNIT = 'DIFF_ORDERUNIT',
  FOLLOWUP = 'FOLLOWUP',
  MANDATORY = 'MANDATORY',
  SIMILAR = 'SIMILAR',
  SELECT = 'SELECT',
  SPAREPART = 'SPAREPART',
  OTHERS = 'OTHERS',
  UPSELLING = 'UPSELLING',
  CROSSELLING = 'CROSSELLING'
}

@Injectable()
export class ProductsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/products`;
  }

  /**
   * Returns products added to the express update feed.
   * Returns only elements updated after the provided timestamp.The queue is cleared using a defined cronjob.
   * @param {{catalog?: string; timestamp?: Date} & RequestWsDTO} queryParams
   * @returns {Observable<ProductExpressUpdateElementListWsDTO>}
   */
  getExpressUpdate(queryParams?: {
    /**
     * Only products from this catalog are returned. Format: catalogId:catalogVersion
     */
    catalog?: string
    /**
     * Only items newer than the given parameter are retrieved from the queue. This parameter should be in RFC-8601 format.
     */
    timestamp?: Date
  } & RequestWsDTO): Observable<ProductExpressUpdateElementListWsDTO> {
    return this.get<ProductExpressUpdateElementListWsDTO>(`expressupdate`, {params: queryParams});
  }

  /**
   * Returns a list of products and additional data such as: available facets, available sorting and pagination options.<br/>
   * It can include spelling suggestions.To make spelling suggestions work you need to:<br/>
   *  * Make sure enableSpellCheck on the SearchQuery is set to true. By default it should be already set to true. <br/>
   *  * Have indexed properties configured to be used for spellchecking.
   * @param {{query?: string} & SortableRequestWsDTO} queryParams
   * @returns {Observable<ProductSearchPageWsDTO>}
   */
  search(queryParams?: {
    /**
     * Serialized query, free text search, facets.
     * The format of a serialized query: freeTextSearch:sort:facetKey1:facetValue1:facetKey2:facetValue2
     */
    query?: string
  } & SortableRequestWsDTO): Observable<ProductSearchPageWsDTO> {
    return this.get<ProductSearchPageWsDTO>(`search`, {params: queryParams});
  }

  /**
   * Returns a list of all available suggestions related to a given term and limits the results to a specific value of the max parameter.
   * @param {{max?: number; term?: string} & RequestWsDTO} queryParams
   * @returns {Observable<SuggestionListWsDTO>}
   */
  suggestions(queryParams?: {
    /**
     * Specifies the limit of results. 10 default
     */
    max?: number
    /**
     * Specified term
     */
    term?: string
  } & RequestWsDTO): Observable<SuggestionListWsDTO> {
    return this.get<SuggestionListWsDTO>(`search`, {params: queryParams});
  }

  /**
   * Returns details of a single product according to a product code.
   * @param {string} productCode. Product identifier
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<ProductWsDTO>}
   */
  getProduct(productCode?: string, queryParams?: RequestWsDTO): Observable<ProductWsDTO> {
    return this.get<ProductWsDTO>(productCode, {params: queryParams});
  }

  /**
   * Returns references for a product with a given product code. Reference type specifies which references to return.
   * @param {string} productCode. Product identifier
   * @param {{referenceType?: ProductReferenceType} & PageableRequestWsDTO} queryParams
   * @returns {Observable<ProductReferenceListWsDTO>}
   */
  getProductReferences(productCode?: string, queryParams?: {
    /**
     * Response configuration (list of fields, which should be returned in response) DEFAULT
     */
    referenceType?: ProductReferenceType
  } & PageableRequestWsDTO): Observable<ProductReferenceListWsDTO> {
    return this.get<ProductReferenceListWsDTO>(`${productCode}/references`, {params: queryParams});
  }

  /**
   * Returns the reviews for a product with a given product code.
   * @param {string} productCode. Product identifier
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<ReviewListWsDTO>}
   */
  getProductReviews(productCode?: string, queryParams?: RequestWsDTO): Observable<ReviewListWsDTO> {
    return this.get<ReviewListWsDTO>(`${productCode}/reviews`, {params: queryParams});
  }

  /**
   * Creates a new customer review as an anonymous user.
   * @param {string} productCode. Product identifier
   * @param {ReviewWsDTO} review
   * @returns {Observable<ReviewWsDTO>}
   */
  addProductReview(productCode?: string, review?: ReviewWsDTO): Observable<ReviewWsDTO> {
    return this.postAt<ReviewWsDTO>(`${productCode}/reviews`, review);
  }

  /**
   * Returns product's stock levels sorted by distance from specific location
   * passed by free-text parameter or longitude and latitude parameters. <br/>
   * The following two sets of parameters are available:<br/>
   * * location (required), currentPage (optional), pageSize (optional) or <br/>
   * * longitude (required), latitude (required), currentPage (optional), pageSize(optional).
   * @param {string} productCode
   * @param {{latitude?: number; location?: string; longitude?: number} & PageableRequestWsDTO} queryParams
   * @returns {Observable<StoreFinderStockSearchPageWsDTO>}
   */
  getProductStocks(productCode?: string, queryParams?: {
    /**
     * Latitude location parameter.
     */
    latitude?: number
    /**
     * Free-text location
     */
    location?: string
    /**
     * Longitude location parameter.
     */
    longitude?: number
  } & PageableRequestWsDTO): Observable<StoreFinderStockSearchPageWsDTO> {
    return this.get<StoreFinderStockSearchPageWsDTO>(`${productCode}/stock`, {params: queryParams});
  }

  /**
   * Returns product's stock level for a particular store (POS).
   * @param {string} productCode. Product identifier
   * @param {string} storeName. Store identifier
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<StockWsDTO>}
   */
  getProductStock(productCode?: string, storeName?: string, queryParams?: RequestWsDTO): Observable<StockWsDTO> {
    return this.get<StockWsDTO>(`${productCode}/stock/${storeName}`, {params: queryParams})
  }
}

import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
  ProductExpressUpdateElementListWsDTO, ProductReferenceListWsDTO,
  ProductSearchPageWsDTO, ProductWsDTO, ReviewListWsDTO, ReviewWsDTO, StockWsDTO, StoreFinderStockSearchPageWsDTO,
  SuggestionListWsDTO
} from './types/ycommercewebservices';

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
   * @param {{catalog?: string; timestamp?: Date}} queryParams
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
  }): Observable<ProductExpressUpdateElementListWsDTO> {
    return this.get<ProductExpressUpdateElementListWsDTO>(`expressupdate`, {params: queryParams});
  }

  /**
   * Returns a list of products and additional data such as: available facets, available sorting and pagination options.<br/>
   * It can include spelling suggestions.To make spelling suggestions work you need to:<br/>
   *  * Make sure enableSpellCheck on the SearchQuery is set to true. By default it should be already set to true. <br/>
   *  * Have indexed properties configured to be used for spellchecking.
   * @param {{query?: string; pageSize?: number; sort?: string; currentPage?: number}} queryParams
   * @returns {Observable<ProductSearchPageWsDTO>}
   */
  search(queryParams?: {
    /**
     * Serialized query, free text search, facets.
     * The format of a serialized query: freeTextSearch:sort:facetKey1:facetValue1:facetKey2:facetValue2
     */
    query?: string
    /**
     * The number of results returned per page. 20 default
     */
    pageSize?: number
    /**
     * Sorting method applied to the display search results.
     */
    sort?: string
    /**
     * The current result page requested.
     */
    currentPage?: number
  }): Observable<ProductSearchPageWsDTO> {
    return this.get<ProductSearchPageWsDTO>(`search`, {params: queryParams});
  }

  /**
   * Returns a list of all available suggestions related to a given term and limits the results to a specific value of the max parameter.
   * @param {{max?: number; term?: string}} queryParams
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
  }): Observable<SuggestionListWsDTO> {
    return this.get<SuggestionListWsDTO>(`search`, {params: queryParams});
  }

  /**
   * Returns details of a single product according to a product code.
   * @param {string} productCode. Product identifier
   * @returns {Observable<ProductWsDTO>}
   */
  getProduct(productCode?: string): Observable<ProductWsDTO> {
    return this.get<ProductWsDTO>(productCode);
  }

  /**
   * Returns references for a product with a given product code. Reference type specifies which references to return.
   * @param {string} productCode. Product identifier
   * @param {{pageSize?: number; referenceType?: ProductReferenceType}} queryParams
   * @returns {Observable<ProductReferenceListWsDTO>}
   */
  getProductReferences(productCode?: string, queryParams?: {
    /**
     * Maximum size of returned results.
     */
    pageSize?: number
    /**
     * Response configuration (list of fields, which should be returned in response) DEFAULT
     */
    referenceType?: ProductReferenceType
  }): Observable<ProductReferenceListWsDTO> {
    return this.get<ProductReferenceListWsDTO>(`${productCode}/references`);
  }

  /**
   * Returns the reviews for a product with a given product code.
   * @param {string} productCode. Product identifier
   * @returns {Observable<ReviewListWsDTO>}
   */
  getProductReviews(productCode?: string): Observable<ReviewListWsDTO> {
    return this.get<ReviewListWsDTO>(`${productCode}/reviews`);
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
   * @param {{latitude?: number; pageSize?: number; location?: string; currentPage?: number; longitude?: number}} queryParams
   * @returns {Observable<StoreFinderStockSearchPageWsDTO>}
   */
  getProductStocks(productCode?: string, queryParams?: {
    /**
     * Latitude location parameter.
     */
    latitude?: number
    /**
     * The number of results returned per page. 20 default
     */
    pageSize?: number
    /**
     * Free-text location
     */
    location?: string
    /**
     * The current result page requested.
     */
    currentPage?: number
    /**
     * Longitude location parameter.
     */
    longitude?: number
  }): Observable<StoreFinderStockSearchPageWsDTO> {
    return this.get<StoreFinderStockSearchPageWsDTO>(`${productCode}/stock`, {params: queryParams});
  }

  /**
   * Returns product's stock level for a particular store (POS).
   * @param {string} productCode. Product identifier
   * @param {string} storeName. Store identifier
   * @returns {Observable<StockWsDTO>}
   */
  getProductStock(productCode?: string, storeName?: string): Observable<StockWsDTO> {
    return this.get<StockWsDTO>(`${productCode}/stock/${storeName}`)
  }
}

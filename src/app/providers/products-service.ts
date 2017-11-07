import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
  ProductExpressUpdateElementListWsDTO, ProductReferenceListWsDTO,
  ProductSearchPageWsDTO, ProductWsDTO, ReviewListWsDTO, ReviewWsDTO, StockWsDTO, StoreFinderStockSearchPageWsDTO,
  SuggestionListWsDTO
} from './types/ycommercewebservices';

export interface ExpressUpdateQueryParams {
  /**
   * Only products from this catalog are returned. Format: catalogId:catalogVersion
   */
  catalog?: string
  /**
   * Only items newer than the given parameter are retrieved from the queue. This parameter should be in RFC-8601 format.
   */
  timestamp?: Date
}

export interface SearchQueryParams {
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
}

export interface SuggestionQueryParams {
  /**
   * Specifies the limit of results. 10 default
   */
  max?: number
  /**
   * Specified term
   */
  term?: string
}

/**
 * Returns product's stock levels sorted by distance from specific location
 * passed by free-text parameter or longitude and latitude parameters.
 */
export interface ProductStockQueryParams {
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
}

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

export interface ProductReferenceQueryParams {
  /**
   * Maximum size of returned results.
   */
  pageSize?: number
  /**
   * Response configuration (list of fields, which should be returned in response) DEFAULT
   */
  referenceType?: ProductReferenceType
}

@Injectable()
export class ProductsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/products`;
  }

  getExpressUpdate(queryParams?: ExpressUpdateQueryParams): Observable<ProductExpressUpdateElementListWsDTO> {
    return this.get<ProductExpressUpdateElementListWsDTO>(`expressupdate`, {params: queryParams});
  }

  search(queryParams?: SearchQueryParams): Observable<ProductSearchPageWsDTO> {
    return this.get<ProductSearchPageWsDTO>(`search`, {params: queryParams});
  }

  suggestions(queryParams?: SuggestionQueryParams): Observable<SuggestionListWsDTO> {
    return this.get<SuggestionListWsDTO>(`search`, {params: queryParams});
  }

  getProduct(productCode?: string): Observable<ProductWsDTO> {
    return this.get<ProductWsDTO>(productCode);
  }

  getProductReferences(productCode?: string, queryParams?: ProductReferenceQueryParams): Observable<ProductReferenceListWsDTO> {
    return this.get<ProductReferenceListWsDTO>(`${productCode}/references`);
  }

  getProductReviews(productCode?: string): Observable<ReviewListWsDTO> {
    return this.get<ReviewListWsDTO>(`${productCode}/reviews`);
  }

  addProductReview(productCode?: string, review?: ReviewWsDTO): Observable<ReviewWsDTO> {
    return this.postAt<ReviewWsDTO>(`${productCode}/reviews`, review);
  }

  getProductStocks(productCode?: string, queryParams?: ProductStockQueryParams): Observable<StoreFinderStockSearchPageWsDTO> {
    return this.get<StoreFinderStockSearchPageWsDTO>(`${productCode}/stock`, {params: queryParams});
  }

  getProductStock(productCode?: string, storeName?: string): Observable<StockWsDTO> {
    return this.get<StockWsDTO>(`${productCode}/stock/${storeName}`)
  }
}

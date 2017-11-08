import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {
  CatalogListWsDTO,
  CatalogVersionWsDTO,
  CatalogWsDTO,
  CategoryHierarchyWsDTO
} from './types/ycommercewebservices';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

export interface CatalogsQueryParams {
  pageSize?: number
  currentPage?: number
}

@Injectable()
export class CatalogsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/catalogs`;
  }

  /**
   * Returns all catalogs with versions defined for the base store.
   * @returns {Observable<CatalogListWsDTO>}
   */
  getCatalogs(): Observable<CatalogListWsDTO> {
    return this.query<CatalogListWsDTO>()
  }

  /**
   * Returns a information about a catalog based on its ID, along with versions defined for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @returns {Observable<CatalogWsDTO>}
   */
  getCatalog(catalogId: string): Observable<CatalogWsDTO> {
    return this.get<CatalogWsDTO>(catalogId);
  }

  /**
   * Returns information about catalog version that exists for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {string} catalogVersionId. Catalog version identifier
   * @returns {Observable<CatalogVersionWsDTO>}
   */
  getCatalogVersion(catalogId: string, catalogVersionId: string): Observable<CatalogVersionWsDTO> {
    return this.get<CatalogVersionWsDTO>(`${catalogId}/${catalogVersionId}`);
  }

  /**
   * Returns information about category that exists in a catalog version available for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {string} catalogVersionId. Catalog version identifier
   * @param {string} categoryId. Category identifier
   * @param {{pageSize?: number; currentPage?: number}} queryParams
   * @returns {Observable<CategoryHierarchyWsDTO>}
   */
  getCategoryHierarchy(catalogId: string, catalogVersionId: string, categoryId: string, queryParams?: {
    /**
     * The number of results returned per page.
     */
    pageSize?: number
    /**
     * The current result page requested.
     */
    currentPage?: number
  }): Observable<CategoryHierarchyWsDTO> {
    return this.get(`${catalogId}/${catalogVersionId}/categories/${categoryId}`, {params: queryParams});
  }
}

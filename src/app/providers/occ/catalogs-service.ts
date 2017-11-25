import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../rest-service';
import {
  CatalogListWsDTO, CatalogVersionWsDTO, CatalogWsDTO, CategoryHierarchyWsDTO, PageableRequestWsDTO,
  RequestWsDTO
} from '../types/ycommercewebservices';

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
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<CatalogListWsDTO>}
   */
  getCatalogs(queryParams?: RequestWsDTO): Observable<CatalogListWsDTO> {
    return this.query<CatalogListWsDTO>({params: queryParams})
  }

  /**
   * Returns a information about a catalog based on its ID, along with versions defined for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<CatalogWsDTO>}
   */
  getCatalog(catalogId: string, queryParams?: RequestWsDTO): Observable<CatalogWsDTO> {
    return this.get<CatalogWsDTO>(catalogId, {params: queryParams});
  }

  /**
   * Returns information about catalog version that exists for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {string} catalogVersionId. Catalog version identifier
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<CatalogVersionWsDTO>}
   */
  getCatalogVersion(catalogId: string, catalogVersionId: string, queryParams?: RequestWsDTO): Observable<CatalogVersionWsDTO> {
    return this.get<CatalogVersionWsDTO>(`${catalogId}/${catalogVersionId}`, {params: queryParams});
  }

  /**
   * Returns information about category that exists in a catalog version available for the current base store.
   * @param {string} catalogId. Catalog identifier
   * @param {string} catalogVersionId. Catalog version identifier
   * @param {string} categoryId. Category identifier
   * @param {PageableRequestWsDTO} queryParams
   * @returns {Observable<CategoryHierarchyWsDTO>}
   */
  getCategoryHierarchy(catalogId: string,
                       catalogVersionId: string,
                       categoryId: string,
                       queryParams?: PageableRequestWsDTO): Observable<CategoryHierarchyWsDTO> {
    return this.get(`${catalogId}/${catalogVersionId}/categories/${categoryId}`, {params: queryParams});
  }
}

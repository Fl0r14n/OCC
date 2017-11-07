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

  getCatalogs(): Observable<CatalogListWsDTO> {
    return this.query<CatalogListWsDTO>()
  }

  getCatalog(catalogId: string): Observable<CatalogWsDTO> {
    return this.get<CatalogWsDTO>(catalogId);
  }

  getCatalogVersion(catalogId: string, catalogVersionId: string): Observable<CatalogVersionWsDTO> {
    return this.get<CatalogVersionWsDTO>(`${catalogId}/${catalogVersionId}`);
  }

  getCategoryHierarchy(catalogId: string,
                       catalogVersionId: string,
                       categoryId: string,
                       queryParams?: CatalogsQueryParams): Observable<CategoryHierarchyWsDTO> {
    return this.get(`${catalogId}/${catalogVersionId}/categories/${categoryId}`, {params: queryParams});
  }
}

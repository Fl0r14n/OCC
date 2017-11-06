import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export abstract class RestService {

  protected basePath = '/rest/v2/electronics';

  abstract getEndpoint(): string;

  constructor(protected http: HttpClient) {
  }

  protected toHttpParams(data: Object) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return httpParams;
  }

  protected toHttpHeaders(data: Object) {
    let httpHeaders = new HttpHeaders();
    Object.keys(data).forEach(function (key) {
      httpHeaders = httpHeaders.append(key, data[key]);
    });
    return httpHeaders;
  }

  protected query<L>(queryParams?: Object): Observable<L> {
    return this.http.get<L>(this.getEndpoint(), {
      params: this.toHttpParams(queryParams),
    });
  }

  protected get<T>(id: number | string, queryParams?: Object): Observable<T> {
    return this.http.get<T>(`${this.getEndpoint()}/${id}`, {
      params: this.toHttpParams(queryParams)
    });
  }

  protected head<T>(id: number | string, queryParams?: Object): Observable<T> {
    return this.http.head<T>(`${this.getEndpoint()}/${id}`, {
      params: this.toHttpParams(queryParams)
    })
  }

  protected post<T>(body: any, queryParams?: Object, headers?: Object): Observable<T> {
    return this.http.post<T>(this.getEndpoint(), body, {
      params: this.toHttpParams(queryParams),
      headers: this.toHttpHeaders(headers)
    })
  }

  protected put(id: number | string, body: any, queryParams?: Object, headers?: Object): Observable<void> {
    return this.http.put<void>(`${this.getEndpoint()}/${id}`, body, {
      params: this.toHttpParams(queryParams),
      headers: this.toHttpHeaders(headers)
    })
  }

  protected delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.getEndpoint()}/${id}`)
  }
}

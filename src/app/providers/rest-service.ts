import {HttpClient, HttpHeaders, HttpParameterCodec, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface RequestOptions {
  params?: Object
  headers?: Object
}

interface HTTPClientRequestOptions {
  headers?: HttpHeaders
  params?: HttpParams
}

class HttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

export abstract class RestService {

  protected basePath = '/rest/v2/electronics';

  abstract getEndpoint(): string;

  constructor(protected http: HttpClient) {
  }

  protected toHttpParams(data: Object): HttpParams {
    let httpParams = new HttpParams({encoder: new HttpParamEncoder()});
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });
    return httpParams;
  }

  protected toHttpHeaders(data: Object): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    Object.keys(data).forEach(function (key) {
      httpHeaders = httpHeaders.append(key, data[key]);
    });
    return httpHeaders;
  }

  private toRequestOptions(options: RequestOptions): HTTPClientRequestOptions {
    let result = {};
    if (options.params) {
      result['params'] = this.toHttpParams(options.params);
    }
    if (options.headers) {
      result['headers'] = this.toHttpHeaders(options.headers);
    }
    return result;
  }

  private fixHeaders(body: any, options?: RequestOptions): RequestOptions {
    let _options = options || {};
    if (body instanceof HttpParams) {
      _options.headers = _options.headers || {};
      _options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return _options;
  }

  protected query<T>(options?: RequestOptions): Observable<T> {
    return this.http.get<T>(this.getEndpoint(), this.toRequestOptions(options));
  }

  protected get<T>(id: number | string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(`${this.getEndpoint()}/${id}`, this.toRequestOptions(options));
  }

  protected head<T>(id: number | string, options?: RequestOptions): Observable<T> {
    return this.http.head<T>(`${this.getEndpoint()}/${id}`, this.toRequestOptions(options));
  }

  protected postAt<T>(id: number | string, body: any | HttpParams, options?: RequestOptions): Observable<T> {
    let _options = this.fixHeaders(body, options);
    return this.http.post<T>(`${this.getEndpoint()}/${id}`, body, this.toRequestOptions(_options));
  }

  protected post<T>(body: any | HttpParams, options?: RequestOptions): Observable<T> {
    let _options = this.fixHeaders(body, options);
    return this.http.post<T>(this.getEndpoint(), body, this.toRequestOptions(_options));
  }

  protected put<T>(id: number | string, body: any, options?: RequestOptions): Observable<T> {
    let _options = this.fixHeaders(body, options);
    return this.http.put<T>(`${this.getEndpoint()}/${id}`, body, this.toRequestOptions(_options));
  }

  protected patch<T>(id: number | string, body: any, options?: RequestOptions): Observable<T> {
    let _options = this.fixHeaders(body, options);
    return this.http.patch<T>(`${this.getEndpoint()}/${id}`, body, this.toRequestOptions(_options));
  }

  protected delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.getEndpoint()}/${id}`)
  }
}

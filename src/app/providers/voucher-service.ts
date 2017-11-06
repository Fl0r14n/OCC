import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {VoucherWsDTO} from './types/ycommercewebservices';

@Injectable()
export class VoucherService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/titles`;
  }

  getVoucher(code?: string): Observable<VoucherWsDTO> {
    return this.get<VoucherWsDTO>(code);
  }
}

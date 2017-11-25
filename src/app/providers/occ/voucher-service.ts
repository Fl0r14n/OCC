import {RestService} from '../rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RequestWsDTO, VoucherWsDTO} from '../types/ycommercewebservices';

@Injectable()
export class VoucherService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/titles`;
  }

  /**
   * Returns details of a single voucher according to a voucher code.
   * @param {string} code. Voucher identifier (code)
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<VoucherWsDTO>}
   */
  getVoucher(code: string, queryParams?: RequestWsDTO): Observable<VoucherWsDTO> {
    return this.get<VoucherWsDTO>(code, {params: queryParams});
  }
}

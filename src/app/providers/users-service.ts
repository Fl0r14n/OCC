import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
  AddressListWsDTO, AddressValidationWsDTO, AddressWsDTO, CartListWsDTO, CartWsDTO, UserSignUpWsDTO,
  UserWsDTO
} from './types/ycommercewebservices';


export interface CartQueryParams {
  /**
   * optional parameter. If the parameter is provided and its value is true only saved carts are returned.
   */
  savedCartsOnly?: string
  /**
   * optional {@link PaginationData} parameter in case of savedCartsOnly == true. Default value 20.
   */
  pageSize?: number
  /**
   * optional sort criterion in case of savedCartsOnly == true. No default value.
   */
  sort?: string
  /**
   * optional pagination parameter in case of savedCartsOnly == true. Default value 0.
   */
  currentPage?: number
}

/**
 * Creates a new cart or restores an anonymous cart as a user's cart (if an old Cart Id is given in the request)
 */
export interface CartOptions {
  /**
   * User's cart GUID to merge anonymous cart to
   */
  toMergeCartGuid?: string
  /**
   * Anonymous cart GUID
   */
  oldCartId?: string
}

@Injectable()
export class UsersService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/users`;
  }

  addUser(user: UserSignUpWsDTO): Observable<UserWsDTO> {
    return this.post<UserWsDTO>(user);
  }

  getUser(userId: string): Observable<UserWsDTO> {
    return this.get<UserWsDTO>(userId);
  }

  setUser(userId: string, user: UserSignUpWsDTO): Observable<void> {
    return this.put(userId, user);
  }

  delUser(userId: string): Observable<void> {
    return this.delete(userId);
  }

  getUserAddresses(userId: string): Observable<AddressListWsDTO> {
    return this.get<AddressListWsDTO>(`${userId}/addresses`);
  }

  addUserAddress(userId: string, address: AddressWsDTO): Observable<void> {
    return this.postAt(`${userId}/addresses`, address);
  }

  verifyUserAddress(userId: string, address: AddressWsDTO): Observable<AddressValidationWsDTO> {
    return this.postAt(`${userId}/addresses/verification`, address);
  }

  getUserAddress(userId: string, addressId: string): Observable<AddressWsDTO> {
    return this.get<AddressWsDTO>(`${userId}/addresses/${addressId}`);
  }

  setUserAddress(userId: string, addressId: string, address: AddressWsDTO): Observable<void> {
    return this.put(`${userId}/addresses/${addressId}`, address);
  }

  delUserAddress(userId: string, addressId: string): Observable<void> {
    return this.delete(`${userId}/addresses/${addressId}`);
  }

  getUserCarts(userId: string, queryParams?: CartQueryParams): Observable<CartListWsDTO> {
    return this.get<CartListWsDTO>(`${userId}/carts`, {params: queryParams});
  }

  addUserCart(userId: string, cartOptions?: CartOptions): Observable<CartWsDTO> {
    return this.postAt<CartWsDTO>(`${userId}/carts`, this.toHttpParams(cartOptions));
  }

  getUserCart(userId: string, cartId: string): Observable<CartWsDTO> {
    return this.get<CartWsDTO>(`${userId}/carts/${cartId}`);
  }

  delUserCart(userId: string, cartId: string): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}`);
  }

  addUserDeliveryAddress(userId: string, cartId: string, address: AddressWsDTO): Observable<AddressWsDTO> {
    return this.postAt(`${userId}/carts/${cartId}/addresses/delivery`, address);
  }

  setUserDeliveryAddress(userId: string, cartId: string, addressId: string): Observable<void> {
    return this.put(`${userId}/carts/${cartId}/addresses/delivery`, this.toHttpParams({
      addressId: addressId
    }));
  }

}

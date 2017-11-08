import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
  AddressListWsDTO, AddressValidationWsDTO, AddressWsDTO, CartListWsDTO, CartWsDTO, DeliveryModeListWsDTO,
  SaveCartResultWsDTO,
  UserSignUpWsDTO,
  UserWsDTO
} from './types/ycommercewebservices';

@Injectable()
export class UsersService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/users`;
  }

  /**
   * Registers a customer. The following two sets of parameters are available:
   * First set is used to register a customer. In this case the required parameters are:
   * login, password, firstName, lastName, titleCode.
   * Second set is used to convert a guest to a customer. In this case the required parameters are:
   * guid, password.
   * @param {UserSignUpWsDTO} user
   * @returns {Observable<UserWsDTO>}
   */
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

  getUserCarts(userId: string, queryParams?: {
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
  }): Observable<CartListWsDTO> {
    return this.get<CartListWsDTO>(`${userId}/carts`, {params: queryParams});
  }

  addUserCart(userId: string, cartOptions?: {
    /**
     * User's cart GUID to merge anonymous cart to
     */
    toMergeCartGuid?: string
    /**
     * Anonymous cart GUID
     */
    oldCartId?: string
  }): Observable<CartWsDTO> {
    return this.postAt<CartWsDTO>(`${userId}/carts`, this.toHttpParams(cartOptions));
  }

  getUserCart(userId: string, cartId: string): Observable<CartWsDTO> {
    return this.get<CartWsDTO>(`${userId}/carts/${cartId}`);
  }

  delUserCart(userId: string, cartId: string): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}`);
  }

  addUserDeliveryAddress(userId: string, cartId: string, address: AddressWsDTO): Observable<AddressWsDTO> {
    return this.postAt<AddressWsDTO>(`${userId}/carts/${cartId}/addresses/delivery`, address);
  }

  setUserDeliveryAddress(userId: string, cartId: string, addressId: string): Observable<void> {
    return this.put(`${userId}/carts/${cartId}/addresses/delivery`, this.toHttpParams({
      addressId: addressId
    }));
  }

  delUserDeliveryAddress(userId: string, cartId: string): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}/addresses/delivery`);
  }

  cloneCart(userId: string, cartId: string, cloneOptions: {
    /**
     * the name that should be applied to the cloned cart
     */
    name?: string,
    /**
     * the description that should be applied to the cloned cart
     */
    description?: string
  }): Observable<SaveCartResultWsDTO> {
    return this.postAt(`${userId}/carts/${cartId}/clonesavedcart`, this.toHttpParams(cloneOptions));
  }

  getDeliveryModes(userId: string, cartId: string): Observable<DeliveryModeListWsDTO> {
    return this.get(`${userId}/carts/${cartId}/deliverymodes`);
  }

}

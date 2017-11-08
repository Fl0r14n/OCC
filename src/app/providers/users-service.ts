import {RestService} from './rest-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {
  AddressListWsDTO, AddressValidationWsDTO, AddressWsDTO, CartListWsDTO, CartModificationWsDTO, CartWsDTO,
  DeliveryModeListWsDTO,
  DeliveryModeWsDTO, OrderEntryListWsDTO, OrderEntryWsDTO, OrderHistoryListWsDTO, OrderWsDTO, PaymentDetailsListWsDTO,
  PaymentDetailsWsDTO,
  PromotionResultListWsDTO,
  SaveCartResultWsDTO, UserGroupListWsDTO,
  UserSignUpWsDTO,
  UserWsDTO, VoucherListWsDTO
} from './types/ycommercewebservices';

export enum UserIdChoice {
  CURRENT = 'current',
  ANONYMOUS = 'anonymous'
}

@Injectable()
export class UsersService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/users`;
  }

  /**
   * Registers a customer. The following two sets of parameters are available:<br/>
   * * First set is used to register a customer. In this case the required parameters are: <br>
   * * * login, password, firstName, lastName, titleCode.<br/>
   * * Second set is used to convert a guest to a customer. In this case the required parameters are:<br/>
   * * * guid, password.
   * @param {UserSignUpWsDTO} user
   * @returns {Observable<UserWsDTO>}
   */
  addUser(user: UserSignUpWsDTO): Observable<UserWsDTO> {
    return this.post<UserWsDTO>(user);
  }

  /**
   * Returns customer profile.
   * @param {UserIdChoice} userId. User identifier or one of the literals below :<br/>
   * 'current' for currently authenticated user<br/>
   * 'anonymous' for anonymous user
   * @returns {Observable<UserWsDTO>}
   */
  getUser(userId: UserIdChoice): Observable<UserWsDTO> {
    return this.get<UserWsDTO>(userId);
  }

  /**
   * Updates customer profile. Only attributes provided in the request body will be changed.
   * @param {UserIdChoice} userId
   * @param {UserSignUpWsDTO} user
   * @returns {Observable<void>}
   */
  setUser(userId: UserIdChoice, user: UserSignUpWsDTO): Observable<void> {
    return this.patch(userId, user);
  }

  /**
   * Removes customer profile.
   * @param {UserIdChoice} userId
   * @returns {Observable<void>}
   */
  delUser(userId: UserIdChoice): Observable<void> {
    return this.delete(userId);
  }

  /**
   * Returns customer's addresses.
   * @param {UserIdChoice} userId
   * @returns {Observable<AddressListWsDTO>}
   */
  getAddresses(userId: UserIdChoice): Observable<AddressListWsDTO> {
    return this.get<AddressListWsDTO>(`${userId}/addresses`);
  }

  /**
   * Creates a new address.
   * @param {UserIdChoice} userId
   * @param {AddressWsDTO} address
   * @returns {Observable<void>}
   */
  addAddress(userId: UserIdChoice, address: AddressWsDTO): Observable<void> {
    return this.postAt(`${userId}/addresses`, address);
  }

  /**
   * Verifies address
   * @param {UserIdChoice} userId
   * @param {AddressWsDTO} address
   * @returns {Observable<AddressValidationWsDTO>}
   */
  verifyAddress(userId: UserIdChoice, address: AddressWsDTO): Observable<AddressValidationWsDTO> {
    return this.postAt(`${userId}/addresses/verification`, address);
  }

  /**
   * Returns detailed information about address with a given id.
   * @param {UserIdChoice} userId
   * @param {string} addressId
   * @returns {Observable<AddressWsDTO>}
   */
  getAddress(userId: UserIdChoice, addressId: string): Observable<AddressWsDTO> {
    return this.get<AddressWsDTO>(`${userId}/addresses/${addressId}`);
  }

  /**
   * Updates the address. Only attributes provided in the request body will be changed.
   * @param {UserIdChoice} userId
   * @param {string} addressId
   * @param {AddressWsDTO} address
   * @returns {Observable<void>}
   */
  setAddress(userId: UserIdChoice, addressId: string, address: AddressWsDTO): Observable<void> {
    return this.patch(`${userId}/addresses/${addressId}`, address);
  }

  /**
   * Removes customer's address.
   * @param {UserIdChoice} userId
   * @param {string} addressId
   * @returns {Observable<void>}
   */
  delAddress(userId: UserIdChoice, addressId: string): Observable<void> {
    return this.delete(`${userId}/addresses/${addressId}`);
  }

  /**
   * Lists all customer carts.
   * @param {UserIdChoice} userId
   * @param {{savedCartsOnly?: string; pageSize?: number; sort?: string; currentPage?: number}} queryParams
   * @returns {Observable<CartListWsDTO>}
   */
  getCarts(userId: UserIdChoice, queryParams?: {
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

  /**
   * Creates a new cart or restores an anonymous cart as a user's cart (if an old Cart Id is given in the request)
   * @param {UserIdChoice} userId
   * @param {{toMergeCartGuid?: string; oldCartId?: string}} cartOptions
   * @returns {Observable<CartWsDTO>}
   */
  addCart(userId: UserIdChoice, cartOptions?: {
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

  /**
   * Returns the cart with a given identifier.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<CartWsDTO>}
   */
  getCart(userId: UserIdChoice, cartId = 'current'): Observable<CartWsDTO> {
    return this.get<CartWsDTO>(`${userId}/carts/${cartId}`);
  }

  /**
   * Deletes a cart with a given cart id.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<void>}
   */
  delCart(userId: UserIdChoice, cartId = 'current'): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}`);
  }

  /**
   * Creates an address and assigns it to the cart as the delivery address.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {AddressWsDTO} address
   * @returns {Observable<AddressWsDTO>}
   */
  addDeliveryAddress(userId: UserIdChoice, cartId = 'current', address: AddressWsDTO): Observable<AddressWsDTO> {
    return this.postAt<AddressWsDTO>(`${userId}/carts/${cartId}/addresses/delivery`, address);
  }

  /**
   * Sets a delivery address for the cart.
   * The address country must be placed among the delivery countries of the current base store.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} addressId
   * @returns {Observable<void>}
   */
  setDeliveryAddress(userId: UserIdChoice, cartId = 'current', addressId: string): Observable<void> {
    return this.put(`${userId}/carts/${cartId}/addresses/delivery`, this.toHttpParams({
      addressId: addressId
    }));
  }

  /**
   * Removes the delivery address from the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<void>}
   */
  delDeliveryAddress(userId: UserIdChoice, cartId = 'current'): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}/addresses/delivery`);
  }

  /**
   * Explicitly clones a cart
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {{name?: string; description?: string}} cloneOptions
   * @returns {Observable<SaveCartResultWsDTO>}
   */
  cloneCart(userId: UserIdChoice, cartId = 'current', cloneOptions: {
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

  /**
   * Returns all delivery modes supported for the current base store and cart delivery address.<br/>
   * A delivery address must be set for the cart, otherwise an empty list will be returned.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<DeliveryModeListWsDTO>}
   */
  getDeliveryModes(userId: UserIdChoice, cartId = 'current'): Observable<DeliveryModeListWsDTO> {
    return this.get<DeliveryModeListWsDTO>(`${userId}/carts/${cartId}/deliverymodes`);
  }

  /**
   * Returns the delivery mode selected for the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<DeliveryModeWsDTO>}
   */
  getDeliveryMode(userId: UserIdChoice, cartId = 'current'): Observable<DeliveryModeWsDTO> {
    return this.get<DeliveryModeWsDTO>(`${userId}/carts/${cartId}/deliverymode`)
  }

  /**
   * Sets the delivery mode with a given identifier for the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} deliveryModeId
   * @returns {Observable<void>}
   */
  setDeliveryMode(userId: UserIdChoice, cartId = 'current', deliveryModeId: string): Observable<void> {
    return this.put(`${userId}/carts/${cartId}/deliverymode`, this.toHttpParams({deliveryModeId: deliveryModeId}));
  }

  /**
   * Removes the delivery mode from the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<void>}
   */
  delDeliveryMode(userId: UserIdChoice, cartId = 'current'): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}/deliverymode`);
  }

  /**
   * Assigns an email to the cart. This step is required to make a guest checkout.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} email
   * @returns {Observable<void>}
   */
  setGuestEmail(userId: UserIdChoice, cartId = 'current', email: string): Observable<void> {
    return this.put(`${userId}/carts/${cartId}/email`, this.toHttpParams({email: email}));
  }

  /**
   * Returns cart entries.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<OrderEntryListWsDTO>}
   */
  getCartEntries(userId: UserIdChoice, cartId = 'current'): Observable<OrderEntryListWsDTO> {
    return this.get<OrderEntryListWsDTO>(`${userId}/carts/${cartId}/entries`);
  }

  /**
   * Adds a product to the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {OrderEntryWsDTO} orderEntry
   * @returns {Observable<CartModificationWsDTO>}
   */
  addCartEntries(userId: UserIdChoice, cartId = 'current', orderEntry: OrderEntryWsDTO): Observable<CartModificationWsDTO> {
    return this.postAt<CartModificationWsDTO>(`${userId}/carts/${cartId}/entries`, orderEntry);
  }

  /**
   * Returns the details of the cart entries.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} entryNumber
   * @returns {Observable<OrderEntryWsDTO>}
   */
  getCartEntry(userId: UserIdChoice, cartId = 'current', entryNumber: string): Observable<OrderEntryWsDTO> {
    return this.get<OrderEntryWsDTO>(`${userId}/carts/${cartId}/entries/${entryNumber}`);
  }

  /**
   * Updates the quantity of a single cart entry and details of the store where the cart entry will be picked.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} entryNumber
   * @param {OrderEntryWsDTO} orderEntry
   * @returns {Observable<CartModificationWsDTO>}
   */
  setCartEntry(userId: UserIdChoice,
               cartId = 'current',
               entryNumber: string,
               orderEntry: OrderEntryWsDTO): Observable<CartModificationWsDTO> {
    return this.patch<CartModificationWsDTO>(`${userId}/carts/${cartId}/entries/${entryNumber}`, orderEntry);
  }

  /**
   * Deletes cart entry.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} entryNumber
   * @returns {Observable<void>}
   */
  delCartEntry(userId: UserIdChoice, cartId = 'current', entryNumber: string): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}/entries/${entryNumber}`);
  }

  /**
   * Flags a cart for deletion (the cart doesn't have corresponding save cart attributes anymore).<br/>
   * The cart is not actually deleted from the database.
   * But with the removal of the saved cart attributes, this cart will be taken care of by the cart removal job just like any other cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<SaveCartResultWsDTO>}
   */
  flagCartForDeletion(userId: UserIdChoice, cartId = 'current'): Observable<SaveCartResultWsDTO> {
    return this.patch<SaveCartResultWsDTO>(`${userId}/carts/${cartId}/flagForDeletion`, null);
  }

  /**
   * Defines details of a new credit card payment details and assigns the payment to the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {PaymentDetailsWsDTO} paymentDetails
   * @returns {Observable<PaymentDetailsWsDTO>}
   */
  addPaymentDetails(userId: UserIdChoice, cartId = 'current', paymentDetails: PaymentDetailsWsDTO): Observable<PaymentDetailsWsDTO> {
    return this.postAt<PaymentDetailsWsDTO>(`${userId}/carts/${cartId}/paymentdetails`, paymentDetails);
  }

  /**
   * Sets credit card payment details for the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} paymentDetailsId
   * @returns {Observable<void>}
   */
  setPaymentDetails(userId: UserIdChoice, cartId = 'current', paymentDetailsId: string): Observable<void> {
    return this.put(`${userId}/carts/${cartId}/paymentdetails`, this.toHttpParams({paymentDetailsId: paymentDetailsId}));
  }

  /**
   * Return information about promotions applied on cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<PromotionResultListWsDTO>}
   */
  getPromotions(userId: UserIdChoice, cartId = 'current'): Observable<PromotionResultListWsDTO> {
    return this.get<PromotionResultListWsDTO>(`${userId}/carts/${cartId}/promotions`);
  }

  /**
   * Enables the promotion for the order based on the promotionId defined for the cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} promotionId
   * @returns {Observable<void>}
   */
  addPromotion(userId: UserIdChoice, cartId = 'current', promotionId: string): Observable<void> {
    return this.postAt(`${userId}/carts/${cartId}/promotions`, this.toHttpParams({promotionId: promotionId}));
  }

  /**
   * Return information about promotion with given id, applied on cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} promotionId
   * @returns {Observable<PromotionResultListWsDTO>}
   */
  getPromotion(userId: UserIdChoice, cartId = 'current', promotionId: string): Observable<PromotionResultListWsDTO> {
    return this.get<PromotionResultListWsDTO>(`${userId}/carts/${cartId}/promotions/${promotionId}`);
  }

  /**
   * Disables the promotion for the order based on the promotionId defined for the cart.<br/>
   * Requests pertaining to promotions have been developed for the previous version of promotions and vouchers
   * and therefore some of them are currently not compatible with the new promotion engine.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} promotionId
   * @returns {Observable<void>}
   */
  delPromotion(userId: UserIdChoice, cartId = 'current', promotionId: string): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}/promotions/${promotionId}`);
  }

  restoreCart(userId: UserIdChoice, cartId = 'current'): Observable<SaveCartResultWsDTO> {
    return this.patch<SaveCartResultWsDTO>(`${userId}/carts/${cartId}/restoresavedcart`, null);
  }

  /**
   * Explicitly saves a cart
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {{saveCartName: string; saveCartDescription?: string}} details
   * @returns {Observable<SaveCartResultWsDTO>}
   */
  saveCart(userId: UserIdChoice, cartId = 'current', details: {
    saveCartName: string
    saveCartDescription?: string
  }): Observable<SaveCartResultWsDTO> {
    return this.patch<SaveCartResultWsDTO>(`${userId}/carts/${cartId}/save`, this.toHttpParams(details));
  }

  /**
   * Returns saved cart by it id for authenticated user
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<SaveCartResultWsDTO>}
   */
  getSavedCart(userId: UserIdChoice, cartId = 'current'): Observable<SaveCartResultWsDTO> {
    return this.get<SaveCartResultWsDTO>(`${userId}/carts/${cartId}/savedcart`);
  }

  /**
   * Returns list of vouchers applied to the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @returns {Observable<VoucherListWsDTO>}
   */
  getVouchers(userId: UserIdChoice, cartId = 'current'): Observable<VoucherListWsDTO> {
    return this.get<VoucherListWsDTO>(`${userId}/carts/${cartId}/vouchers`);
  }

  /**
   * Applies a voucher based on the voucherId defined for the cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} voucherId
   * @returns {Observable<void>}
   */
  addVoucher(userId: UserIdChoice, cartId = 'current', voucherId: string): Observable<void> {
    return this.postAt(`${userId}/carts/${cartId}/vouchers`, this.toHttpParams({voucherId: voucherId}));
  }

  /**
   * Removes a voucher based on the voucherId defined for the current cart.
   * @param {UserIdChoice} userId
   * @param {string} cartId
   * @param {string} voucherId
   * @returns {Observable<void>}
   */
  delVoucher(userId: UserIdChoice, cartId = 'current', voucherId: string): Observable<void> {
    return this.delete(`${userId}/carts/${cartId}/vouchers/${voucherId}`);
  }

  /**
   * Returns all customer groups of a customer.
   * @param {UserIdChoice} userId
   * @returns {Observable<UserGroupListWsDTO>}
   */
  getCustomerGroups(userId: UserIdChoice): Observable<UserGroupListWsDTO> {
    return this.get<UserGroupListWsDTO>(`${userId}/customergroups`);
  }

  /**
   * Changes customer's login.
   * @param {UserIdChoice} userId
   * @param {{password: string; newLogin: string}} login
   * @returns {Observable<void>}
   */
  setLogin(userId: UserIdChoice, login: {
    /**
     * Customer's current password.
     */
    password: string
    /**
     * Customer's new login. Customer login is case insensitive.
     */
    newLogin: string
  }): Observable<void> {
    return this.put(`{userId}/login`, this.toHttpParams(login));
  }

  /**
   * Returns order history data for all orders placed by the specific user for the specific base store.<br/>
   * Response contains orders search result displayed in several pages if needed.
   * @param {UserIdChoice} userId
   * @param {{statuses?: string; pageSize?: number; sort?: string; currentPage?: number}} queryParams
   * @returns {Observable<OrderHistoryListWsDTO>}
   */
  getOrders(userId: UserIdChoice, queryParams: {
    /**
     * Filters only certain order statuses.
     * It means: statuses=CANCELLED,CHECKED_VALID would only return orders with status CANCELLED or CHECKED_VALID.
     */
    statuses?: string
    /**
     * The number of results returned per page. 20 default
     */
    pageSize?: number
    /**
     * Sorting method applied to the return results.
     */
    sort?: string
    /**
     * The current result page requested.
     */
    currentPage?: number
  }): Observable<OrderHistoryListWsDTO> {
    return this.get<OrderHistoryListWsDTO>(`${userId}/orders`, {params: queryParams});
  }

  /**
   * Authorizes cart and places the order. Response contains the new order data.
   * @param {UserIdChoice} userId
   * @param {{cartId: string; securityCode: string}} cart
   * @returns {Observable<OrderWsDTO>}
   */
  placeOrder(userId: UserIdChoice, cart: {
    /**
     * Cart code for logged in user, cart GUID for guest checkout
     */
    cartId: string
    /**
     * CCV security code.
     */
    securityCode: string
  }): Observable<OrderWsDTO> {
    return this.postAt<OrderWsDTO>(`${userId}/orders`, this.toHttpParams(cart));
  }

  /**
   * Returns specific order details based on a specific order code. The response contains detailed order information.
   * @param {UserIdChoice} userId
   * @param {string} code
   * @returns {Observable<OrderWsDTO>}
   */
  getOrder(userId: UserIdChoice, code: string): Observable<OrderWsDTO> {
    return this.get<OrderWsDTO>(`${userId}/orders/${code}`);
  }

  /**
   * Changes customer's password.
   * @param {UserIdChoice} userId
   * @param {{new: string; old: string}} password
   * @returns {Observable<void>}
   */
  setPassword(userId: UserIdChoice, password: {
    /**
     * New password
     */
    'new': string
    /**
     * Old password. Required only for ROLE_CUSTOMERGROUP
     */
    old: string
  }): Observable<void> {
    return this.put(`${userId}/password`, this.toHttpParams(password));
  }

  /**
   * Return customer's credit card payment details list.
   * @param {UserIdChoice} userId
   * @param {{saved?: boolean}} queryParams
   * @returns {Observable<PaymentDetailsListWsDTO>}
   */
  getPaymentDetails(userId: UserIdChoice, queryParams?: {
    /**
     * Type of payment details
     */
    saved?: boolean
  }): Observable<PaymentDetailsListWsDTO> {
    return this.get<PaymentDetailsListWsDTO>(`${userId}/paymentdetails`, {params: queryParams});
  }

  /**
   * Returns customer's credit card payment details for a given id.
   * @param {UserIdChoice} userId
   * @param {string} paymentDetailsId
   * @returns {Observable<PaymentDetailsWsDTO>}
   */
  getPaymentDetail(userId: UserIdChoice, paymentDetailsId: string): Observable<PaymentDetailsWsDTO> {
    return this.get<PaymentDetailsWsDTO>(`${userId}/paymentdetails/${paymentDetailsId}`);
  }

  /**
   * Updates existing customer's credit card payment details based on its ID.
   * Only attributes given in request will be changed.
   * @param {UserIdChoice} userId
   * @param {string} paymentDetailsId
   * @param {PaymentDetailsWsDTO} paymentDetail
   * @returns {Observable<void>}
   */
  setPaymentDetail(userId: UserIdChoice, paymentDetailsId: string, paymentDetail: PaymentDetailsWsDTO): Observable<void> {
    return this.patch(`${userId}/paymentdetails/${paymentDetailsId}`, paymentDetail);
  }

  /**
   * Removes customer's credit card payment details based on its ID.
   * @param {UserIdChoice} userId
   * @param {string} paymentDetailsId
   * @returns {Observable<void>}
   */
  delPaymentDetail(userId: UserIdChoice, paymentDetailsId: string): Observable<void> {
    return this.delete(`${userId}/paymentdetails/${paymentDetailsId}`);
  }
}

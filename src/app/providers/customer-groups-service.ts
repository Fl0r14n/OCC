import {Injectable} from '@angular/core';
import {PrincipalWsDTO, UserGroupListWsDTO, UserGroupWsDTO} from './types/ycommercewebservices';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {RestService} from './rest-service';

@Injectable()
export class CustomerGroupsService extends RestService {

  constructor(http: HttpClient) {
    super(http);
  }

  getEndpoint(): string {
    return `${this.basePath}/customergroups`;
  }

  /**
   * Returns all customer groups that are direct subgroups of a customergroup.
   * @param {{pageSize?: number; currentPage?: number}} queryParams
   * @returns {Observable<UserGroupListWsDTO>}
   */
  getCustomerGroups(queryParams?: {
    /**
     * Number of customer group returned in one page. 20 default
     */
    pageSize?: number
    /**
     * Current page number (starts with 0)
     */
    currentPage?: number
  }): Observable<UserGroupListWsDTO> {
    return this.query<UserGroupListWsDTO>();
  }

  /**
   * Returns a customer group with a specific groupId.
   * @param {string} groupId. Group identifier
   * @returns {Observable<UserGroupWsDTO>}
   */
  getCustomerGroup(groupId: string): Observable<UserGroupWsDTO> {
    return this.get<UserGroupWsDTO>(groupId);
  }

  /**
   * Creates a new customer group that is a direct subgroup of a customergroup.
   * @param {UserGroupWsDTO} userGroup.
   * @returns {Observable<void>}
   */
  addCustomerGroup(userGroup: UserGroupWsDTO): Observable<void> {
    return this.post(userGroup);
  }

  /**
   * Assigns user(s) to a customer group.
   * @param {string} groupId. Group identifier
   * @param {{members?: PrincipalWsDTO[]}} members
   * @returns {Observable<void>}
   */
  addCustomerGroupUser(groupId: string, members: {
    members?: PrincipalWsDTO[]
  }): Observable<void> {
    return this.patch(`${groupId}/members`, members);
  }

  /**
   * Removes user from a customer group.
   * @param {string} groupId. Group identifier
   * @param {string} userId. User identifier
   * @returns {Observable<void>}
   */
  delCustomerGroupUser(groupId: string, userId: string): Observable<void> {
    return this.delete(`${groupId}/members/${userId}`);
  }
}

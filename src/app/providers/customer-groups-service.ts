import {Injectable} from '@angular/core';
import {
  PageableRequestWsDTO, PrincipalWsDTO, RequestWsDTO, UserGroupListWsDTO, UserGroupWsDTO
} from './types/ycommercewebservices';
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
   * @param {PageableRequestWsDTO} queryParams
   * @returns {Observable<UserGroupListWsDTO>}
   */
  getCustomerGroups(queryParams?: PageableRequestWsDTO): Observable<UserGroupListWsDTO> {
    return this.query<UserGroupListWsDTO>({params: queryParams});
  }

  /**
   * Returns a customer group with a specific groupId.
   * @param {string} groupId. Group identifier
   * @param {RequestWsDTO} queryParams
   * @returns {Observable<UserGroupWsDTO>}
   */
  getCustomerGroup(groupId: string, queryParams?: RequestWsDTO): Observable<UserGroupWsDTO> {
    return this.get<UserGroupWsDTO>(groupId, {params: queryParams});
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

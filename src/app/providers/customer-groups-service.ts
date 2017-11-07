import {Injectable} from '@angular/core';
import {MemberListWsDTO, UserGroupListWsDTO, UserGroupWsDTO} from './types/ycommercewebservices';
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

  getCustomerGroups(): Observable<UserGroupListWsDTO> {
    return this.query<UserGroupListWsDTO>();
  }

  getCustomerGroup(groupId: string): Observable<UserGroupWsDTO> {
    return this.get<UserGroupWsDTO>(groupId);
  }

  addCustomerGroup(userGroup: UserGroupWsDTO): Observable<void> {
    return this.post(userGroup);
  }

  setCustomerGroupMembers(groupId: string, members: MemberListWsDTO): Observable<void> {
    return this.put(`${groupId}/members`, members);
  }

  delUserFromGroup(groupId: string, userId: string): Observable<void> {
    return this.delete(`${groupId}/members/${userId}`);
  }
}

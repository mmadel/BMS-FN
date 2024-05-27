import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/admin/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseURL + '/user'
  uuid: string
  accessToken: string;
  constructor(private httpClient: HttpClient, private keycloakAngular: KeycloakService) { }

  public findUSerRoleScope(uuid: string, roles: string[]) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/scope/find/uuid/' + uuid + '/roles/' + roles;
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }

  public findUsers() {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find/users';
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  public findUser(uuid: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find/uuid/' + uuid;
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }

  public createUser(user: User) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create';
    return this.httpClient.post(`${url}`, JSON.stringify(user), { 'headers': headers })
  }
  public updateUser(user: User){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/update';
    return this.httpClient.put(`${url}`, JSON.stringify(user), { 'headers': headers })
  }
  public deleteUser(uuid: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/delete/uuid/' + uuid;
    return this.httpClient.delete(`${url}`, { 'headers': headers })
  }
  public gteUUID() {
    if (this.uuid === undefined) {
      return from(this.keycloakAngular.getKeycloakInstance().loadUserInfo()).pipe(
        map((userProfile: any) => {

          this.uuid = userProfile.sub;
          return userProfile.sub;
        })
      )
    } else {
      return of(this.uuid);
    }
  }
  public getAccessToken() {
    if (this.accessToken === undefined) {
      return from(this.keycloakAngular.getToken()).pipe(
        map((accessToken: any) => {
          this.accessToken = accessToken;
          return accessToken;
        })
      )
    } else {
      return of(this.accessToken);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseURL + '/user'
  uuid: string
  constructor(private httpClient: HttpClient, private keycloakAngular: KeycloakService) { }

  public findUSerRoleScope(uuid: string, roles: string[]) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/scope/find/uuid/' + uuid + '/roles/' + roles;
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }

  public gteUUID() {
    if (this.uuid === undefined) {
      return from(this.keycloakAngular.getKeycloakInstance().loadUserInfo()).pipe(
        tap(result => console.log(JSON.stringify(result))),
        map((userProfile: any) => {

          this.uuid = userProfile.sub;
          return userProfile.sub;
        })
      )
    } else {
      return of(this.uuid);
    }
  }
}

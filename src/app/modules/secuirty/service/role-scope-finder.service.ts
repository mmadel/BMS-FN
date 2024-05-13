import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { RoleScopeRequestBuilder } from '../role.scope.request.build/role.scope.request.builder';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleScopeFinderService {
  private cache = new Map<string, any>();
  uuid: string = '';
  constructor(private userService: UserService, private keycloakAngular: KeycloakService) { }

  public find() {
    const cachedData = this.cache.get(this.uuid);
    if (cachedData) {
      return of(cachedData)
    } else {
      return from(this.userService.gteUUID()).pipe(
        map((uuid: any) => {
          this.uuid = uuid;
          return uuid;
        }),
        switchMap((uuid: string) => {
          return this.userService.findUSerRoleScope(uuid, RoleScopeRequestBuilder.builder(this.keycloakAngular.getUserRoles()))
        }),
        map(data => {
          this.cache.set(this.uuid, data);
          return data;
        })
      )
    }
  }
}

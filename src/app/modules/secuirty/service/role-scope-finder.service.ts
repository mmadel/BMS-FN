import { Injectable } from '@angular/core';
import { ScopeRequester } from '../model/scope.requester';
import { RoleScopeRequestBuilder } from '../role.scope.request.build/role.scope.request.builder';

@Injectable({
  providedIn: 'root'
})
export class RoleScopeFinderService {

  constructor() { }

  public find(roles: string[], uuid: string) {
    var scopeRequester: ScopeRequester = {
      uuid: uuid,
      roles: RoleScopeRequestBuilder.builder(roles)
    }
    console.log(JSON.stringify(scopeRequester))
  }
}

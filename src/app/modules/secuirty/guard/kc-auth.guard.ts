import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { INavData } from '@coreui/angular-pro';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { ItemFilter } from '../nav.item.filter/item.filter';
import { RoleNavItemConverter } from '../role.converter/role.nav.item.converter';
import { RenderNavItemsService } from '../service/render-nav-items.service';
@Injectable({
  providedIn: 'root'
})
export class KcAuthGuard extends KeycloakAuthGuard {
  constructor(protected override router: Router, protected override keycloakAngular: KeycloakService, private renderNavItemsService: RenderNavItemsService) {
    super(router, keycloakAngular);
  }
  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    //render nav items based on roles
    var convertedList : string[] = RoleNavItemConverter.convert(this.roles);
    var filteredList:INavData[] = ItemFilter.filterNavItems(convertedList);
    this.renderNavItemsService.renderItems$.next(filteredList)


    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];
    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }
    // Allow the user to proceed if all the required roles are present.
    var valid = false;
    for (let i = 0; i < requiredRoles.length; i++) {
      valid = this.roles.includes(requiredRoles[i]);
      if (valid)
        break;
    }

    return valid;
  }

}

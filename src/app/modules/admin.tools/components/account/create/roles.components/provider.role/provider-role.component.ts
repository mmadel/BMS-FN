import { Component, Input, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleBinder } from '../../../../model/account/role/role.binder';
import { RoleScopeCreator } from '../../role.scope.creator';

@Component({
  selector: 'provider-role',
  templateUrl: './provider-role.component.html',
  styleUrls: ['./provider-role.component.scss']
})
export class ProviderRoleComponent implements OnInit {
  subPermissionVisability: boolean = false
  providerRoleScopes: RoleScope[] = []
  providerSolideRoleScopes: RoleScope[] = []
  providserReferringRoleScopes: RoleScope[] = []
  @Input() roleBinder?: RoleBinder
  @Input() componentRole: string[]
  @Input() mode: string
  constructor() { }

  ngOnInit(): void {
    const checkParentRole = this.roleBinder?.providerH || this.roleBinder?.providerV || this.roleBinder?.providerM
    if (!checkParentRole && this.mode =='update')
      this.subPermissionVisability = true
  }
  toggleSubPermission() {
    this.subPermissionVisability = !this.subPermissionVisability;
    if (this.subPermissionVisability) {
      this.providerRoleScopes = []
    }
    else {
      this.providerSolideRoleScopes = []
      this.providserReferringRoleScopes = [];
    }
  }

  changeProvider(event: any) {
    var scopeIdValues: string[] = ['providersh', 'providersv', 'providersvm']
    this.providerRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.providerRoleScopes, Role.PROVIDER_ROLE)
  }
  changeSolidProvider(event: any) {
    var scopeIdValues: string[] = ['providerh', 'providerv', 'providervm']
    this.providerSolideRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.providerSolideRoleScopes, Role.SOLID_PROVIDER_ROLE)
  }
  changeReferringProvider(event: any) {
    var scopeIdValues: string[] = ['referringproviderh', 'referringproviderv', 'referringprovidervm']
    this.providserReferringRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.providserReferringRoleScopes, Role.REFERRING_PROVIDER_ROLE)
  }
  isValid(): boolean {
    return !((this.providerRoleScopes.length === 0
      && (this.providerSolideRoleScopes.length === 0 || this.providserReferringRoleScopes.length === 0)))
  }
  getRoleScopes(): RoleScope[] {
    var roleScopes: RoleScope[] = []
    roleScopes.push(...this.providerRoleScopes)
    roleScopes.push(...this.providerSolideRoleScopes)
    roleScopes.push(...this.providserReferringRoleScopes)
    return roleScopes;
  }
}

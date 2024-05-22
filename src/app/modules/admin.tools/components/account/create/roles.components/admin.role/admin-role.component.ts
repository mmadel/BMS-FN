import { Component, Input, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleBinder } from '../../../../model/account/role/role.binder';
import { RoleScopeCreator } from '../../role.scope.creator';

@Component({
  selector: 'admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss']
})
export class AdminRoleComponent implements OnInit {
  subPermissionVisability: boolean = false
  adminRoleScopes: RoleScope[] = []
  groupInfoRoleScopes: RoleScope[] = []
  insuranceMapperRoleScopes: RoleScope[] = []
  accountRoleScopes: RoleScope[] = []
  @Input() roleBinder?: RoleBinder
  @Input() componentRole: string[]
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubPermission() {
    this.subPermissionVisability = !this.subPermissionVisability;
    if (this.subPermissionVisability) {
      this.adminRoleScopes = []
    }
    else {
      this.groupInfoRoleScopes = []
      this.insuranceMapperRoleScopes = [];
      this.accountRoleScopes = []
    }
  }
  changeAdmin(event: any) {
    var scopeIdValues: string[] = ['adminh', 'adminv', 'adminvm']
    this.adminRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.adminRoleScopes, Role.ADMIN_TOOL_ROLE)
  }
  changeGroupInfo(event: any) {
    var scopeIdValues: string[] = ['groupinfoh', 'groupinfov', 'groupinfovm']
    this.groupInfoRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.groupInfoRoleScopes, Role.GROUP_INFO_ADMIN_TOOL_ROLE)
  }
  changeInsuranceMapper(event: any) {
    var scopeIdValues: string[] = ['insurancemappingh', 'insurancemappingv', 'insurancemappingvm']
    this.insuranceMapperRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.insuranceMapperRoleScopes, Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE)
  }
  changeAccountMapper(event: any) {
    var scopeIdValues: string[] = ['accountmanagementh', 'accountmanagementv', 'accountmanagementvm']
    this.accountRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.accountRoleScopes, Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE)
  }
  isValid(): boolean {
    return !((this.adminRoleScopes.length === 0
      && (this.groupInfoRoleScopes.length === 0 || this.insuranceMapperRoleScopes.length === 0 || this.accountRoleScopes.length === 0)))
  }
  getRoleScopes(): RoleScope[] {
    var roleScopes: RoleScope[] = []
    roleScopes.push(...this.adminRoleScopes)
    roleScopes.push(...this.groupInfoRoleScopes)
    roleScopes.push(...this.insuranceMapperRoleScopes)
    roleScopes.push(...this.accountRoleScopes)
    return roleScopes;
  }
}

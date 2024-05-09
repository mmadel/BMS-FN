import { Component, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
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
}

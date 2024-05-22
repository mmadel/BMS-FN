import { Component, Input, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleBinder } from '../../../../model/account/role/role.binder';
import { RoleScopeCreator } from '../../role.scope.creator';

@Component({
  selector: 'filing-role',
  templateUrl: './filing-role.component.html',
  styleUrls: ['./filing-role.component.scss']
})
export class FilingRoleComponent implements OnInit {
  filingPermission: RoleScope[] = []
  @Input() roleBinder?: RoleBinder
  @Input() componentRole: string[]
  constructor() { }

  ngOnInit(): void {
  }
  changeFilingPermission(event: any) {
    var scopeIdValues: string[] = ['filingh', 'filingv', 'filingvm']
    this.filingPermission = RoleScopeCreator.create(event.target.id, scopeIdValues, this.filingPermission, Role.FILING_ROLE)
  }
  isValid(): boolean {
    return !(this.filingPermission.length === 0)
  }
  getRoleScopes(): RoleScope[] {
    var roleScopes: RoleScope[] = []
    roleScopes.push(...this.filingPermission)
    return roleScopes;
  }
}

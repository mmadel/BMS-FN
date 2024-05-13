import { Component, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleScopeCreator } from '../../role.scope.creator';

@Component({
  selector: 'client-role',
  templateUrl: './client-role.component.html',
  styleUrls: ['./client-role.component.scss']
})
export class ClientRoleComponent implements OnInit {
  clientPermission: RoleScope[] = []
  constructor() { }

  ngOnInit(): void {
  }

  changeClientPermission(event: any) {
    var scopeIdValues: string[] = ['clienth', 'clientv', 'clientvm']
    this.clientPermission = RoleScopeCreator.create(event.target.id, scopeIdValues, this.clientPermission, Role.PATIENT_ROLE)
  }
  isValid(): boolean {
    return !(this.clientPermission.length === 0)
  }
  getRoleScopes(): RoleScope[] {
    var roleScopes: RoleScope[] = []
    roleScopes.push(...this.clientPermission)
    return roleScopes;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { RoleEmitingService } from 'src/app/modules/admin.tools/services/role.emiting/role-emiting.service';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleBinder } from '../../../../model/account/role/role.binder';
import { RoleScopeCreator } from '../../role.scope.creator';

@Component({
  selector: 'client-role',
  templateUrl: './client-role.component.html',
  styleUrls: ['./client-role.component.scss']
})
export class ClientRoleComponent implements OnInit {
  clientPermission: RoleScope[] = []
  selectedView: boolean = false;
  @Input() roleBinder?: RoleBinder
  @Input() componentRole: string[]
  constructor(private roleEmitingService: RoleEmitingService) { }

  ngOnInit(): void {
    this.roleEmitingService.selectedRole$.pipe(
      filter((result: Boolean) => result !== null && result == true)
    )
      .subscribe((result: any) => {
        console.log(JSON.stringify(result))
        this.clientPermission = [];
        this.selectedView = result
        var scopeIdValues: string[] = ['clienth', 'clientv', 'clientvm']
        this.clientPermission = RoleScopeCreator.create('clientv', scopeIdValues, this.clientPermission, Role.PATIENT_ROLE)
      })
  }

  changeClientPermission(event: any) {
    this.clientPermission = [];
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

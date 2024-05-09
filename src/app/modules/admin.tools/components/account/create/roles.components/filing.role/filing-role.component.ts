import { Component, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleScopeCreator } from '../../role.scope.creator';

@Component({
  selector: 'filing-role',
  templateUrl: './filing-role.component.html',
  styleUrls: ['./filing-role.component.scss']
})
export class FilingRoleComponent implements OnInit {
  filingPermission: RoleScope[] = []
  constructor() { }

  ngOnInit(): void {
  }
  changeFilingPermission(event: any) {
    var scopeIdValues: string[] = ['clienth', 'clientv', 'clientvm']
    this.filingPermission = RoleScopeCreator.create(event.target.id, scopeIdValues, this.filingPermission, Role.FILING_ROLE)
  }

}

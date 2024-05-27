import { Component, Input, OnInit } from '@angular/core';
import { RoleEmitingService } from 'src/app/modules/admin.tools/services/role.emiting/role-emiting.service';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleBinder } from '../../../../model/account/role/role.binder';
import { RoleScopeBinder } from '../../role.scope.binder';
import { RoleScopeCreator } from '../../role.scope.creator';


@Component({
  selector: 'billing-role',
  templateUrl: './billing-role.component.html',
  styleUrls: ['./billing-role.component.scss']
})
export class BillingRoleComponent implements OnInit {
  subPermissionVisability: boolean = false
  billingRoleScopes: RoleScope[] = []
  invoiceRoleScopes: RoleScope[] = []
  feeScheduleRoleScopes: RoleScope[] = []
  modifierFeeRoleScopes: RoleScope[] = []
  @Input() roleBinder?: RoleBinder
  @Input() componentRole: string[]
  @Input() mode: string

  constructor(private roleEmitingService: RoleEmitingService) { }
  ngOnInit(): void {
    const checkParentRole = this.roleBinder?.billingH || this.roleBinder?.billingV || this.roleBinder?.billingM
    if (!checkParentRole && this.mode == 'update')
      this.subPermissionVisability = true
  }
  toggleSubPermission() {
    this.subPermissionVisability = !this.subPermissionVisability;
    if (this.subPermissionVisability) {
      this.billingRoleScopes = []
    }
    else {
      this.invoiceRoleScopes = []
      this.feeScheduleRoleScopes = [];
      this.modifierFeeRoleScopes = []
    }
  }
  changeBilling(event: any) {
    var scopeIdValues: string[] = ['billingh', 'billingv', 'billingvm']
    this.billingRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.billingRoleScopes, Role.BILLING_ROLE)

  }
  changeInvoice(event: any) {
    var scopeIdValues: string[] = ['invh', 'invv', 'invvvm']
    this.invoiceRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.invoiceRoleScopes, Role.INVOICE_BILLING_ROLE)
  }
  changeFeeSchedule(event: any) {
    var scopeIdValues: string[] = ['feeh', 'feev', 'feevm']
    this.feeScheduleRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.feeScheduleRoleScopes, Role.FEE_SCHEDULE_BILLING_ROLE)
  }
  changeModifierRule(event: any) {
    var scopeIdValues: string[] = ['modifierh', 'modifierv', 'modifiervm']
    this.modifierFeeRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.modifierFeeRoleScopes, Role.MODIFIER_RULE_BILLING_ROLE)
  }
  isValid(): boolean {
    return !((this.billingRoleScopes.length === 0
      && (this.invoiceRoleScopes.length === 0 || this.feeScheduleRoleScopes.length === 0 || this.modifierFeeRoleScopes.length === 0)))
  }
  getRoleScopes(): RoleScope[] {
    var roleScopes: RoleScope[] = []
    roleScopes.push(...this.billingRoleScopes)
    roleScopes.push(...this.invoiceRoleScopes)
    roleScopes.push(...this.feeScheduleRoleScopes)
    roleScopes.push(...this.modifierFeeRoleScopes)
    return roleScopes;
  }
}

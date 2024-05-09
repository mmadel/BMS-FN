import { Component, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
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

  constructor() { }

  ngOnInit(): void {
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
}

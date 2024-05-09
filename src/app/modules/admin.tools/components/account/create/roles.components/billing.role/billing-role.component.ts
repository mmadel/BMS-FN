import { Component, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { Scope } from 'src/app/modules/secuirty/model/scope';


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
    switch (event.target.id) {
      case 'billingh':
        this.billingRoleScopes = []
        break;
      case 'billingv':
        var roleScope: RoleScope = {
          role: Role.BILLING_ROLE
        }
        roleScope.scope = Scope.VIEWSCOPE
        this.billingRoleScopes = this.removeFromRoleScopesByScope(this.billingRoleScopes, Scope.MODIFYSCOPE);
        this.billingRoleScopes.push(roleScope)
        break;
      case 'billingvm':
        var roleScope: RoleScope = {
          role: Role.BILLING_ROLE
        }
        roleScope.scope = Scope.MODIFYSCOPE
        this.billingRoleScopes = this.removeFromRoleScopesByScope(this.billingRoleScopes, Scope.VIEWSCOPE);
        this.billingRoleScopes.push(roleScope)
        break;
    }
  }
  changeInvoice(event: any) {
    switch (event.target.id) {
      case 'invh':
        this.invoiceRoleScopes = []
        break
      case 'invv':
        var roleScope: RoleScope = {
          role: Role.INVOICE_BILLING_ROLE
        }
        this.invoiceRoleScopes = this.removeFromRoleScopesByScope(this.invoiceRoleScopes, Scope.MODIFYSCOPE);
        roleScope.scope = Scope.VIEWSCOPE
        this.invoiceRoleScopes.push(roleScope)
        break;
      case 'invvvm':
        var roleScope: RoleScope = {
          role: Role.INVOICE_BILLING_ROLE
        }
        this.invoiceRoleScopes = this.removeFromRoleScopesByScope(this.invoiceRoleScopes, Scope.VIEWSCOPE);
        roleScope.scope = Scope.MODIFYSCOPE
        this.invoiceRoleScopes.push(roleScope)
        break;
    }
  }
  changeFeeSchedule(event: any) {
    switch (event.target.id) {
      case 'feeh':
        this.feeScheduleRoleScopes = []
        break;
      case 'feev':
        var roleScope: RoleScope = {
          role: Role.FEE_SCHEDULE_BILLING_ROLE
        }
        roleScope.scope = Scope.VIEWSCOPE
        this.feeScheduleRoleScopes = this.removeFromRoleScopesByScope(this.feeScheduleRoleScopes, Scope.MODIFYSCOPE);
        this.feeScheduleRoleScopes.push(roleScope)
        break;
      case 'feevm':
        var roleScope: RoleScope = {
          role: Role.FEE_SCHEDULE_BILLING_ROLE
        }
        roleScope.scope = Scope.MODIFYSCOPE
        this.feeScheduleRoleScopes = this.removeFromRoleScopesByScope(this.feeScheduleRoleScopes, Scope.VIEWSCOPE);
        this.feeScheduleRoleScopes.push(roleScope)
        break;
    }
  }
  changeModifierRule(event: any) {
    switch (event.target.id) {
      case 'modifierh':
        this.modifierFeeRoleScopes = []
        break;
      case 'modifierv':
        var roleScope: RoleScope = {
          role: Role.MODIFIER_RULE_BILLING_ROLE
        }
        roleScope.scope = Scope.VIEWSCOPE
        this.modifierFeeRoleScopes = this.removeFromRoleScopesByScope(this.modifierFeeRoleScopes, Scope.MODIFYSCOPE);
        this.modifierFeeRoleScopes.push(roleScope)
        break;
      case 'modifiervm':
        var roleScope: RoleScope = {
          role: Role.MODIFIER_RULE_BILLING_ROLE
        }
        roleScope.scope = Scope.MODIFYSCOPE
        this.modifierFeeRoleScopes = this.removeFromRoleScopesByScope(this.modifierFeeRoleScopes, Scope.VIEWSCOPE);
        this.modifierFeeRoleScopes.push(roleScope)
        break;
    }
  }
  private removeFromRoleScopesByScope(list: RoleScope[], scope: string) {
    return list.filter((roleScope) => roleScope.scope !== scope);
  }

}

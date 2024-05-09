import { Component, OnInit } from '@angular/core';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { Scope } from 'src/app/modules/secuirty/model/scope';
import { RoleScopeCreator } from '../../role.scope.creator';

@Component({
  selector: 'payment-role',
  templateUrl: './payment-role.component.html',
  styleUrls: ['./payment-role.component.scss']
})
export class PaymentRoleComponent implements OnInit {
  subPermissionVisability: boolean = false
  paymentRoleScopes: RoleScope[] = []
  paymentBatchInsuranceRoleScopes: RoleScope[] = []
  paymentBatchClientRoleScopes: RoleScope[] = []
  paymentBalanceStatementRoleScopes: RoleScope[] = []
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubPermission() {
    this.subPermissionVisability = !this.subPermissionVisability;
    if (this.subPermissionVisability) {
      this.paymentRoleScopes = []
    }
    else {
      this.paymentBatchInsuranceRoleScopes = []
      this.paymentBatchClientRoleScopes = [];
      this.paymentBalanceStatementRoleScopes = []
    }
  }

  changePayment(event: any) {
    var scopeIdValues: string[] = ['paymenth', 'paymentv', 'paymentvm']
    this.paymentRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.paymentRoleScopes, Role.PAYMENT_ROLE)
  }
  changePaymentBatchInsurance(event: any) {
    var scopeIdValues: string[] = ['batchinsuranceh', 'batchinsurancev', 'batchinsurancevm']
    this.paymentRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.paymentRoleScopes, Role.BATCH_INSURANCE_PAYMENT_ROLE)
  }
  changePaymentBatchClient(event: any) {
    var scopeIdValues: string[] = ['batchclienth', 'batchclientv', 'batchclientvm']
    this.paymentRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.paymentRoleScopes, Role.BATCH_CLIENT_PAYMENT_ROLE)
  }
  changePaymentBalanceStatement(event: any) {
    var scopeIdValues: string[] = ['balanceh', 'balancev', 'balancevm']
    this.paymentRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.paymentRoleScopes, Role.BALANCE_STATEMENT_PAYMENT_ROLE)
  }
}

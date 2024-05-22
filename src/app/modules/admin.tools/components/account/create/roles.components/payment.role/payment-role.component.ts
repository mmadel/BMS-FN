import { Component, Input, OnInit } from '@angular/core';
import { RoleEmitingService } from 'src/app/modules/admin.tools/services/role.emiting/role-emiting.service';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { RoleBinder } from '../../../../model/account/role/role.binder';
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
  @Input() roleBinder?: RoleBinder
  @Input() componentRole: string[]
  @Input() mode: string
  constructor(private roleEmitingService: RoleEmitingService) { }

  ngOnInit(): void {
    const checkParentRole = this.roleBinder.paymentH || this.roleBinder.paymentV || this.roleBinder.paymentM
    if (!checkParentRole && this.mode == 'update')
      this.subPermissionVisability = true
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
    this.notifyClient(event.target.id, 'paymenth')
  }
  changePaymentBatchInsurance(event: any) {
    var scopeIdValues: string[] = ['batchinsuranceh', 'batchinsurancev', 'batchinsurancevm']
    this.paymentBatchInsuranceRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.paymentRoleScopes, Role.BATCH_INSURANCE_PAYMENT_ROLE)
    this.notifyClient(event.target.id, 'batchinsuranceh')
  }
  changePaymentBatchClient(event: any) {
    var scopeIdValues: string[] = ['batchclienth', 'batchclientv', 'batchclientvm']
    this.paymentBatchClientRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.paymentRoleScopes, Role.BATCH_CLIENT_PAYMENT_ROLE)
    this.notifyClient(event.target.id, 'batchclienth')
  }
  changePaymentBalanceStatement(event: any) {
    var scopeIdValues: string[] = ['balanceh', 'balancev', 'balancevm']
    this.paymentBalanceStatementRoleScopes = RoleScopeCreator.create(event.target.id, scopeIdValues, this.paymentRoleScopes, Role.BALANCE_STATEMENT_PAYMENT_ROLE)
    this.notifyClient(event.target.id, 'balanceh')
  }
  isValid(): boolean {
    return !((this.paymentRoleScopes.length === 0
      && (this.paymentBatchInsuranceRoleScopes.length === 0 || this.paymentBatchClientRoleScopes.length === 0 || this.paymentBalanceStatementRoleScopes.length === 0)))
  }
  getRoleScopes(): RoleScope[] {
    var roleScopes: RoleScope[] = []
    roleScopes.push(...this.paymentRoleScopes)
    roleScopes.push(...this.paymentBatchInsuranceRoleScopes)
    roleScopes.push(...this.paymentBatchClientRoleScopes)
    roleScopes.push(...this.paymentBalanceStatementRoleScopes)
    return roleScopes;
  }
  private notifyClient(componentId: string, field: string) {
    if (componentId !== field)
      this.roleEmitingService.selectedRole$.next(true)
    else
      this.roleEmitingService.selectedRole$.next(false)
  }
}

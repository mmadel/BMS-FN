import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/modules/model/admin/user/user';
import { AdminRoleComponent } from './roles.components/admin.role/admin-role.component';
import { BillingRoleComponent } from './roles.components/billing.role/billing-role.component';
import { ClientRoleComponent } from './roles.components/client.role/client-role.component';
import { FilingRoleComponent } from './roles.components/filing.role/filing-role.component';
import { PaymentRoleComponent } from './roles.components/payment.role/payment-role.component';
import { ProviderRoleComponent } from './roles.components/provider.role/provider-role.component';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  @ViewChild('accountForm') accountForm: NgForm;
  @ViewChild('billingRoleComponent') billingRoleComponent: BillingRoleComponent;
  @ViewChild('clientRoleComponent') clientRoleComponent: ClientRoleComponent;
  @ViewChild('providerRoleComponent') providerRoleComponent: ProviderRoleComponent;
  @ViewChild('paymentRoleComponent') paymentRoleComponent: PaymentRoleComponent;
  @ViewChild('adminRoleComponent') adminRoleComponent: AdminRoleComponent;
  @ViewChild('filingRoleComponent') filingRoleComponent: FilingRoleComponent;

  notValidForm: boolean = false
  mode: string = 'create'
  notValidBillingPermission: boolean = false;
  notValidProviderPermission: boolean = false;
  notValidClientPermission: boolean = false;
  notValidFilingPermission: boolean = false;
  notValidPaymentPermission: boolean = false;
  notValidAdminPermission: boolean = false;
  user: User = {};
  constructor() { }

  ngOnInit(): void {
  }
  create() {

    if (this.accountForm.valid || (this.checkBillingPermissionValidation()
      && this.checkProviderPermissionValidation()
      && this.checkClientPermissionValidation()
      && this.checkPaymentPermissionValidation()
      && this.checkFilingPermissionValidation()
      && this.checkAdminPermissionValidation())) {
      this.notValidForm = false;
    } else {
      this.notValidForm = true;
    }
  }
  private checkBillingPermissionValidation(): boolean {
    return this.notValidBillingPermission = !this.billingRoleComponent.isValid()
  }

  private checkProviderPermissionValidation(): boolean {
    console.log(this.providerRoleComponent.isValid())
    return this.notValidProviderPermission = !this.providerRoleComponent.isValid();
  }

  private checkClientPermissionValidation(): boolean {
    return this.notValidClientPermission = !this.clientRoleComponent.isValid();
  }

  private checkPaymentPermissionValidation(): boolean {
    return this.notValidPaymentPermission = !this.paymentRoleComponent.isValid();
  }

  private checkFilingPermissionValidation(): boolean {
    console.log(this.filingRoleComponent.isValid())
    return this.notValidFilingPermission = !this.filingRoleComponent.isValid()

  }
  private checkAdminPermissionValidation(): boolean {
    return this.notValidAdminPermission = !this.adminRoleComponent.isValid()

  }
}

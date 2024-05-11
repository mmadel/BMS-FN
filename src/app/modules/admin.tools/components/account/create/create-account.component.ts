import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/model/admin/user/user';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { EncryptionService } from 'src/app/modules/secuirty/service/encryption.service';
import { UserService } from 'src/app/modules/secuirty/service/user.service';
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
  constructor(private userService: UserService
    , private toastrService: ToastrService
    , private encryptionService: EncryptionService) { }

  ngOnInit(): void {
  }
  create() {
    var isPermissinosValid = this.checkPermissionValidation();
    if (this.accountForm.valid && isPermissinosValid) {
      this.notValidForm = false;

      this.user.roleScope = this.FillRoleScope();
      this.user.name = this.user.lastName + ',' + this.user.firstName;
      this.user.password = this.encryptionService.encrypt(this.user.password)
      this.userService.createUser(this.user).subscribe(result => {
        this.toastrService.success("User Created.")
        this.changeVisibility.next('close')
      }, error => {
        this.toastrService.error("Error during user creation.")
      })
    } else {
      this.notValidForm = true;
    }
  }
  private checkPermissionValidation(): boolean {
    return !(this.checkBillingPermissionValidation()
      && this.checkProviderPermissionValidation()
      && this.checkClientPermissionValidation()
      && this.checkPaymentPermissionValidation()
      && this.checkFilingPermissionValidation()
      && this.checkAdminPermissionValidation())
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
  private FillRoleScope(): RoleScope[] {
    var roleScopes: RoleScope[] = []
    roleScopes.push(... this.billingRoleComponent?.getRoleScopes());
    roleScopes.push(... this.providerRoleComponent.getRoleScopes());
    roleScopes.push(... this.clientRoleComponent.getRoleScopes());
    roleScopes.push(... this.paymentRoleComponent.getRoleScopes());
    roleScopes.push(... this.filingRoleComponent.getRoleScopes());
    roleScopes.push(... this.clientRoleComponent.getRoleScopes());
    roleScopes.push(... this.adminRoleComponent.getRoleScopes());
    return roleScopes;
  }
}

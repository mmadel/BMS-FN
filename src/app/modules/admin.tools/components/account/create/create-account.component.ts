import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/model/admin/user/user';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { EncryptionService } from 'src/app/modules/secuirty/service/encryption.service';
import { UserService } from 'src/app/modules/secuirty/service/user.service';
import { RoleEmitingService } from '../../../services/role.emiting/role-emiting.service';
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
  @Input() uuid: string;
  @ViewChild('accountForm') accountForm: NgForm;
  @ViewChild('billingRoleComponent') billingRoleComponent: BillingRoleComponent;
  @ViewChild('clientRoleComponent') clientRoleComponent: ClientRoleComponent;
  @ViewChild('providerRoleComponent') providerRoleComponent: ProviderRoleComponent;
  @ViewChild('paymentRoleComponent') paymentRoleComponent: PaymentRoleComponent;
  @ViewChild('adminRoleComponent') adminRoleComponent: AdminRoleComponent;
  @ViewChild('filingRoleComponent') filingRoleComponent: FilingRoleComponent;

  notValidForm: boolean = false
  notValidPermissions: boolean = false
  mode: string = 'create'
  notValidBillingPermission: boolean = false;
  notValidProviderPermission: boolean = false;
  notValidClientPermission: boolean = false;
  notValidFilingPermission: boolean = false;
  notValidPaymentPermission: boolean = false;
  notValidAdminPermission: boolean = false;
  user: User = {};
  userSetPassword: boolean = false
  roles?: RoleScope[]
  constructor(private userService: UserService
    , private toastrService: ToastrService
    , private encryptionService: EncryptionService
    , private roleEmitingService: RoleEmitingService) { }

  ngOnInit(): void {
  }
  create() {
    if (this.accountForm.valid) {
      this.notValidForm = false;
      this.user.roleScope = this.FillRoleScope();
      if (this.user.roleScope.length === 0)
        this.notValidPermissions = true
      else {
        this.user.name = this.user.lastName + ',' + this.user.firstName;
        if (!this.userSetPassword)
          this.user.password = this.encryptionService.encrypt(this.user.password)
        else
          this.user.password = undefined;
        this.userService.createUser(this.user).subscribe(result => {
          this.toastrService.success("User Created.")
          this.changeVisibility.next('close')
        }, error => {
          console.log(error.error.message)
          this.toastrService.error("Error during user creation.", error.error.message)
        })
        this.notValidPermissions = false;
      }

    } else {
      this.notValidForm = true;
    }
  }

  private FillRoleScope(): RoleScope[] {
    console.log('this.billingRoleComponent?.getRoleScopes() ' + JSON.stringify(this.billingRoleComponent?.getRoleScopes()))
    console.log('this.providerRoleComponent.getRoleScopes() ' + JSON.stringify(this.providerRoleComponent.getRoleScopes()))
    console.log('this.clientRoleComponent.getRoleScopes() ' + JSON.stringify(this.clientRoleComponent.getRoleScopes()))
    console.log('this.paymentRoleComponent.getRoleScopes() ' + JSON.stringify(this.paymentRoleComponent.getRoleScopes()))
    console.log('this.filingRoleComponent.getRoleScopes() ' + JSON.stringify(this.filingRoleComponent.getRoleScopes()))
    console.log('this.adminRoleComponent.getRoleScopes() ' + JSON.stringify(this.adminRoleComponent.getRoleScopes()))

    var roleScopes: RoleScope[] = []
    roleScopes.push(... this.billingRoleComponent?.getRoleScopes());
    roleScopes.push(... this.providerRoleComponent.getRoleScopes());
    roleScopes.push(... this.clientRoleComponent.getRoleScopes());
    roleScopes.push(... this.paymentRoleComponent.getRoleScopes());
    roleScopes.push(... this.filingRoleComponent.getRoleScopes());
    roleScopes.push(... this.adminRoleComponent.getRoleScopes());
    return roleScopes;
  }

}

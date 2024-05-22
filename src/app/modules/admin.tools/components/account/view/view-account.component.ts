import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, map, Observable, tap } from 'rxjs';
import { User } from 'src/app/modules/model/admin/user/user';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { UserService } from 'src/app/modules/secuirty/service/user.service';
import { RoleBinder } from '../../model/account/role/role.binder';
import { RoleScopeBinder } from '../create/role.scope.binder';
import { AdminRoleComponent } from '../create/roles.components/admin.role/admin-role.component';
import { BillingRoleComponent } from '../create/roles.components/billing.role/billing-role.component';
import { ClientRoleComponent } from '../create/roles.components/client.role/client-role.component';
import { FilingRoleComponent } from '../create/roles.components/filing.role/filing-role.component';
import { PaymentRoleComponent } from '../create/roles.components/payment.role/payment-role.component';
import { ProviderRoleComponent } from '../create/roles.components/provider.role/provider-role.component';

@Component({
  selector: 'view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {
  notValidForm: boolean = false
  notValidPermissions: boolean = false
  @Input() user: User;
  binder: RoleBinder
  @Output() changeVisibility = new EventEmitter<string>()
  @ViewChild('billingRoleComponent') billingRoleComponent: BillingRoleComponent;
  @ViewChild('clientRoleComponent') clientRoleComponent: ClientRoleComponent;
  @ViewChild('providerRoleComponent') providerRoleComponent: ProviderRoleComponent;
  @ViewChild('paymentRoleComponent') paymentRoleComponent: PaymentRoleComponent;
  @ViewChild('adminRoleComponent') adminRoleComponent: AdminRoleComponent;
  @ViewChild('filingRoleComponent') filingRoleComponent: FilingRoleComponent;

  constructor(private userService: UserService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.user.firstName = this.user.name.split(',')[1]
    this.user.lastName = this.user.name.split(',')[0]
    this.binder = RoleScopeBinder.bind(this.user.roleScope)
  }
  update() {

    var roleScopes: RoleScope[] = []
    roleScopes.push(... this.billingRoleComponent?.getRoleScopes());
    roleScopes.push(... this.providerRoleComponent.getRoleScopes());
    roleScopes.push(... this.clientRoleComponent.getRoleScopes());
    roleScopes.push(... this.paymentRoleComponent.getRoleScopes());
    roleScopes.push(... this.filingRoleComponent.getRoleScopes());
    roleScopes.push(... this.adminRoleComponent.getRoleScopes());


    const roleScopeMap: { [key: string]: RoleScope } = {};
    this.user.roleScope.forEach(item => {
      roleScopeMap[item.role] = item;
    });

    roleScopes.forEach(modifiedItem => {
      roleScopeMap[modifiedItem.role] = modifiedItem;
    });
    this.user.roleScope = Object.values(roleScopeMap);
    this.userService.updateUser(this.user).subscribe(result => {
      this.toastrService.success("user updated.")
      this.changeVisibility.next('update')
    }, error => {
      this.toastrService.error("error during update user")
    })
  }
}

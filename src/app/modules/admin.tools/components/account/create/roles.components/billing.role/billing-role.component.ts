import { Component, OnInit } from '@angular/core';
import { BillingPermission } from 'src/app/modules/admin.tools/model/billing/billing.permission';
import { BillingSubPermission } from 'src/app/modules/admin.tools/model/billing/billing.sub.permission';

@Component({
  selector: 'billing-role',
  templateUrl: './billing-role.component.html',
  styleUrls: ['./billing-role.component.scss']
})
export class BillingRoleComponent implements OnInit {
  subPermissionVisability: boolean = false
  billingSubPermission: BillingSubPermission = {
    billingInvoicePermission: {
      isHidden: false,
      isViewOnly: false,
      isModify: false
    },
    billingFeeSchedulePermission: {
      isHidden: false,
      isViewOnly: false,
      isModify: false
    },
    billingModifierRulePermission: {
      isHidden: false,
      isViewOnly: false,
      isModify: false
    }
  }
  billingPermission: BillingPermission = {
    isHidden: false,
    isViewOnly: false,
    isModify: false,
    billingSubPermission: this.billingSubPermission
  }

  constructor() { }

  ngOnInit(): void {
  }
  toggleSubPermission() {
    this.subPermissionVisability = !this.subPermissionVisability;
  }
  changeBilling(event: any) {
    switch (event.target.id) {
      case 'billingh':
        this.billingPermission.isHidden = true
        this.billingPermission.isViewOnly = false;
        this.billingPermission.isModify = false;
        break;
      case 'billingv':
        this.billingPermission.isViewOnly = true;
        this.billingPermission.isHidden = false
        this.billingPermission.isModify = false;
        break;
      case 'billingvm':
        this.billingPermission.isModify = true;
        this.billingPermission.isHidden = false
        this.billingPermission.isViewOnly = false;
        break;
    }
  }

}

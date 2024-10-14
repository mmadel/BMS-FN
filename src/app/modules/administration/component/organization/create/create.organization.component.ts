import { Component, OnInit, ViewChild } from '@angular/core';
import { Organization } from 'src/app/modules/model/admin/organiztion';
import { BillingInfo, BillingInfoComponent } from '../../billing.info/billing.info.component';
import { FacilityInfoComponent } from '../../facility/facility.info.component';
import { UserInfoComponent } from '../../user/user.info.component';

@Component({
  selector: 'app-create.organization',
  templateUrl: './create.organization.component.html',
  styleUrls: ['./create.organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
  @ViewChild('billingInfoComponent') billingInfoComponent: BillingInfoComponent;
  @ViewChild('userInfoComponent') userInfoComponent: UserInfoComponent;
  @ViewChild('facilityInfoComponent') facilityInfoComponent: FacilityInfoComponent;
  constructor() { }

  ngOnInit(): void {
  }
  create() {
    if (this.billingInfoComponent.billingInfoFrom.valid) {
      this.buildOrganizationBillingProvider(this.billingInfoComponent.billingInfo)
    } else {
      this.billingInfoComponent.notValidForm = true
    }
    if (this.userInfoComponent.userInfoFrom.valid) {
      this.buildOrganizationAdministratorInfo();
    } else {
      this.userInfoComponent.notValidForm = true
    }
  }

  private buildOrganizationBillingProvider(billingInfo: BillingInfo) {

  }

  private buildOrganizationAdministratorInfo() {

  }

  private buildOrganizationFacilityInfo() {

  }
}

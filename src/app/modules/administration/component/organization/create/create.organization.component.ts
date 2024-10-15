import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdministratorRoleCreator } from 'src/app/modules/admin.tools/components/account/create/admin.role.creator';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { ClinicData } from 'src/app/modules/model/admin/clinic.data';
import { OrganizationData } from 'src/app/modules/model/admin/organization.data';
import { Organization } from 'src/app/modules/model/admin/organiztion';
import { User } from 'src/app/modules/model/admin/user/user';
import { EncryptionService } from 'src/app/modules/secuirty/service/encryption.service';
import { CreateOrganizationService } from '../../../service/create/create-organization.service';
import { BillingInfo, BillingInfoComponent } from '../../billing.info/billing.info.component';
import { Facility, FacilityInfoComponent } from '../../facility/facility.info.component';
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
  organization: Organization = {};
  constructor(private createOrganizationService: CreateOrganizationService,
    private toastrService: ToastrService,
    private encryptionService: EncryptionService) { }

  ngOnInit(): void {
  }
  create() {
    if (true) {
      this.buildOrganizationBillingProvider(this.billingInfoComponent.billingInfo);
      this.buildOrganizationAdministratorInfo(this.userInfoComponent.user);
      this.buildOrganizationFacilityInfo(this.facilityInfoComponent.facilities);
      this.createOrganizationService.create(this.organization).subscribe(result => {
        this.toastrService.success('Organization Created');
      }, error => {
        this.toastrService.error('Error during create Organization');
      })

    }
  }

  private buildOrganizationBillingProvider(billingInfo: BillingInfo) {
    this.organization.businessName = billingInfo.businessName
    this.organization.firstName = billingInfo.firstName;
    this.organization.lastName = billingInfo.lastName;
    this.organization.npi = billingInfo.npi;
    this.organization.type = 'Default';
    var organizationData: OrganizationData = {
      taxId: billingInfo.taxId,
      taxonomy: billingInfo.taxonomy,
      address: billingInfo.address,
      addressTwo: billingInfo.addressTwo,
      city: billingInfo.city,
      state: billingInfo.state,
      zipcode: billingInfo.zipcode,
      phone: billingInfo.phone,
      fax: billingInfo.fax,
      email: billingInfo.email
    }
    this.organization.organizationData = organizationData;
  }

  private buildOrganizationAdministratorInfo(user: User) {
    user.password = this.encryptionService.encrypt(user.password)
    user.roleScope = AdministratorRoleCreator.create();
    this.organization.user = user;
  }

  private buildOrganizationFacilityInfo(facilities: Facility[]) {
    this.organization.clinics = facilities.map(facility => {
      var clinicData: ClinicData = {
        address: facility.address,
        zipCode: facility.zipCode,
        city: facility.city,
        state: facility.state
      }
      return {
        title: facility.title,
        npi: facility.title,
        clinicdata: clinicData
      }
    })
    this.organization
  }

  private isValidOrganization(): boolean {
    if (this.billingInfoComponent.billingInfoFrom.valid)
      this.billingInfoComponent.notValidForm = false;
    else
      this.billingInfoComponent.notValidForm = true

    if (this.userInfoComponent.userInfoFrom.valid)
      this.userInfoComponent.notValidForm = false;
    else
      this.userInfoComponent.notValidForm = true

    if (this.facilityInfoComponent.facilities.length === 1)
      this.facilityInfoComponent.notValid = false;
    else
      this.facilityInfoComponent.notValid = true

    return !this.billingInfoComponent.notValidForm && !this.userInfoComponent.notValidForm && !this.facilityInfoComponent.notValid
  }
}

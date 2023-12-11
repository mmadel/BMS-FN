import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { OrganizationService } from 'src/app/modules/admin.tools/services/organization.service';
import { Organization } from 'src/app/modules/model/admin/organiztion';
import { BillingProviderConfiguration } from '../../../model/billing.provider.configuration';
import { InsuranceCompanyConfigurationEmitterService } from '../../../service/emitting/insurance-company-configuration-emitter.service';

@Component({
  selector: 'app-box33-settings',
  templateUrl: './box33-settings.component.html',
  styleUrls: ['./box33-settings.component.scss']
})
export class Box33SettingsComponent implements OnInit {
  constructor(private organizationService: OrganizationService
    , private insuranceCompanyConfigurationEmitterService: InsuranceCompanyConfigurationEmitterService) { }
  defualtBillingProvider!: Organization;
  changeProviderVisible: boolean = false;
  billingProviderConfiguration: BillingProviderConfiguration = {
    box33: false
  };
  ngOnInit(): void {
    this.insuranceCompanyConfigurationEmitterService.updatedBillingProvider$.pipe(
      filter((result)=> result !=null)
    ).subscribe((result)=>{
      this.billingProviderConfiguration.billingProvider = result;

    })
    this.organizationService.findDefaultOrganization()
      .subscribe((result) => {
        this.defualtBillingProvider = result;
      })
  }
  onChangeDefualtBillingProvider() {
    this.changeProviderVisible = true;
  }
  toggleChangeProviderVisible() {
    this.changeProviderVisible = !this.changeProviderVisible;
  }
}

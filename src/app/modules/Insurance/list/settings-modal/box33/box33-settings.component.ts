import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { OrganizationService } from 'src/app/modules/admin.tools/services/organization.service';
import { Organization } from 'src/app/modules/model/admin/organiztion';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { BillingProviderConfiguration } from '../../../model/billing.provider.configuration';
import { InsuranceCompanyConfigurationEmitterService } from '../../../service/emitting/insurance-company-configuration-emitter.service';

@Component({
  selector: 'app-box33-settings',
  templateUrl: './box33-settings.component.html',
  styleUrls: ['./box33-settings.component.scss']
})
export class Box33SettingsComponent implements OnInit {
  componentRole: string[] = [Role.BILLING_ROLE ];
  @Input() selectedBillingProviderConfiguration: BillingProviderConfiguration;
  defualtBillingProvider!: Organization;
  changeProviderVisible: boolean = false;
  billingProviderConfiguration: BillingProviderConfiguration = {}

  constructor(private organizationService: OrganizationService
    , private insuranceCompanyConfigurationEmitterService: InsuranceCompanyConfigurationEmitterService) { }


  ngOnInit(): void {
    this.fill();
    this.insuranceCompanyConfigurationEmitterService.updatedBillingProvider$.pipe(
      filter((result) => result != null)
    ).subscribe((result) => {
      this.billingProviderConfiguration.billingProvider = result;

    })

  }
  onChangeDefualtBillingProvider() {
    this.changeProviderVisible = true;
  }
  toggleChangeProviderVisible() {
    this.changeProviderVisible = !this.changeProviderVisible;
  }
  closeEditProvider(event: any) {
    if (event === 'close')
      this.changeProviderVisible = false
  }
  fill() {
    if (this.selectedBillingProviderConfiguration.billingProvider !== null) {
      this.defualtBillingProvider = this.selectedBillingProviderConfiguration.billingProvider;
      this.billingProviderConfiguration.billingProvider = this.defualtBillingProvider = this.selectedBillingProviderConfiguration.billingProvider
    }
    else {
      this.organizationService.findDefaultOrganization()
        .subscribe((result) => {
          this.billingProviderConfiguration.billingProvider = result;
          this.defualtBillingProvider = result;
        })
    }
  }
}

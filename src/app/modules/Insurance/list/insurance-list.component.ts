import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InsuranceCompanyConfiguration } from '../../model/admin/insurance.company.configuration';
import { InsuranceCompanyContainer } from '../../model/admin/insurance.company.container';
import { BillingProviderConfiguration } from '../model/billing.provider.configuration';
import { GeneralConfiguration } from '../model/general.configuration';
import { InsuranceCompanyConfigurationService } from '../service/insurance-company-configuration.service';
import { InsuranceCompanyContainerService } from '../service/insurance-company-container.service';
import { Box33SettingsComponent } from './settings-modal/box33/box33-settings.component';
import { GeneralSettingsComponent } from './settings-modal/general/general-settings.component';
//import usersData from './../../patient/list/_data';
@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {
  isuranceCompanyList$!: Observable<InsuranceCompanyContainer[]>;
  public isnsuranceSettingsVisible = false;
  @ViewChild('generalSettings') generalSettings: GeneralSettingsComponent;
  @ViewChild('box33Settings') box33Settings: Box33SettingsComponent;
  selectedInsuranceCompany: InsuranceCompanyContainer;
  selectedGeneralConfiguration: GeneralConfiguration;
  selectedBillingProviderConfiguration: BillingProviderConfiguration;
  columns = [
    {
      key: 'displayName',
      label: 'Name',
      _style: { width: '40%' }
    },
    {
      key: 'payerId',
      label: 'Payer Id',
      _style: { width: '40%' }
    },
    {
      key: 'actions',
      _style: { width: '5%' }
    },
  ];

  details_visible = Object.create({});
  constructor(private insuranceCompanyContainerService: InsuranceCompanyContainerService
    , private insuranceCompanyConfigurationService: InsuranceCompanyConfigurationService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isuranceCompanyList$ = this.insuranceCompanyContainerService.findInsuranceCompanyContianers();
  }
  public toggleInsuranceSettings() {
    this.isnsuranceSettingsVisible = !this.isnsuranceSettingsVisible
  }
  public openSesstings(event: any) {
    this.selectedInsuranceCompany = event;
    this.insuranceCompanyConfigurationService.findInsuranceCompanyConfiguration(this.selectedInsuranceCompany.payerId !== null ?
      this.selectedInsuranceCompany.payerId : this.selectedInsuranceCompany.insuranceCompanyId)
      .subscribe((result: any) => {
        this.constructGeneralConfiguration(result)
        this.constructBillingProviderConfiguration(result);
        this.isnsuranceSettingsVisible = true;
      })
  }
  save() {
    var insuranceCompanyConfiguration: InsuranceCompanyConfiguration = {
      insuranceCompanyIdentifier: this.selectedInsuranceCompany.payerId === null ?
        this.selectedInsuranceCompany.insuranceCompanyId : this.selectedInsuranceCompany.payerId,
      box32: this.generalSettings.generalConfiguration.box32,
      box26: this.generalSettings.generalConfiguration.box26,
      billingProvider: this.box33Settings.billingProviderConfiguration.billingProvider,
      isAssignedToPayer: this.selectedInsuranceCompany.payerId === null ? false : true
    }
    this.insuranceCompanyConfigurationService.configure(insuranceCompanyConfiguration)
      .subscribe((result) => {
        this.toastr.success("Insurance Company configured successfully")
        this.isnsuranceSettingsVisible = false;
        this.ngOnInit();
      }, error => {
        this.toastr.error("Error during configure Insurance Company")
      })
  }
  constructGeneralConfiguration(insuranceCompanyConfiguration: InsuranceCompanyConfiguration) {
    if (insuranceCompanyConfiguration !== null)
      this.selectedGeneralConfiguration = {
        box32: insuranceCompanyConfiguration.box32,
        box26: insuranceCompanyConfiguration.box26
      }
    else
      this.selectedGeneralConfiguration = null;
  }
  constructBillingProviderConfiguration(insuranceCompanyConfiguration: InsuranceCompanyConfiguration) {
    if (insuranceCompanyConfiguration !== null)
      this.selectedBillingProviderConfiguration = {
        billingProvider: insuranceCompanyConfiguration.billingProvider !== null ? insuranceCompanyConfiguration.billingProvider : null
      }
    else
      this.selectedBillingProviderConfiguration = null;
  }
}

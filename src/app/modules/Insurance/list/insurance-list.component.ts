import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Clinic } from '../../model/admin/clinic';
import { InsuranceCompanyConfiguration } from '../../model/admin/insurance.company.configuration';
import { InsuranceCompanyHolder } from '../../model/admin/insurance.company.holder';
import { Role } from '../../secuirty/model/roles';
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
  isuranceCompanyList$!: Observable<InsuranceCompanyHolder[]>;
  public isnsuranceSettingsVisible = false;
  public editInsuranceVisible = false;
  @ViewChild('generalSettings') generalSettings: GeneralSettingsComponent;
  @ViewChild('box33Settings') box33Settings: Box33SettingsComponent;
  selectedInsuranceCompany: InsuranceCompanyHolder;
  selectedGeneralConfiguration: GeneralConfiguration;
  selectedBillingProviderConfiguration: BillingProviderConfiguration;
  selectedClinic:Clinic
  openedInsuranceCompanyConfigurationId: number = null;
  columns = [
    {
      key: 'name',
      label: 'Name',
      _style: { width: '40%' }
    },
    {
      key: 'actions',
      label: 'Settings',
      _style: { width: '10%' }
    },
  ];

  details_visible = Object.create({});
  componentRole: string[] = [Role.BILLING_ROLE];
  constructor(private insuranceCompanyContainerService: InsuranceCompanyContainerService
    , private insuranceCompanyConfigurationService: InsuranceCompanyConfigurationService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isuranceCompanyList$ = this.insuranceCompanyContainerService.findInsuranceCompanyContianers();
  }
  public toggleInsuranceSettings() {
    this.isnsuranceSettingsVisible = !this.isnsuranceSettingsVisible
  }
  public toggleEditInsurance() {
    this.editInsuranceVisible = !this.editInsuranceVisible
  }
  public openSesstings(event: any) {
    this.selectedInsuranceCompany = event;
    this.insuranceCompanyConfigurationService.findInsuranceCompanyConfiguration(event.id, event.visibility)
      .subscribe((result: any) => {
        if (result !== null)
          this.openedInsuranceCompanyConfigurationId = result.id;
        this.constructGeneralConfiguration(result)
        this.constructBillingProviderConfiguration(result);
        this.isnsuranceSettingsVisible = true;
      })
  }
  edit(item: any) {
    this.selectedClinic = item;
    this.editInsuranceVisible = true;
  }
  save() {
    var insuranceCompanyConfiguration: InsuranceCompanyConfiguration = {
      id: this.openedInsuranceCompanyConfigurationId,
      insuranceCompanyId: this.selectedInsuranceCompany.id,
      visibility: this.selectedInsuranceCompany.visibility,
      box32: this.generalSettings.generalConfiguration.box32,
      box26: this.generalSettings.generalConfiguration.box26,
      billingProvider: this.box33Settings.billingProviderConfiguration.billingProvider,
    }
    this.insuranceCompanyConfigurationService.updateConfigure(insuranceCompanyConfiguration)
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

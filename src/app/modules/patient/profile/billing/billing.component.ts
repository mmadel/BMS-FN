import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { ReferringProvider } from 'src/app/modules/model/clinical/referring.provider';
import { ReferringProviderService } from 'src/app/modules/providers/service/referring-provider.service';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { ViewCaseComponent } from './cases/view-case.component';
import { ViewInsuranceComponent } from './insurance/view-insurance.component';
import { ViewReferringProviderComponent } from './referring.provider/view-referring-provider.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() patient: Patient;
  @ViewChild('casesComponent') casesComponent: ViewCaseComponent;
  @ViewChild('referringProviderComponent') referringProviderComponent: ViewReferringProviderComponent;
  @ViewChild('insuranceComponent') insuranceComponent: ViewInsuranceComponent;
  ssn: string;
  externalID: string;
  componentRole: string[] = [Role.PATIENT_ROLE ];
  constructor() { }

  ngOnInit(): void {
    this.ssn = this.patient?.ssn;
    this.externalID = this.patient?.externalId
  }
  getCases() {
    if (this.casesComponent !== null || this.casesComponent !== undefined)
      return this.casesComponent.getcases();
    else
      return null;
  }
  getReferringProvider() {
    if (this.referringProviderComponent !== null || this.referringProviderComponent !== undefined)
      return this.referringProviderComponent.getReferringDoctor();
    else
      return null;
  }
  getInsurances() {
    if (this.insuranceComponent !== null || this.insuranceComponent !== undefined)
      return this.insuranceComponent.getInsurances();
    else
      return null;
  }
  getSSN() {
    if (this.ssn !== undefined || this.ssn !== null)
      return this.ssn
    else
      return null;
  }
  getExternalId() {
    if (this.externalID !== undefined || this.externalID !== null)
      return this.externalID;
    else
      return null;
  }
  public resetBilling() {
    this.casesComponent.resetCases();
    this.referringProviderComponent.resetReferringProvider();
    this.insuranceComponent.reset();
    this.ssn = null;
    this.externalID = null;
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { ReferringProvider } from 'src/app/modules/model/clinical/referring.provider';
import { ReferringProviderService } from 'src/app/modules/providers/service/referring-provider.service';
import { ViewCaseComponent } from './cases/view-case.component';
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
  constructor() { }

  ngOnInit(): void {

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
  public resetBilling() {
    this.casesComponent.resetCases();
    this.referringProviderComponent.resetReferringProvider();
  }
}

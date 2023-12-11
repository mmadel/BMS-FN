import { Component, Input, OnInit } from '@angular/core';
import { InsuranceCompanyContainer } from 'src/app/modules/model/admin/insurance.company.container';

@Component({
  selector: 'app-insurance-settings-modal',
  templateUrl: './insurance-settings-modal.component.html',
  styleUrls: ['./insurance-settings-modal.component.scss']
})
export class InsuranceSettingsModalComponent implements OnInit {
  @Input() selectedInsuranceCompany:InsuranceCompanyContainer;
  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedInsuranceCompany)
  }

}

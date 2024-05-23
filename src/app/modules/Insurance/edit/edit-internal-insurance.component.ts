import { Component, Input, OnInit } from '@angular/core';
import { Clinic } from '../../model/admin/clinic';
import { InsuranceCompanyHolder } from '../../model/admin/insurance.company.holder';
import { BasicAddress } from '../../model/common/basic.address';
import { States } from '../../model/lookups/state-data-store';

@Component({
  selector: 'edit-internal-insurance',
  templateUrl: './edit-internal-insurance.component.html',
  styleUrls: ['./edit-internal-insurance.component.scss']
})
export class EditInternalInsuranceComponent implements OnInit {
  states: string[] = States;
  address: BasicAddress = { state: null }
  @Input() selectedClinic: InsuranceCompanyHolder
  constructor() { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.selectedClinic))
  }
}

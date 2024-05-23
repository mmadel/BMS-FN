import { Component, OnInit } from '@angular/core';
import { BasicAddress } from '../../model/common/basic.address';
import { States } from '../../model/lookups/state-data-store';

@Component({
  selector: 'edit-internal-insurance',
  templateUrl: './edit-internal-insurance.component.html',
  styleUrls: ['./edit-internal-insurance.component.scss']
})
export class EditInternalInsuranceComponent implements OnInit {
  states: string[] = States;
  address:BasicAddress={state:null}
  constructor() { }

  ngOnInit(): void {
  }

}

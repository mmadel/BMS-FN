import { Component, Input, OnInit } from '@angular/core';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';

@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.scss']
})
export class InvoiceCreationComponent implements OnInit {
  @Input() patientInsurances: PatientInsurance[]
  constructor() { }

  ngOnInit(): void {
  }

}

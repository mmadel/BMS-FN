import { Component, Input, OnInit } from '@angular/core';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';

@Component({
  selector: 'edit-patient-insurance',
  templateUrl: './edit-patient-insurance.component.html',
  styleUrls: ['./edit-patient-insurance.component.scss']
})
export class EditPatientInsuranceComponent implements OnInit {
  @Input() patientInsurances?: PatientInsurance[]
  constructor() { }

  ngOnInit(): void {
  }
  add(){
    
  }
  edit(patientInsurance:PatientInsurance){
    console.log(JSON.stringify(patientInsurance))
  }
  remove(index: number) {
    this.patientInsurances.splice(index, 1);
  }

}

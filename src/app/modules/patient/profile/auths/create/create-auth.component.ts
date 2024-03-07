import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';

@Component({
  selector: 'create-auth',
  templateUrl: './create-auth.component.html',
  styleUrls: ['./create-auth.component.scss']
})
export class CreateAuthComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  @Input() patientInsurances?: PatientInsurance[];
  selectedInsuranceCompany: string[];
  patientAuth: PatientAuthorization = {
    insCompany: []
  }
  insCpmanyName: string[];
  constructor() { }

  ngOnInit(): void {
    this.insCpmanyName = this.patientInsurances.map(inComp => inComp.insuranceCompany[0]);
  }

  create() {
    this.patientAuth.startDateNumber = this.patientAuth.startDate !== undefined ? moment(this.patientAuth.startDate).unix() * 1000 : undefined
    this.patientAuth.expireDateNumber = this.patientAuth.expireDate !== undefined ? moment(this.patientAuth.expireDate).unix() * 1000 : undefined
    this.changeVisibility.emit('close');
  }
  pickInsCompany(selectedInsCompany) {
    this.patientInsurances.forEach(patientInsurance => {
      if (patientInsurance.insuranceCompany[0] === selectedInsCompany) {
        this.selectedInsuranceCompany = patientInsurance.insuranceCompany;
      }
    })
    console.log(this.selectedInsuranceCompany)
  }
}

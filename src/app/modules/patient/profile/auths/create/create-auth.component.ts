import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';

@Component({
  selector: 'create-auth',
  templateUrl: './create-auth.component.html',
  styleUrls: ['./create-auth.component.scss']
})
export class CreateAuthComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  patientAuth: PatientAuthorization = {
    insCompany: []
  }
  constructor() { }

  ngOnInit(): void {
  }

  create() {
    this.patientAuth.startDateNumber = this.patientAuth.startDate !== undefined ? moment(this.patientAuth.startDate).unix() * 1000 : undefined
    this.patientAuth.expireDateNumber = this.patientAuth.expireDate !== undefined ? moment(this.patientAuth.expireDate).unix() * 1000 : undefined
    this.changeVisibility.emit('close');
  }
}

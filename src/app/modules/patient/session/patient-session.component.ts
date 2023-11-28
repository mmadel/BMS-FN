import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PatientSession } from '../../model/clinical/session/patient.session';
import { BillingCode } from './model/billing.code';
import { SessionScheduling } from './model/session.scheduling';

@Component({
  selector: 'app-patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.scss']
})
export class PatientSessionComponent implements OnInit {
  @Input() model: PatientSession
  sessionScheduling: SessionScheduling
  billingCode:BillingCode
  constructor() { }

  ngOnInit(): void {
    this.populate();
  }

  private populate() {
    this.populateSessionScheduling();
    this.populateBillingCode()
  }
  private populateSessionScheduling() {
    this.sessionScheduling = {
      clientName: this.model.patientInfo.patientLastName + ',' + this.model.patientInfo.patientFirstName,
      provider : this.model.doctorInfo.doctorLastName + ',' +this.model.doctorInfo.doctorFirstName,
      serviceDate : moment.unix(this.model.serviceDate / 1000).toDate(),
      startTime : moment.unix(this.model.serviceStartTime / 1000).toDate(),
      endTime : moment.unix(this.model.serviceEndTime / 1000).toDate(),
    }

  }

  private populateBillingCode(){
    this.billingCode={
      placeOfCode:this.model.placeOfCode,
      facility:this.model.clinicInfo.clinicName,
      diagnosisCode:this.model.caseDiagnosis[0],
      ServiceLines:this.model.serviceLines
    }
  }

}

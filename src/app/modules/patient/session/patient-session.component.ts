import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PatientSession } from '../../model/clinical/session/patient.session';
import { PatientSessionHistory } from '../../model/clinical/session/patient.session.history';
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
  billingCode: BillingCode
  patientSessionHistory: PatientSessionHistory[]
  constructor() { }

  ngOnInit(): void {
    this.populate();
  }

  private populate() {
    this.populateSessionScheduling();
    this.populateBillingCode();
    this.populateSessionHistory();
  }
  private populateSessionScheduling() {
    this.sessionScheduling = {
      clientName: this.model.patientInfo.patientLastName + ',' + this.model.patientInfo.patientFirstName,
      provider: this.model.doctorInfo.doctorLastName + ',' + this.model.doctorInfo.doctorFirstName,
      serviceDate: moment.unix(this.model.serviceDate / 1000).toDate(),
      startTime: moment.unix(this.model.serviceStartTime / 1000).toDate(),
      endTime: moment.unix(this.model.serviceEndTime / 1000).toDate(),
    }

  }

  private populateBillingCode() {
    this.billingCode = {
      placeOfCode: this.model.placeOfCode,
      facility: this.model.clinicInfo.clinicName,
      diagnosisCode: this.model.caseDiagnosis[0],
      ServiceLines: this.model.serviceLines
    }
  }
  populateSessionHistory() {
    this.patientSessionHistory = new Array();
  }

}

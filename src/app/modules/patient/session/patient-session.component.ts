import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PatientSession } from '../../model/clinical/session/patient.session';
import { SessionScheduling } from './model/session.scheduling';

@Component({
  selector: 'app-patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.scss']
})
export class PatientSessionComponent implements OnInit {
  @Input() model: PatientSession
  sessionScheduling: SessionScheduling
  constructor() { }

  ngOnInit(): void {
    this.populate();
  }

  private populateSessionScheduling() {
    console.log(JSON.stringify(this.model))
    this.sessionScheduling = {
      clientName: this.model.patientInfo.patientLastName + ',' + this.model.patientInfo.patientFirstName,
      provider : this.model.doctorInfo.doctorLastName + ',' +this.model.doctorInfo.doctorFirstName,
      serviceDate : moment.unix(this.model.serviceDate / 1000).toDate(),
      startTime : moment.unix(this.model.serviceStartTime / 1000).toDate(),
      endTime : moment.unix(this.model.serviceEndTime / 1000).toDate(),
    }

  }

  private populate() {
    this.populateSessionScheduling();
  }

}

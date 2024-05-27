import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientAdvancedInformation } from 'src/app/modules/model/clinical/patient.advanced';
import { States } from 'src/app/modules/model/lookups/state-data-store';
import { Role } from 'src/app/modules/secuirty/model/roles';

@Component({
  selector: 'patient-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {
  @Input() pateint: Patient;
  patientAdvancedInformation: PatientAdvancedInformation = {
    pateintAdvancedCondtion: {
      employment: undefined,
      autoAccident: undefined,
      otherAccident: undefined,
      state: 'AK'
    },
    patientAdvancedDates: {}

  };
  states: string[] = States;
  componentRole: string[] = [Role.PATIENT_ROLE ];
  constructor() { }

  ngOnInit(): void {
    if ((this.pateint !== undefined && this.pateint.patientAdvancedInformation !== null)
    && (this.pateint.patientAdvancedInformation !== undefined)) {
      this.patientAdvancedInformation = this.pateint.patientAdvancedInformation
      if (this.patientAdvancedInformation.unableToWorkStartDate !== null)
        this.patientAdvancedInformation.unableToWorkStartDate_date = moment.unix(this.patientAdvancedInformation.unableToWorkStartDate / 1000).toDate()
      if (this.patientAdvancedInformation.unableToWorkEndDate !== null)
        this.patientAdvancedInformation.unableToWorkEndDate_date = moment.unix(this.patientAdvancedInformation.unableToWorkEndDate / 1000).toDate()
      if (this.patientAdvancedInformation.hospitalizedStartDate !== null)
        this.patientAdvancedInformation.hospitalizedStartDate_date = moment.unix(this.patientAdvancedInformation.hospitalizedStartDate / 1000).toDate()
      if (this.patientAdvancedInformation.hospitalizedEndDate !== null)
        this.patientAdvancedInformation.hospitalizedEndDate_date = moment.unix(this.patientAdvancedInformation.hospitalizedEndDate / 1000).toDate()
    }

  }
  changeFirstSymptoms(event: Date) {
    this.patientAdvancedInformation.patientAdvancedDates.firstSymptoms =
      moment(event).unix() * 1000;
  }
  changeLastSeenByDoctor(event: Date) {
    this.patientAdvancedInformation.patientAdvancedDates.lastSeenByDoctor =
      moment(event).unix() * 1000;
  }
  changeAccident(event: Date) {
    this.patientAdvancedInformation.patientAdvancedDates.accident =
      moment(event).unix() * 1000;
  }
  changeFirstTreatment(event: Date) {
    this.patientAdvancedInformation.patientAdvancedDates.firstTreatment =
      moment(event).unix() * 1000;
  }

  changeUnableToWorkStartDate(event: Date) {
    this.patientAdvancedInformation.unableToWorkStartDate =
      moment(event).unix() * 1000;
  }

  changeUnableToWorkEndDate(event: Date) {
    this.patientAdvancedInformation.unableToWorkEndDate =
      moment(event).unix() * 1000;
  }

  changeHospitalizedStartDate(event: Date) {
    this.patientAdvancedInformation.hospitalizedStartDate =
      moment(event).unix() * 1000;
  }

  changeHospitalizedEndDate(event: Date) {
    this.patientAdvancedInformation.hospitalizedEndDate =
      moment(event).unix() * 1000;
  }
  changeEmployment(event: any) {
    this.patientAdvancedInformation.pateintAdvancedCondtion.employment = event.target.value;

  }
  changeAutoAccident(event: any) {
    this.patientAdvancedInformation.pateintAdvancedCondtion.autoAccident = event.target.value;
  }
  changeOtherAccident(event: any) {
    this.patientAdvancedInformation.pateintAdvancedCondtion.otherAccident = event.target.value;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';

@Component({
  selector: 'edit-patient-session',
  templateUrl: './edit-patient-session.component.html',
  styleUrls: ['./edit-patient-session.component.scss']
})
export class EditPatientSessionComponent implements OnInit {
  @Input() patient?: Patient
  addPatientSessionVisibility: boolean = false;
  editPatientSessionVisibility: boolean;
  selectedPatientSession: PatientSession
  constructor() { }

  ngOnInit(): void {
  }
  convertDOS(dos: number): string {
    return moment.unix(dos / 1000).format('MM/DD/YYYY')
  }
  add() {
    this.addPatientSessionVisibility = true;
  }
  edit(patientSession: PatientSession) {
    this.editPatientSessionVisibility = true;
    this.selectedPatientSession = patientSession;
  }
  remove(index: number) {
    this.patient.sessions.splice(index, 1);
  }
  toggleVisibility(entity_name: string) {
    switch (entity_name) {
      case 'create-session':
        this.addPatientSessionVisibility = !this.addPatientSessionVisibility
        break;
      case 'edit-session':
        this.editPatientSessionVisibility = !this.editPatientSessionVisibility
        break;
    }
  }
}

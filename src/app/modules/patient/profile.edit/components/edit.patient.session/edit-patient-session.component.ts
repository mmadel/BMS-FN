import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { Operation } from '../../enum/operation';
import { PatientSessionBillingComponent } from './patient.session/patient.session.billing/patient-session-billing.component';
import { PatientSessionCodingComponent } from './patient.session/patient.session.coding/patient-session-coding.component';
import { PatientSessionSchedulingComponent } from './patient.session/patient.session.scheduling/patient-session-scheduling.component';
export interface PatientSessions {
  operation: Operation,
  patientSession: PatientSession
}
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
  patientSessions: PatientSessions[] = []
  @ViewChild('patientSessionSchedulingComponent') patientSessionSchedulingComponent: PatientSessionSchedulingComponent;
  @ViewChild('patientSessionBillingComponent') patientSessionBillingComponent: PatientSessionBillingComponent;
  @ViewChild('patientSessionCodingComponent') patientSessionCodingComponent: PatientSessionCodingComponent;
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
  // remove(index: number) {
  //   this.patient.sessions.splice(index, 1);
  //   this.updatePatientCases(Operation.delete, this.patient.sessions[index])
  // }
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
  create() {
    this.addPatientSessionVisibility = false;
    var createdPatientSession = this.constructModel();
    this.patient.sessions.push(createdPatientSession);
    this.updatePatientCases(Operation.create, createdPatientSession);
  }
  update() {
    this.editPatientSessionVisibility = false;
    var updatedPatientSession = this.constructModel();
    this.patient.sessions = this.patient.sessions
      .filter(patientSession => patientSession.id !== updatedPatientSession.id);
    this.patient.sessions.push(updatedPatientSession);
    this.updatePatientCases(Operation.update, updatedPatientSession);
  }
  private constructModel(): PatientSession {
    return {
      id: this.selectedPatientSession !== undefined ? this.selectedPatientSession.id : null,
      serviceDate: moment(this.patientSessionSchedulingComponent.sessionScheduling.serviceDate).unix() * 1000,
      serviceStartTime: moment(this.patientSessionSchedulingComponent.sessionScheduling.startTime).unix() * 1000,
      serviceEndTime: moment(this.patientSessionSchedulingComponent.sessionScheduling.endTime).unix() * 1000,
      placeOfCode: this.patientSessionBillingComponent.billingCode.placeOfCode,
      patientId: this.patient.id,
      doctorInfo: this.constructorModelDoctorInfo(),
      clinic: this.patientSessionBillingComponent.billingCode.facility,
      caseTitle: this.patientSessionBillingComponent.billingCode.caseTitle,
      caseDiagnosis: this.patientSessionBillingComponent.diagnosises,
      serviceCodes: this.patientSessionCodingComponent.serviceCodes,
      isCasesAttached: this.patientSessionBillingComponent.billingCode.isCaseAttached === undefined ? false :
        this.patientSessionBillingComponent.billingCode.isCaseAttached
    }
  }
  private constructorModelDoctorInfo() {
    return {
      doctorId: this.patientSessionSchedulingComponent.sessionScheduling.provider.model.id,
      doctorFirstName: this.patientSessionSchedulingComponent.sessionScheduling.provider.model.firstName,
      doctorLastName: this.patientSessionSchedulingComponent.sessionScheduling.provider.model.lastName,
      doctorNPI: this.patientSessionSchedulingComponent.sessionScheduling.provider.model.npi
    }
  }
  private updatePatientCases(operation: Operation, patientSession: PatientSession) {
    this.patientSessions.push({
      operation: operation,
      patientSession: patientSession
    })
  }
}

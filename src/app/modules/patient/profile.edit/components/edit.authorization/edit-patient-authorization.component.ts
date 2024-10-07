import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { CreateAuthComponent } from '../../../profile/auths/create/create-auth.component';
import { AuthService } from '../../../service/auth/auth.service';
import { Operation } from '../../enum/operation';
export interface PatientAuthorizations {
  operation: Operation,
  patientAuthorization: PatientAuthorization
}
@Component({
  selector: 'edit-patient-authorization',
  templateUrl: './edit-patient-authorization.component.html',
  styleUrls: ['./edit-patient-authorization.component.scss']
})
export class EditPatientAuthorizationComponent implements OnInit {
  @ViewChild('createAuthComponent') createAuthComponent: CreateAuthComponent;
  createAutVisibility: boolean = false;
  updateAutVisibility: boolean = false;
  @Input() patient: Patient
  renderList: PatientAuthorization[];
  patientAuthorization: boolean;
  patientAuthorizations: PatientAuthorizations[] = []
  selectedPatientAuthorization: PatientAuthorization;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.find();
  }

  find() {
    this.patient.authorizationWatching;
    this.authService.find(this.patient.id)
      .subscribe((result: any) => {
        result.forEach(element => {
          element.startDate = new Date(moment.unix(element.startDateNumber / 1000).format('MM/DD/YYYY'));
          element.expireDate = new Date(moment.unix(element.expireDateNumber / 1000).format('MM/DD/YYYY'));
        });
        this.renderList = result.filter((reuslt: any) => !reuslt.isExpired);
      })
  }
  add() {
    this.createAutVisibility = true;
  }
  togglePAtientWatchAuthorization(val: boolean) {
    this.patient.authorizationWatching = val;
  }
  remove(index) {
    var deleted: PatientAuthorization = this.renderList[index]
    this.renderList.splice(index, 1);
    this.updatePatientAuthorizations(Operation.delete, deleted)
  }
  edit(patientAuthorization: PatientAuthorization) {
    this.selectedPatientAuthorization = patientAuthorization;
    this.updateAutVisibility = true;
  }
  private updatePatientAuthorizations(operation: Operation, patientAuthorization: PatientAuthorization) {
    this.patientAuthorizations.push({
      operation: operation,
      patientAuthorization: patientAuthorization
    })
  }
  toggleCreateAuthVisibility() {
    this.createAutVisibility = !this.createAutVisibility;
  }
  toggleUpdateAuthVisibility() {
    this.updateAutVisibility = !this.updateAutVisibility;
  }
  changeUpdateVisibility(event: any) {
    if (event === 'close') {
      this.updateAutVisibility = false;
      this.createAuthComponent.patientAuth.insCompany = this.selectedPatientAuthorization.insCompany
      this.renderList = this.renderList
        .filter(auth => auth.id !== this.createAuthComponent.patientAuth.id);
      this.renderList.push(this.createAuthComponent.patientAuth)
      this.updatePatientAuthorizations(Operation.update, this.createAuthComponent.patientAuth)
    }
  }
  changeCreateVisibility(event: any) {
    if (event === 'close') {
      this.createAutVisibility = false;
      this.renderList.push(this.createAuthComponent.patientAuth)
      this.updatePatientAuthorizations(Operation.create, this.createAuthComponent.patientAuth)
    }
  }
}

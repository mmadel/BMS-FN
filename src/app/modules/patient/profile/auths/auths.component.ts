import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { AuthService } from '../../service/auth/auth.service';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-auths',
  templateUrl: './auths.component.html',
  styleUrls: ['./auths.component.scss']
})
export class AuthsComponent implements OnInit {

  createAutVisibility: boolean = false;
  updateAutVisibility: boolean = false;
  renderdAuthExpire: boolean = false;
  @Input() patient: Patient;
  patientAuthorization: boolean;
  patientAuthorizations: PatientAuthorization[]
  renderList: PatientAuthorization[];
  toBeUpdateModel: PatientAuthorization;
  componentRole: string[] = [Role.PATIENT_ROLE ];
  constructor(private authService: AuthService
    , private patientService: PatientService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.find(); 
  }
  find() {
    this.patientAuthorization = this.patient.authorizationWatching;
    this.authService.find(this.patient.id)
      .subscribe((result: any) => {
        result.forEach(element => {
          element.startDate = new Date(moment.unix(element.startDateNumber / 1000).format('MM/DD/YYYY'));
          element.expireDate = new Date(moment.unix(element.expireDateNumber / 1000).format('MM/DD/YYYY'));
        });
        this.patientAuthorizations = result;
        this.renderList = this.patientAuthorizations.filter((reuslt: any) => !reuslt.isExpired);
      })
  }
  toggleCreateAuthVisibility() {
    this.createAutVisibility = !this.createAutVisibility;
  }
  toggleUpdateAuthVisibility() {
    this.updateAutVisibility = !this.updateAutVisibility;
  }
  creatAuth() {
    this.createAutVisibility = true;
  }
  updateAuth(model: PatientAuthorization) {
    this.toBeUpdateModel = model;
    this.updateAutVisibility = true;
  }
  changeVisibility(event: any) {
    if (event === 'close') {
      this.toggleCreateAuthVisibility();
      this.find()
    }
  }
  changeUpdateVisibility(event: any) {
    if (event === 'close') {
      this.toggleUpdateAuthVisibility();
      this.find()
    }
  }
  viewExpire() {
    this.renderdAuthExpire = !this.renderdAuthExpire;
    this.renderList = this.patientAuthorizations
  }
  hideExpire() {
    this.renderdAuthExpire = !this.renderdAuthExpire;
    this.renderList = this.patientAuthorizations.filter((reuslt: any) => !reuslt.isExpired);
  }
  turnOff() {
    this.patientAuthorization = false
    this.patientService.turnOffPatientAuth(this.patient.id)
      .subscribe(result => {
        this.toastr.success('Patient Authorization Turned Off');
        this.scrollUp()
      })
  }
  turnOn() {
    this.patientAuthorization = true;
    this.patientService.turnOnPatientAuth(this.patient.id)
      .subscribe(result => {
        this.toastr.success('Patient Authorization Turned On');
        this.scrollUp()
      })
  }
  delete(event: any) {
    this.authService.delete(event.id)
      .subscribe(result => {
        this.find()
        this.toastr.success('Patient Authorization Deleted successfully');
        this.scrollUp()
      })
  }
  private scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}

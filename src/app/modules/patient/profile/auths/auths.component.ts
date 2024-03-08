import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, map, tap } from 'rxjs';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { AuthService } from '../../service/auth/auth.service';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-auths',
  templateUrl: './auths.component.html',
  styleUrls: ['./auths.component.scss']
})
export class AuthsComponent implements OnInit {

  createAutVisibility: boolean = false;
  renderdAuthExpire:boolean = false;
  flagAuth:boolean = false;
  @Input() patient: Patient;
  patientAuthorizations: PatientAuthorization[]
  renderList: PatientAuthorization[];
  constructor(private authService: AuthService 
    , private patientService:PatientService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.find();
  }
  find() {
    this.authService.find(this.patient.id)
      .subscribe((result: any) => {
        result.forEach(element => {
          element.startDate = new Date(moment.unix(element.startDateNumber / 1000).format('MM/DD/YYYY'));
          element.expireDate = new Date(moment.unix(element.expireDateNumber / 1000).format('MM/DD/YYYY'));
        });
        this.patientAuthorizations = result;
        this.renderList = this.patientAuthorizations.filter((reuslt:any) => reuslt.isExpired);
      })
  }
  toggleCreateAuthVisibility() {
    this.createAutVisibility = !this.createAutVisibility;
  }
  creatAuth() {
    this.createAutVisibility = true;
  }
  changeVisibility(event: any) {
    if (event === 'close') {
      this.toggleCreateAuthVisibility();
      this.find()
    }
  }
  viewExpire() {
    this.renderdAuthExpire = !this.renderdAuthExpire ; 
    this.renderList = this.patientAuthorizations
  }
  hideExpire(){
    this.renderdAuthExpire = !this.renderdAuthExpire ; 
    this.renderList = this.patientAuthorizations.filter((reuslt:any) => reuslt.isExpired);
  }
  turnOff(){
    this.flagAuth = !this.flagAuth
    this.patientService.turnOffPatientAuth(this.patient.id)
    .subscribe(result=>{
      this.toastr.success('Patient Authorization Turned Off');
      this.scrollUp()
    })
  }
  turnOn(){
    this.flagAuth = !this.flagAuth
    this.patientService.turnOnPatientAuth(this.patient.id)
    .subscribe(result=>{
      this.toastr.success('Patient Authorization Turned On');
      this.scrollUp()
    })
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}

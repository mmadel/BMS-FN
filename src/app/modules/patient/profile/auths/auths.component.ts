import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter, map, tap } from 'rxjs';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-auths',
  templateUrl: './auths.component.html',
  styleUrls: ['./auths.component.scss']
})
export class AuthsComponent implements OnInit {

  createAutVisibility: boolean = false;
  renderdAuthExpire:boolean = false;
  @Input() patient: Patient;
  patientAuthorizations: PatientAuthorization[]
  renderList: PatientAuthorization[];
  constructor(private authService: AuthService) { }

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
}

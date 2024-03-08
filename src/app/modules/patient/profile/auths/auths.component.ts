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
  @Input() patient: Patient;
  patientAuthorizations: PatientAuthorization[]
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.find();
  }
  find() {
    this.authService.find(this.patient.id)
      .subscribe((result: any) => {
        var notExpiredList: PatientAuthorization[] = result.filter((auth: any) => !auth.isExpired);
        console.log(notExpiredList)
        notExpiredList.forEach(element => {
            element.startDate = new Date(moment.unix(element.startDateNumber / 1000).format('MM/DD/YYYY'));
            element.expireDate = new Date(moment.unix(element.expireDateNumber / 1000).format('MM/DD/YYYY'));
          });
        this.patientAuthorizations = notExpiredList
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
}

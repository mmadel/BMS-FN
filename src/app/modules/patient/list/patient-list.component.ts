import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import { Patient } from '../../model/clinical/patient';
import { PatientResponse } from '../../model/clinical/patient.response';
import { ListTemplate } from '../../model/template/list.template';
import { PatientService } from '../service/patient.service';
import usersData from './_data';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent extends ListTemplate implements OnInit {
  patients$!: Observable<Patient[]>;
  constructor(private paitentService: PatientService, private router: Router) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }

  columns = [
    {
      key: 'name',
      _style: { width: '10%' }
    },
    { key: 'dob', label: 'Date Of birth', _style: { width: '10%' } },
    { key: 'email', _style: { width: '20%' } },
    { key: 'actions', _style: { width: '5%' } }
  ];
  remove(event: any) {

  }
  edit(event: any) {
    this.router.navigate(['/patient/profile', event.data.id]);
  }
  view(event:any){
  
  }
  find() {
    this.patients$ = this.paitentService.findAll(this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        var list: PatientResponse[] = new Array()
        for (var i = 0; i < response.records.length; i++) {
          var obj: Patient = response.records[i];
          var patientResponse: PatientResponse = {
            name: obj.lastName + ',' + obj.lastName,
            dob: moment.unix(obj.birthDate / 1000).toDate(),
            email: obj.email,
            data: obj
          }
          list.push(patientResponse)
        }
        return list;
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import { MinimalPatient } from '../../model/clinical/minimal.patient';
import { Patient } from '../../model/clinical/patient';
import { PatientResponse } from '../../model/clinical/patient.response';
import { ListTemplate } from '../../model/template/list.template';
import { PateintEmittingService } from '../service/emitting/pateint-emitting.service';
import { PatientService } from '../service/patient.service';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent extends ListTemplate implements OnInit {
  patients$!: Observable<MinimalPatient[]>;
  constructor(private paitentService: PatientService
    , private router: Router) { super() }

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
  add(){
    
    this.router.navigate(['/patient/profile']);
  }
  edit(event: any) {
    console.log(JSON.stringify(event))
    this.router.navigate(['/patient/profile',event.id]);
  }
  view(event: any) {
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
          var obj: MinimalPatient = response.records[i];
          var patientResponse: PatientResponse = {
            id:obj.id,
            name: obj.name,
            dob: moment.unix(obj.dateOfBirth / 1000).toDate(),
            email: obj.email,
          }
          list.push(patientResponse)
        }
        return list;
      })
    );
  }
}

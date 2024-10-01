import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, tap } from 'rxjs';
import { MinimalPatient } from '../../model/clinical/minimal.patient';
import { PatientResponse } from '../../model/clinical/patient.response';
import { PatientSearchCriteria } from '../../model/clinical/patient.search.criteria';
import { ListTemplate } from '../../model/template/list.template';
import { Role } from '../../secuirty/model/roles';
import { PatientService } from '../service/patient.service';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent extends ListTemplate implements OnInit {
  patients$!: Observable<MinimalPatient[]>;
  patientSearchCriteria: PatientSearchCriteria = {}
  componentRole: string[] = [Role.PATIENT_ROLE];
  constructor(private paitentService: PatientService
    , private router: Router
    , private toastrService: ToastrService) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find(true);
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
  add() {

    this.router.navigate(['/patient/profile']);
  }
  edit(event: any) {
    this.router.navigate(['/patient/profile', event.id]);
  }
  inactive(patient: any) {
    this.paitentService.changePatientStatus(patient.id, false).subscribe(reuslt => {
      this.toastrService.success("patient status is deactivated")
      this.scrollUp()
      this.find(true)
    }, error => {
      this.toastrService.error("Error during deactivate patient")
    })
  }
  active(patient: any) {
    this.paitentService.changePatientStatus(patient.id, true).subscribe(reuslt => {
      this.toastrService.success("patient status is activated")
      this.scrollUp()
      this.find(true)
    }, error => {
      this.toastrService.error("Error during activate patient")
    })
  }
  viewActive() {
    this.find(true);
  }
  viewInActive() {
    this.find(false);
  }
  search() {
    this.patients$ = this.paitentService.findFilter(this.apiParams$, this.patientSearchCriteria).pipe(
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
            id: obj.id,
            name: obj.name,
            dob: moment.unix(obj.dateOfBirth / 1000).toDate(),
            email: obj.email,
            status : obj.status
          }
          list.push(patientResponse)
        }
        return list;
      })
    );
  }

  find(stauts: boolean) {
    this.patients$ = this.paitentService.findAll(this.apiParams$, stauts).pipe(
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
            id: obj.id,
            name: obj.name,
            dob: moment.unix(obj.dateOfBirth / 1000).toDate(),
            email: obj.email,
            status : obj.status
          }
          list.push(patientResponse)
        }
        return list;
      })
    );
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

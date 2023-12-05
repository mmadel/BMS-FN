import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionResponse } from 'src/app/modules/model/clinical/session/patient.session.response';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { PatientSessionEditComponent } from '../edit/patient-session-edit.component';

@Component({
  selector: 'app-pateint-session-list',
  templateUrl: './pateint-session-list.component.html',
  styleUrls: ['./pateint-session-list.component.scss']
})
export class PateintSessionListComponent extends ListTemplate implements OnInit {
  @Input() pateintId: number;
  editSessionVisibility: boolean = false;
  selectedPatientSession: PatientSession
  @ViewChild(PatientSessionEditComponent, { static: false }) patientSessionEditComponent: PatientSessionEditComponent;
  columns = [
    {
      key: 'dateOfService',
    },
    {
      key: 'doctorName',
    },
    {
      key: 'actions',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];
  details_visible = Object.create({});
  patientSessions$!: Observable<PatientSessionResponse[]>;
  constructor(private patientSessionService: PatientSessionService, private router: Router) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  find() {
    this.patientSessions$ = this.patientSessionService.findSessions(this.apiParams$, this.pateintId).pipe(
      map((response: any) => {
        var list: PatientSessionResponse[] = new Array();
        for (let i = 0; i < response.records.length; i++) {
          var patientSession: PatientSession = response.records[i];
          var patientSessionResponse: PatientSessionResponse = {
            id: patientSession.id,
            dateOfService: moment.unix(patientSession.serviceDate / 1000).toDate(),
            doctorName: '(' + patientSession.doctorInfo.doctorLastName + ', ' + patientSession.doctorInfo.doctorFirstName + ')',
            data: patientSession
          }
          list.push(patientSessionResponse);
        }
        return list;
      })
    );
  }
  toggleEditSession(item: any) {
    if (item !== null)
      this.selectedPatientSession = item.data
    this.editSessionVisibility = !this.editSessionVisibility;
    if (!this.editSessionVisibility)
      this.selectedPatientSession = undefined;
  }
}

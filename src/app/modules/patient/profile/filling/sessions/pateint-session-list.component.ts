import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PatientSessionService } from '../../../service/profile/filling/patient-session.service';

@Component({
  selector: 'app-pateint-session-list',
  templateUrl: './pateint-session-list.component.html',
  styleUrls: ['./pateint-session-list.component.scss']
})
export class PateintSessionListComponent extends ListTemplate implements OnInit {
  columns = [
    {
      key: 'birthDate',
      _style: { width: '20%' }
    },
    'name',
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];
  details_visible = Object.create({});
  patientSessions$!: Observable<PatientSession[]>;
  constructor(private patientSessionService: PatientSessionService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  find() {
    this.patientSessions$ = this.patientSessionService.findSessions(this.apiParams$).pipe(
      map((response: any) => {
        return response.records;
      })
    );
  }
}

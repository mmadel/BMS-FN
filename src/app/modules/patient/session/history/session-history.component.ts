import { Component, Input, OnInit } from '@angular/core';
import { PatientSessionHistory } from 'src/app/modules/model/clinical/session/patient.session.history';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.component.html',
  styleUrls: ['./session-history.component.scss']
})
export class SessionHistoryComponent implements OnInit {
  @Input() historyRecords: PatientSessionHistory[];
  constructor() { }

  ngOnInit(): void {
  }

}

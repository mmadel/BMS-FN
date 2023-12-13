import { Component, Input, OnInit } from '@angular/core';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { SessionServiceCodeLine } from '../../model/session.service.code.line';

@Component({
  selector: 'session-item-edit',
  templateUrl: './session-item-edit.component.html',
  styleUrls: ['./session-item-edit.component.scss']
})
export class SessionItemEditComponent implements OnInit {
  @Input() selectedSession: SessionServiceCodeLine;
  @Input() itemType: string
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { SessionServiceCodeLine } from '../../model/session.service.code.line';

@Component({
  selector: 'session-item-edit',
  templateUrl: './session-item-edit.component.html',
  styleUrls: ['./session-item-edit.component.scss']
})
export class SessionItemEditComponent implements OnInit {
  @Input() selectedSession: SessionServiceCodeLine;
  @Input() itemType: string
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  constructor() { }

  ngOnInit(): void {
  }
  edit(){
    
  }
}

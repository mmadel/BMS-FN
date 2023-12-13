import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() changeVisibility = new EventEmitter<string>()
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  changedCPT: string;
  changedUnit: number;
  changedCharge: number;
  constructor() { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.selectedSession))
  }
  edit() {
    if (this.itemType === 'cpt')
      this.editCPT();
    if (this.itemType === 'unit')
      this.editCPT();
    if (this.itemType === 'charge')
      this.editCharge();

    console.log(JSON.stringify(this.selectedSession.data))
    this.changeVisibility.emit('close');
  }
  private editCPT() {
    for (var i = 0; i < this.selectedSession.data.serviceCodes.length; i++) {
      if (this.selectedSession.data.serviceCodes[i].id === this.selectedSession.cptId) {
        this.selectedSession.data.serviceCodes[i].cptCode.serviceCode = this.changedCPT
      }
    }
  }
  private editUnit() {
    for (var i = 0; i < this.selectedSession.data.serviceCodes.length; i++) {
      if (this.selectedSession.data.serviceCodes[i].id === this.selectedSession.cptId) {
        this.selectedSession.data.serviceCodes[i].cptCode.unit = this.changedUnit
      }
    }
  }
  private editCharge() {
    for (var i = 0; i < this.selectedSession.data.serviceCodes.length; i++) {
      if (this.selectedSession.data.serviceCodes[i].id === this.selectedSession.cptId) {
        this.selectedSession.data.serviceCodes[i].cptCode.charge = this.changedCharge
      }
    }
  }
}

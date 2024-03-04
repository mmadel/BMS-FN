import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { ClientSessionResponse } from '../../model/client.session.response';
import { SessionServiceCodeLine } from '../../model/session.service.code.line';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';

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
  constructor(private patientSessionService: PatientSessionService,
    private patientService: PatientService,
    private invoiceEmitterService: InvoiceEmitterService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.changedCPT = this.selectedSession.cpt
    this.changedUnit = this.selectedSession.unit
    this.changedCharge = this.selectedSession.charge
  }
  edit() {
    if (this.itemType === 'cpt')
      this.editCPT();
    if (this.itemType === 'unit')
      this.editUnit();
    if (this.itemType === 'charge')
      this.editCharge();
    this.patientSessionService.update(this.selectedSession.data)
      .subscribe(result => {
        this.changeVisibility.emit('session-item');
        this.toastr.success("pateint session updated")
      }, (error) => {
        this.toastr.error("Error during session udpate")
      })
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

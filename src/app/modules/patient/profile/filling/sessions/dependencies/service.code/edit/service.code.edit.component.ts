import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, first } from 'rxjs';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';

@Component({
  selector: 'service-code-update',
  templateUrl: './service.code.edit.component.html',
  styleUrls: ['./service.code.edit.component.scss']
})
export class ServiceCodeEditComponent implements OnInit {
  modifier: string[] = []
  diagnosisCodes: string[];
  selectedDiagnosisCodes: string[];
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }
  selectedServiceCode: ServiceCode;
  validModifiers: Boolean[];
  validCPT: any = ''
  emptyUnit: boolean = true;
  emptyCharge: boolean = true;
  @Output() changeVisibility = new EventEmitter<string>()
  ngOnInit(): void {
    this.emitPatientSessionService.diagnosisCodes$.pipe(
      filter(result => result !== null)
    ).subscribe((result) => {
      this.diagnosisCodes = result;
    })

    this.emitPatientSessionService.sessionserviceCode$.pipe(
      filter((selectedServiceCode) => selectedServiceCode !== null),
      first()
    ).subscribe((selectedServiceCode) => {
      this.selectedDiagnosisCodes = selectedServiceCode.diagnoses;
      this.modifier = selectedServiceCode.cptCode.modifier.split('.')
      this.selectedServiceCode = selectedServiceCode;
    })
  }
  updateServiceCode() {
    var validMod = this.validatModifier();
    var validCPt = this.validateCPT();
    var validUniy = this.validateUnit();
    var validCharge = this.validateCharge();
    if (validMod.length === 0 && validCPt === -1 && validUniy && validCharge) {
      this.selectedServiceCode.cptCode.modifier = this.modifier.join(".")
      this.selectedServiceCode.diagnoses = this.selectedDiagnosisCodes
      this.selectedServiceCode.isChanged = true;
      this.changeVisibility.emit('close');
    }

  }
  private validatModifier() {
    this.validModifiers = new Array();
    for (let i = 0; i < this.modifier.length; i++) {
      var mod: string = this.modifier[i];
      if (mod !== undefined && (mod.length > 0 && mod.length < 2))
        this.validModifiers[i] = false
    }
    return this.validModifiers;
  }

  private validateCPT() {
    if (this.selectedServiceCode.cptCode.serviceCode === undefined)
      this.validCPT = 0

    else if (this.selectedServiceCode.cptCode.serviceCode?.length < 5)
      this.validCPT = 5
    else
      this.validCPT = -1
    return this.validCPT;
  }
  private validateUnit() {
    if (this.selectedServiceCode.cptCode.unit === undefined)
      this.emptyUnit = false
    else
      this.emptyUnit = true
    return this.emptyUnit;
  }
  private validateCharge() {
    if (this.selectedServiceCode.cptCode.charge === undefined)
      this.emptyCharge = false
    else
      this.emptyCharge = true;
    return this.emptyCharge;
  }

}

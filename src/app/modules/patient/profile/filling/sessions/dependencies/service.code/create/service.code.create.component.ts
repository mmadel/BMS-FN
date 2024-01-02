import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { ServiceLineType } from 'src/app/modules/model/enum/session/service.line.type';
import { ModelModule } from 'src/app/modules/model/model.module';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';


@Component({
  selector: 'service-code-creation',
  templateUrl: './service.code.create.component.html',
  styleUrls: ['./service.code.create.component.scss']
})
export class ServiceCodeCreateComponent implements OnInit {
  serviceCode: ServiceCode;
  modifier: string[] = []
  diagnosisCodes: string[];
  selectedDiagnosisCodes: string[];
  emptyDiagnosisCodes: boolean = true;
  validModifiers: Boolean[];
  validCPT: any = ''
  emptyUnit: boolean = true;
  emptyCharge: boolean = true;
  @Output() onCreateServiceCode = new EventEmitter<ServiceCode>()
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    this.serviceCode = {
      cptCode: {}
    }
    this.emitPatientSessionService.diagnosisCodes$.pipe(
      filter(result => result !== null)
    ).subscribe((result) => {
      this.diagnosisCodes = result;
      if (this.diagnosisCodes.length !== 0)
        this.emptyDiagnosisCodes = false;
    })
  }
  saveServiceCode() {
    var validMod = this.validatModifier();
    var validCPt = this.validateCPT();
    var validUniy = this.validateUnit();
    var validCharge = this.validateCharge();
    if (validMod.length === 0 && validCPt === -1 && validUniy && validCharge) {
      this.serviceCode.type = ServiceLineType.Initial;
      this.serviceCode.cptCode.modifier = this.modifier.join(".")
      this.serviceCode.diagnoses = this.selectedDiagnosisCodes
      this.onCreateServiceCode.emit(this.serviceCode);
    }
  }
  private validatModifier() {
    this.validModifiers  = new Array();
    for (let i = 0; i < this.modifier.length; i++) {
      var mod: string = this.modifier[i];
      if (mod !== undefined && (mod.length > 0 && mod.length < 2))
        this.validModifiers[i] = false
    }
    return this.validModifiers;
  }

  private validateCPT() {
    if (this.serviceCode.cptCode.serviceCode === undefined)
      this.validCPT = 0

    else if (this.serviceCode.cptCode.serviceCode?.length < 5)
      this.validCPT = 5
    else
      this.validCPT = -1
    return this.validCPT;
  }
  private validateUnit() {
    if (this.serviceCode.cptCode.unit === undefined)
      this.emptyUnit = false
    else
      this.emptyUnit = true
    return this.emptyUnit;
  }
  private validateCharge() {
    if (this.serviceCode.cptCode.charge === undefined)
      this.emptyCharge = false
    else
      this.emptyCharge = true;
    return this.emptyCharge;
  }
}

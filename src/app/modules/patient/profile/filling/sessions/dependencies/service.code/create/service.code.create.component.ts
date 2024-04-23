import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { DoctorInfo } from 'src/app/modules/model/clinical/session/doctor.info';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { ServiceLineType } from 'src/app/modules/model/enum/session/service.line.type';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { FeeScheduleLine } from 'src/app/modules/tools/fee.schedule/model/fee.schedule.line';
import { FeeScheduleService } from 'src/app/modules/tools/fee.schedule/service/fee-schedule.service';


@Component({
  selector: 'service-code-creation',
  templateUrl: './service.code.create.component.html',
  styleUrls: ['./service.code.create.component.scss']
})
export class ServiceCodeCreateComponent implements OnInit {
  doctorNPI: string
  isLoading = false;
  feeScheduleLine: FeeScheduleLine;
  serviceCode: ServiceCode;
  modifier: string[] = []
  diagnosisCodes: string[];
  selectedDiagnosisCodes: string[];
  emptyDiagnosisCodes: boolean = true;
  validModifiers: Boolean[];
  validCPT: any = ''
  emptyUnit: boolean = true;
  emptyCharge: boolean = true;
  feeCtrl = new FormControl();
  @Output() onCreateServiceCode = new EventEmitter<ServiceCode>()
  constructor(private emitPatientSessionService: EmitPatientSessionService,
    private feeScheduleService: FeeScheduleService) { }

  ngOnInit(): void {
    this.feathcFeeSchdule()
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
    this.emitPatientSessionService.selectedProvider$.pipe(
    ).subscribe((result: any) => {
      this.doctorNPI = result.model.npi
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
    this.validModifiers = new Array();
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
  private feathcFeeSchdule() {
    this.feeCtrl.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 1) {
            return true
          } else {
            this.feeScheduleLine = {};
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.feeScheduleLine = {};
          this.isLoading = true;
        }),
        switchMap((value) => {
          return this.feeScheduleService.findByCpt(this.doctorNPI, value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.feeScheduleLine = {};
        } else {
          this.feeScheduleLine = data;
        }
      },
        error => {
          this.isLoading = false
        });
  }
  
  calculateCharge() {
    if (this.feeScheduleLine.cptCode !== null) {
      switch (this.feeScheduleLine.rateType) {
        case 'Per_Unit':
          this.serviceCode.cptCode.charge = this.serviceCode.cptCode.unit * this.feeScheduleLine.chargeAmount;
          break;
        case 'Fixed':
          this.serviceCode.cptCode.charge = this.feeScheduleLine.chargeAmount;
          break;
      }
    }
  }
}

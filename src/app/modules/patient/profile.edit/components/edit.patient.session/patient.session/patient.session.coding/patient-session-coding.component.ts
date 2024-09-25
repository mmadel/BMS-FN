import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { ServiceLineType } from 'src/app/modules/model/enum/session/service.line.type';
import { CaseDiagnosisService } from 'src/app/modules/patient/service/case.diagnosis/case-diagnosis.service';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
import { FeeScheduleLine } from 'src/app/modules/tools/fee.schedule/model/fee.schedule.line';
import { FeeScheduleService } from 'src/app/modules/tools/fee.schedule/service/fee-schedule.service';

@Component({
  selector: 'patient-session-coding',
  templateUrl: './patient-session-coding.component.html',
  styleUrls: ['./patient-session-coding.component.scss']
})
export class PatientSessionCodingComponent implements OnInit {
  isLoading = false;
  validCPT: any = ''
  validModifiers: Boolean[];
  feeCtrl = new FormControl();
  serviceCode: ServiceCode = { cptCode: {} };
  serviceCodes: ServiceCode[] = new Array();
  modifier: string[] = []
  emptyDiagnosisCodes: boolean = true;
  selectedDiagnosisCodes: string[];
  diagnosisCodes: string[];
  diagnosises: CaseDiagnosis[] = [];
  emptyUnit: boolean = true;
  emptyCharge: boolean = true;
  feeScheduleLine: FeeScheduleLine;
  unitCount: number;
  chargeCount: number;
  selectedProvider: Provider
  @Input() selectedSession: PatientSession
  constructor(private feeScheduleService: FeeScheduleService
    , private providerService: ProviderService
    , private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {
    this.fetchFeeSchdule();
    this.consumeProvider();
    this.consumeDiagnosises();
    this.fillModel();
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
  remove(index: number) {
    this.serviceCodes.splice(index, 1);
    this.countChargeUnit();
  }
  private fillModel() {
    if (this.selectedSession !== undefined) {
      this.serviceCodes = this.selectedSession.serviceCodes;
      this.countChargeUnit();
    }
  }
  private fetchFeeSchdule() {
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
          return this.feeScheduleService.findByCpt(this.selectedProvider.npi, value)
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
          console.log(error)
          this.isLoading = false
        });
  }
  private checkEmptyDaignosis() {
    if (this.diagnosises.length === 0)
      this.emptyDiagnosisCodes = true
    else {
      this.emptyDiagnosisCodes = false
      this.getDaignosis()
    }
  }
  private getDaignosis() {
    this.diagnosisCodes = this.diagnosises.map(code => {
      return code.diagnosisCode;
    })
  }
  pushServiceCodes() {
    var validMod = this.validatModifier();
    var validCPt = this.validateCPT();
    var validUniy = this.validateUnit();
    var validCharge = this.validateCharge();

    if (validMod.length === 0 && validCPt === -1 && validUniy && validCharge) {
      this.serviceCode.type = ServiceLineType.Initial;
      this.serviceCode.cptCode.modifier = this.modifier.join(".")
      this.serviceCode.diagnoses = this.selectedDiagnosisCodes
      this.serviceCodes.push(this.serviceCode);
    }
    this.serviceCode = { cptCode: {} };
    this.modifier = []
    this.countChargeUnit();
  }
  countChargeUnit() {
    this.unitCount = 0
    this.chargeCount = 0
    for (var i = 0; i < this.serviceCodes.length; i++) {
      var serviceCode: ServiceCode = this.serviceCodes[i];
      this.unitCount = this.unitCount + Number(serviceCode.cptCode.unit);
      this.chargeCount = this.chargeCount + Number(serviceCode.cptCode.charge);
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
  private consumeProvider() {
    this.providerService.selectedProvider$.pipe(
      filter(result => result !== undefined)
    ).subscribe((provider: any) => {
      this.selectedProvider = provider
    })
  }
  private consumeDiagnosises() {
    this.caseDiagnosisService.selectedCaseDiagnosis$.pipe(
      filter(result => result !== undefined)
    ).subscribe((diagnosises: any) => {
      if (diagnosises !== null) {
        this.diagnosises = diagnosises;
        this.checkEmptyDaignosis();
      }
    }, error => {
      console.log(error)
    })
  }
}

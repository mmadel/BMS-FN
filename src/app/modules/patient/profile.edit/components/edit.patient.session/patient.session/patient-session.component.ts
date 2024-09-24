import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { ClinicService } from 'src/app/modules/admin.tools/services/clinic.service';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { ServiceLineType } from 'src/app/modules/model/enum/session/service.line.type';
import { BillingCode } from 'src/app/modules/patient/profile/filling/sessions/model/billing.code';
import { CaseDiagnosisService } from 'src/app/modules/patient/service/case.diagnosis/case-diagnosis.service';
import { SessionScheduling } from 'src/app/modules/patient/session/model/session.scheduling';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
import { FeeScheduleLine } from 'src/app/modules/tools/fee.schedule/model/fee.schedule.line';
import { FeeScheduleService } from 'src/app/modules/tools/fee.schedule/service/fee-schedule.service';
interface ProviderInfo {
  name: string,
  model: Provider
}
@Component({
  selector: 'patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.scss']
})
export class PatientSessionComponent implements OnInit {
  notValidForm: boolean = false;
  providers: ProviderInfo[];
  selectedProvider: any
  sessionScheduling: SessionScheduling = {};
  billingCode: BillingCode = { placeOfCode: null, facility: null }
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  compareFn = this._compareFn.bind(this);
  clinics: Clinic[];
  @Input() patient?: Patient;
  selectedCase: any = null;
  diagnosisValue: string
  isLoading = false;
  diagnosisCode?: CaseDiagnosis = {};
  filteredDiagnosis: any;
  diagnosises: CaseDiagnosis[] = [];
  diagnosisCodes: string[];
  validCPT: any = ''
  feeCtrl = new FormControl();
  serviceCode: ServiceCode = { cptCode: {} };
  serviceCodes: ServiceCode[] = new Array();
  validModifiers: Boolean[];
  modifier: string[] = []
  emptyDiagnosisCodes: boolean = true;
  selectedDiagnosisCodes: string[];
  emptyCharge: boolean = true;
  feeScheduleLine: FeeScheduleLine;
  emptyUnit: boolean = true;
  unitCount: number;
  chargeCount: number;
  constructor(private providerService: ProviderService
    , private clinicService: ClinicService
    , private caseDiagnosisService: CaseDiagnosisService
    , private feeScheduleService: FeeScheduleService) { }

  ngOnInit(): void {
    this.findProviders();
    this.findClinics()
    this.fetchFeeSchdule();
  }
  private findProviders() {
    this.providerService.findAllWithoutPagination()
      .subscribe((result: any) => {
        this.providers = new Array();
        for (var i = 0; i < result.length; i++) {
          this.providers.push({
            name: result[i].lastName + ',' + result[i].firstName,
            model: result[i]
          })
        }
      })
  }
  pickProvider(event: any) {
    this.selectedProvider = event
  }
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }
  findClinics() {
    this.clinicService.findAllWithoutPagination()
      .subscribe((result: any) => {
        this.clinics = result
      })
  }
  change() {
    this.billingCode.caseTitle = this.selectedCase.caseTitle;
    this.diagnosises.push(...this.selectedCase.caseDiagnosis)
    this.checkEmptyDaignosis()
  }
  search() {
    this.caseDiagnosisService.find(this.diagnosisValue).subscribe(data => {
      console.log(JSON.stringify(data))
      if (data !== undefined) {
        var diagnosisResponse: any = data;
        this.filteredDiagnosis = diagnosisResponse.listOfCodeName;
      }
    })
  }
  addICD10diagnosis(event: any) {
    var diagnosis: string = event.target.value
    var diagnosisArr = diagnosis.split(',')
    var code: string = diagnosisArr[0]
    var desrciption: string = diagnosisArr.slice(1).toString();
    this.diagnosisCode.diagnosisCode = code
    this.diagnosisCode.diagnosisDescription = desrciption;
  }
  pushDaignosis() {
    this.diagnosises.push(this.diagnosisCode);
    this.diagnosisCode = {}
    this.checkEmptyDaignosis()
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
          console.log(JSON.stringify(this.selectedProvider))
          return this.feeScheduleService.findByCpt(this.selectedProvider.model.npi, value)
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
}

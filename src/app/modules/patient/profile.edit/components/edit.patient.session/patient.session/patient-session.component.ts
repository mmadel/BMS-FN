import { Component, Input, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/modules/admin.tools/services/clinic.service';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { BillingCode } from 'src/app/modules/patient/profile/filling/sessions/model/billing.code';
import { CaseDiagnosisService } from 'src/app/modules/patient/service/case.diagnosis/case-diagnosis.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { SessionScheduling } from 'src/app/modules/patient/session/model/session.scheduling';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
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
  sessionScheduling: SessionScheduling = {};
  billingCode: BillingCode = { placeOfCode: null, facility: null }
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  compareFn = this._compareFn.bind(this);
  clinics: Clinic[];
  @Input() patientCases: PatientCase[];
  selectedCase: any = null;
  diagnosisValue: string
  isLoading = false;
  diagnosisCode?: CaseDiagnosis = {};
  filteredDiagnosis: any;
  diagnosises: CaseDiagnosis[]=[];
  constructor(private providerService: ProviderService
    , private emitPatientSessionService: EmitPatientSessionService
    , private clinicService: ClinicService
    ,private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {
    this.findProviders();
    this.findClinics()
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
    this.emitPatientSessionService.selectedProvider$.next(event)
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
  pushDaignosis(){
    this.diagnosises.push(this.diagnosisCode);
    this.diagnosisCode={}
  }
}

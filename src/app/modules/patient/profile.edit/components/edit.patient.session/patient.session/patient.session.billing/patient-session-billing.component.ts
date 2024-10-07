import { Component, Input, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/modules/admin.tools/services/clinic.service';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { BillingCode } from 'src/app/modules/patient/profile/filling/sessions/model/billing.code';
import { CaseDiagnosisService } from 'src/app/modules/patient/service/case.diagnosis/case-diagnosis.service';

@Component({
  selector: 'patient-session-billing',
  templateUrl: './patient-session-billing.component.html',
  styleUrls: ['./patient-session-billing.component.scss']
})
export class PatientSessionBillingComponent implements OnInit {
  notValidForm: boolean = false;
  billingCode: BillingCode = { placeOfCode: null, facility: null }
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  compareFn = this._compareFn.bind(this);
  clinics: Clinic[];
  @Input() patientCases: PatientCase[];
  selectedCase: any = null;
  diagnosises: CaseDiagnosis[] = [];
  emptyDiagnosisCodes: boolean = true;
  diagnosisCodes: string[];
  diagnosisValue: string
  filteredDiagnosis: any;
  diagnosisCode?: CaseDiagnosis = {};
  isLoading = false;
  validation: boolean[] = [];
  @Input() selectedSession: PatientSession
  constructor(private clinicService: ClinicService, private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {
    this.findClinics();
    this.fillModel();
    this.emitDiagnosises();
  }
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }
  change() {
    this.billingCode.caseTitle = this.selectedCase.caseTitle;
    this.diagnosises.push(...this.selectedCase.caseDiagnosis)
    this.checkEmptyDaignosis()
  }
  search() {
    this.caseDiagnosisService.find(this.diagnosisValue).subscribe(data => {
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
    this.firediagnosisCodesValidation();
    if (!this.validation[2]) {
      this.diagnosises.push(this.diagnosisCode);
      this.diagnosisCode = {}
      this.checkEmptyDaignosis()
      this.caseDiagnosisService.selectedCaseDiagnosis$.next(this.diagnosises)
    }
  }
  remove(index: number) {
    this.diagnosises.splice(index, 1);
  }
  private emitDiagnosises() {
    if (this.diagnosises !== null && this.diagnosises.length !== 0){
      this.caseDiagnosisService.selectedCaseDiagnosis$.next(this.diagnosises)
    }else{
      this.caseDiagnosisService.selectedCaseDiagnosis$.next(null)
    }
      
  }
  private fillModel() {
    if (this.selectedSession !== undefined) {
      this.billingCode = {
        placeOfCode: this.selectedSession.placeOfCode,
        facility: this.selectedSession.clinic,
        caseTitle: this.selectedSession.caseTitle,
      }
      this.diagnosises = this.selectedSession.caseDiagnosis;
      this.selectedCase = this.findSelectedPatientCase(this.selectedSession.caseTitle);
    }
  }
  private findClinics() {
    this.clinicService.findAllWithoutPagination()
      .subscribe((result: any) => {
        this.clinics = result
      })
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
  private firediagnosisCodesValidation() {
    if (this.diagnosisCode.diagnosisCode === undefined)
      this.validation[2] = true;
    else
      this.validation[2] = false;
  }
  private findSelectedPatientCase(title: string) {
    return this.patientCases.filter(pateintCase => pateintCase.title === title)[0]
  }
}

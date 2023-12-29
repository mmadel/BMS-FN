import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime, filter, finalize, first, switchMap, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { CaseDiagnosisService } from '../../../../../service/case.diagnosis/case-diagnosis.service';
import { BillingCode } from '../../model/billing.code';
import { DignosisListComponent } from '../dignosis.list/dignosis-list.component';
import { ServiceCodeListComponent } from '../service.code/list/service.code.list.component';


@Component({
  selector: 'patient-session-billing-code',
  templateUrl: './billing-code.component.html',
  styleUrls: ['./billing-code.component.scss']
})
export class BillingCodeComponent implements OnInit {
  billingCode: BillingCode
  @ViewChild('billingcodeForm') billingcodeForm: NgForm;
  @ViewChild('serviceCodeListComponent') serviceCodeListComponent: ServiceCodeListComponent;
  @ViewChild('daignosisListComponent') daignosisListComponent: DignosisListComponent;
  @Input() patientCases: PatientCase[];
  notValidForm: boolean = false;
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  unitCount: number;
  chargeCount: number;
  serviceCodeVisibility: boolean
  addDaignosisVisibility: boolean;
  @Input() editMode?: boolean = false
  selectedCase: any;
  @Input() patientSession: PatientSession;
  populatedServiceCodes?: ServiceCode[]
  populatedSiagnosisCode?: CaseDiagnosis[];
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    if (this.editMode)
      this.populateModel();
    else
      this.initializeModel();
  }
  toggleserviceCode() {
    this.serviceCodeVisibility = !this.serviceCodeVisibility
  }
  toggleAddDaignosis() {
    this.addDaignosisVisibility = !this.addDaignosisVisibility
  }
  getCreatedServiceCode(createdServiceCode: ServiceCode) {
    this.serviceCodeVisibility = false;
    this.serviceCodeListComponent.pushServiceCode(createdServiceCode);
  }
  getCreatedDagnosis(createdDaignosis: CaseDiagnosis) {
    this.addDaignosisVisibility = false
    this.daignosisListComponent.pushDaignosis(createdDaignosis);
  }
  getServiceCodes() {
    console.log(JSON.stringify(this.serviceCodeListComponent.getServiceCodes()))
    return this.serviceCodeListComponent.getServiceCodes();
  }
  getDaignosises() {
    return this.daignosisListComponent.diagnosises;
  }
  private populateModel() {
    if (this.patientSession === undefined)
      this.emitPatientSessionService.sessionBillingCode$.pipe(
        filter((selectedBillCode) => selectedBillCode !== null),
        first()
      ).subscribe((selectedBillCode) => {
        this.billingCode = selectedBillCode;
        this.selectedCase = selectedBillCode.caseTitle;
        this.emitPatientSessionService.sessionserviceCodes$.next(selectedBillCode.ServiceCodes)
        this.emitPatientSessionService.sessionDaignosies$.next(selectedBillCode.diagnosisCode)
      })
    else
      this.populateBillingCode();
  }
  private initializeModel() {
    this.billingCode = {
      placeOfCode: null,
      facility: null,
    }
    this.emitPatientSessionService.sessionDaignosies$.next(undefined)
  }
  pickCase(pickedCase: PatientCase) {
    this.selectedCase = pickedCase;
    this.billingCode.caseTitle = pickedCase.title;
    this.emitPatientSessionService.sessionDaignosies$.next(pickedCase.caseDiagnosis)
    this.billingCode.isCaseAttached = true;
  }
  unPickCase() {
    this.emitPatientSessionService.sessionDaignosies$.next(undefined)
  }
  change(caseTitle: string) {
    this.billingCode.caseTitle = caseTitle;
  }
  private populateBillingCode() {
    this.billingCode = {
      placeOfCode: this.patientSession.placeOfCode,
      facility: this.patientSession.clinicInfo.clinicName,
      diagnosisCode: this.patientSession.caseDiagnosis,
      ServiceCodes: this.patientSession.serviceCodes,
      caseTitle: this.patientSession.caseTitle
    }
    this.selectedCase = this.billingCode.caseTitle;
    this.populateServiceCodes()
    this.diagnosis();
  }
  private populateServiceCodes() {
    this.populatedServiceCodes = this.billingCode.ServiceCodes
  }
  private diagnosis() {
    this.populatedSiagnosisCode = this.billingCode.diagnosisCode;
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter, first } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { DignosisListComponent } from '../../../profile/filling/sessions/dependencies/dignosis.list/dignosis-list.component';
import { ServiceCodeListComponent } from '../../../profile/filling/sessions/dependencies/service.code/list/service.code.list.component';
import { BillingCode } from '../../../profile/filling/sessions/model/billing.code';
import { EmitPatientSessionService } from '../../../service/session/shared/emit-patient-session.service';

@Component({
  selector: 'edit-session-billing-code',
  templateUrl: './session-billing-code.component.html',
  styleUrls: ['./session-billing-code.component.scss']
})
export class SessionBillingCodeComponent implements OnInit {
  billingCode: BillingCode
  @ViewChild('editSessionBillingcodeForm') editSessionBillingcodeForm: NgForm;
  @ViewChild('espserviceCodeListComponent') espserviceCodeListComponent: ServiceCodeListComponent;
  @ViewChild('espdaignosisListComponent') espdaignosisListComponent: DignosisListComponent;
  @Input() patientCases: PatientCase[];
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
  notValidForm: boolean = false;
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    if (this.editMode)
      this.populateModel();
    else
      this.initializeModel();
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
  private populateBillingCode() {
    this.billingCode = {
      placeOfCode: this.patientSession.placeOfCode,
      facility: this.patientSession.clinic,
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
  toggleserviceCode() {
    this.serviceCodeVisibility = !this.serviceCodeVisibility
  }
  toggleAddDaignosis() {
    this.addDaignosisVisibility = !this.addDaignosisVisibility
  }
  getCreatedServiceCode(createdServiceCode: ServiceCode) {
    this.serviceCodeVisibility = false;
    this.espserviceCodeListComponent.pushServiceCode(createdServiceCode);
  }
  getCreatedDagnosis(createdDaignosis: CaseDiagnosis) {
    this.addDaignosisVisibility = false
    this.espdaignosisListComponent.pushDaignosis(createdDaignosis);
  }
  getServiceCodes() {
    return this.espserviceCodeListComponent.getServiceCodes();
  }
  getDaignosises() {
    return this.espdaignosisListComponent.diagnosises;
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
}

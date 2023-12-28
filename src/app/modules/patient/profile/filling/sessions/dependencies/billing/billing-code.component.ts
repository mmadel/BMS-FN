import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime, filter, finalize, first, switchMap, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
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
  selectedCase: PatientCase;

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
    return this.serviceCodeListComponent.getServiceCodes();
  }
  getDaignosises() {
    return this.daignosisListComponent.diagnosises;
  }
  private populateModel() {
    this.emitPatientSessionService.sessionBillingCode$.pipe(
      filter((selectedBillCode) => selectedBillCode !== null),
      first()
    ).subscribe((selectedBillCode) => {
      this.billingCode = selectedBillCode;
      this.emitPatientSessionService.sessionserviceCodes$.next(selectedBillCode.ServiceCodes)
      this.emitPatientSessionService.sessionDaignosies$.next(selectedBillCode.diagnosisCode)
    })
  }
  private initializeModel() {
    this.billingCode = {
      placeOfCode: null,
      facility: null,
    }
  }
  pickCase(pickedCase: PatientCase) {
    this.selectedCase = pickedCase;
    this.emitPatientSessionService.sessionDaignosies$.next(this.selectedCase.caseDiagnosis)
  }
  unPickCase() {
    this.emitPatientSessionService.sessionDaignosies$.next(undefined)
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { filter, first } from 'rxjs';
import { ClinicService } from 'src/app/modules/admin.tools/services/clinic.service';
import { Clinic } from 'src/app/modules/model/admin/clinic';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { FeeScheduleService } from 'src/app/modules/tools/fee.schedule/service/fee-schedule.service';
import { ModifierRuleService } from 'src/app/modules/tools/modifier.rules/service/modifier-rule.service';
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
  clinics: Clinic[];
  compareFn = this._compareFn.bind(this);
  activePane = 0;
  constructor(private emitPatientSessionService: EmitPatientSessionService,
    private clinicService: ClinicService,
    private modifierRuleService: ModifierRuleService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    if (this.editMode)
      this.populateModel();
    else
      this.initializeModel();

    this.populateClinics();
  }
  populateClinics() {
    this.clinicService.findAllWithoutPagination()
      .subscribe((result: any) => {
        this.clinics = result
      })
  }
  applyModifierRule() {
    this.modifierRuleService.fireDefault(this.serviceCodeListComponent.serviceCodes).subscribe((result:any)=>{
      this.toastr.success("Default Modifier Rule is Fired")
      this.emitPatientSessionService.sessionserviceCodes$.next(result)  
    },error=>{
      this.toastr.error("Error during fire default modifier rule")

    })
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
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }
  onTabChange($event: number) {
    this.activePane = $event;
  }
}

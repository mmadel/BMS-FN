import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { LegacyID } from 'src/app/modules/model/clinical/provider/legacy.id';
import { DoctorInfo } from 'src/app/modules/model/clinical/session/doctor.info';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { BillingCodeComponent } from '../dependencies/billing/billing-code.component';
import { ShedulingComponent } from '../dependencies/scheduling/sheduling.component';
import { BillingCode } from '../model/billing.code';
import { SessionScheduling } from '../model/session.scheduling';

@Component({
  selector: 'app-patient-session-edit',
  templateUrl: './patient-session-edit.component.html',
  styleUrls: ['./patient-session-edit.component.scss']
})
export class PatientSessionEditComponent implements OnInit {
  componentRole: string[] = [Role.PATIENT_ROLE];
  @ViewChild('editPateintSessionShedulingComponent') editPateintSessionShedulingComponent: ShedulingComponent;
  @ViewChild('editPateintSessionBillingCodeComponent') editPateintSessionBillingCodeComponent: BillingCodeComponent;
  selectedPateint: Patient;
  oldProvider: DoctorInfo;
  selectedPateintSessionId: number
  sessionStatus:string;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private patientSessionService: PatientSessionService
    , private emitPatientSessionService: EmitPatientSessionService
    , private toastr: ToastrService) { }
  ngOnInit(): void {
    this.emitPatientSessionService.patientSession$.pipe(
      filter((selectedPateint) => selectedPateint !== null)
    ).subscribe((result) => {
      console.log(JSON.stringify(result))
      this.populateSessionScheduling(result);
      this.populateBillingCode(result)
      this.assignPatientSessionData(result);

    })
  }
  private assignPatientSessionData(selectedPateintSession: PatientSession) {
    this.selectedPateint = {
      id: selectedPateintSession.patientId,
    }
    this.oldProvider = selectedPateintSession.doctorInfo;
    this.selectedPateintSessionId = selectedPateintSession.id
    this.sessionStatus = selectedPateintSession.status
  }
  private populateSessionScheduling(selectedPateintSession: PatientSession) {
    var sessionScheduling: SessionScheduling = {
      provider: selectedPateintSession.doctorInfo.doctorLastName + ',' + selectedPateintSession.doctorInfo.doctorFirstName,
      providerNPI: selectedPateintSession.doctorInfo.doctorNPI,
      serviceDate: moment.unix(selectedPateintSession.serviceDate / 1000).toDate(),
      startTime: moment.unix(selectedPateintSession.serviceStartTime / 1000).toDate(),
      endTime: moment.unix(selectedPateintSession.serviceEndTime / 1000).toDate(),
    }
    this.emitPatientSessionService.sessionScheduling$.next(sessionScheduling)
  }
  private populateBillingCode(selectedPateintSession: PatientSession) {
    var billingCode: BillingCode = {
      placeOfCode: selectedPateintSession.placeOfCode,
      facility: selectedPateintSession.clinic,
      diagnosisCode: selectedPateintSession.caseDiagnosis,
      ServiceCodes: selectedPateintSession.serviceCodes,
      caseTitle: selectedPateintSession.caseTitle

    }
    this.emitPatientSessionService.sessionBillingCode$.next(billingCode)
  }
  private constructorModelDoctorInfo() {
    var legacyID: LegacyID
    if (this.oldProvider.legacyID !== null && this.oldProvider.legacyID !== undefined) {
      legacyID = {
        providerId: this.oldProvider.legacyID.providerId,
        providerIdQualifier: this.oldProvider.legacyID.providerIdQualifier,
        payerName: this.oldProvider.legacyID.payerName,
      }
    }
    return {
      doctorId: this.editPateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        this.oldProvider.doctorId :
        this.editPateintSessionShedulingComponent.sessionScheduling.provider.model.id,
      doctorFirstName: this.editPateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        this.oldProvider.doctorFirstName :
        this.editPateintSessionShedulingComponent.sessionScheduling.provider.model.firstName,
      doctorLastName: this.editPateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        this.oldProvider.doctorLastName :
        this.editPateintSessionShedulingComponent.sessionScheduling.provider.model.lastName,
      doctorNPI: this.editPateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        this.oldProvider.doctorNPI :
        this.editPateintSessionShedulingComponent.sessionScheduling.provider.model.npi,
      legacyID: legacyID
    }
  }
  private constructModel() {
    return {
      id: this.selectedPateintSessionId,
      serviceDate: moment(this.editPateintSessionShedulingComponent.sessionScheduling.serviceDate).unix() * 1000,
      serviceStartTime: moment(this.editPateintSessionShedulingComponent.sessionScheduling.startTime).unix() * 1000,
      serviceEndTime: moment(this.editPateintSessionShedulingComponent.sessionScheduling.endTime).unix() * 1000,
      placeOfCode: this.editPateintSessionBillingCodeComponent.billingCode.placeOfCode,
      patientId: this.selectedPateint.id,
      status : this.sessionStatus,
      doctorInfo: this.constructorModelDoctorInfo(),
      clinicInfo: this.constructModelClinicInfo(),
      clinic: this.editPateintSessionBillingCodeComponent.billingCode.facility,
      caseDiagnosis: this.editPateintSessionBillingCodeComponent.getDaignosises(),
      serviceCodes: this.editPateintSessionBillingCodeComponent.getServiceCodes(),
      caseTitle: this.editPateintSessionBillingCodeComponent.billingCode.caseTitle
    }
  }
  private constructModelClinicInfo() {
    return {
      clinicName: 'eee'
    }
  }
  update() {
    var updatedPateintSession: PatientSession = this.constructModel();
    if (!this.editPateintSessionShedulingComponent.sessionForm.valid)
      this.editPateintSessionShedulingComponent.notValidForm = true;
    if (!this.editPateintSessionBillingCodeComponent.billingcodeForm.valid)
      this.editPateintSessionBillingCodeComponent.notValidForm = true;
    if (!(this.editPateintSessionShedulingComponent.notValidForm || this.editPateintSessionBillingCodeComponent.notValidForm)) {
      console.log(JSON.stringify(updatedPateintSession))
      this.patientSessionService.update(updatedPateintSession)
        .subscribe((result) => {
          this.changeVisibility.emit('session');
          this.toastr.success("pateint session updated")
        }, (error) => {
          this.toastr.error("Error during session udpate")
        })
    }
  }
}

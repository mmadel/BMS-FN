import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { DoctorInfo } from 'src/app/modules/model/clinical/session/doctor.info';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
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
  @ViewChild('editPateintSessionShedulingComponent') editPateintSessionShedulingComponent: ShedulingComponent;
  @ViewChild('editPateintSessionBillingCodeComponent') editPateintSessionBillingCodeComponent: BillingCodeComponent;
  selectedPateint: Patient;
  oldProvider: DoctorInfo;
  selectedPateintSessionId: number
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private patientSessionService: PatientSessionService
    , private emitPatientSessionService: EmitPatientSessionService
    , private toastr: ToastrService) { }
  ngOnInit(): void {
    this.emitPatientSessionService.patientSession$.pipe(
      filter((selectedPateint) => selectedPateint !== null)
    ).subscribe((result) => {
      this.populateSessionScheduling(result);
      this.populateBillingCode(result)
      this.assignPatientSessionData(result);

    })
  }
  private assignPatientSessionData(selectedPateintSession: PatientSession) {
    this.selectedPateint = {
      id: selectedPateintSession.patientInfo.patientId,
      firstName: selectedPateintSession.patientInfo.patientFirstName,
      lastName: selectedPateintSession.patientInfo.patientLastName,
      middleName: selectedPateintSession.patientInfo.patientMiddleName,
    }
    this.oldProvider = selectedPateintSession.doctorInfo;
    this.selectedPateintSessionId = selectedPateintSession.id
  }
  private populateSessionScheduling(selectedPateintSession: PatientSession) {
    var sessionScheduling: SessionScheduling = {
      clientName: selectedPateintSession.patientInfo.patientLastName + ',' + selectedPateintSession.patientInfo.patientFirstName,
      provider: selectedPateintSession.doctorInfo.doctorLastName + ',' + selectedPateintSession.doctorInfo.doctorFirstName,
      serviceDate: moment.unix(selectedPateintSession.serviceDate / 1000).toDate(),
      startTime: moment.unix(selectedPateintSession.serviceStartTime / 1000).toDate(),
      endTime: moment.unix(selectedPateintSession.serviceEndTime / 1000).toDate(),
    }
    this.emitPatientSessionService.sessionScheduling$.next(sessionScheduling)
  }
  private populateBillingCode(selectedPateintSession: PatientSession) {
    var billingCode: BillingCode = {
      placeOfCode: selectedPateintSession.placeOfCode,
      facility: selectedPateintSession.clinicInfo.clinicName,
      diagnosisCode: selectedPateintSession.caseDiagnosis,
      ServiceCodes: selectedPateintSession.serviceCodes
    }
    this.emitPatientSessionService.sessionBillingCode$.next(billingCode)
  }
  private constructModelPateintInfo() {
    return {
      patientId: this.selectedPateint.id,
      patientFirstName: this.selectedPateint.firstName,
      patientMiddleName: this.selectedPateint.middleName,
      patientLastName: this.selectedPateint.lastName
    }
  }
  private constructorModelDoctorInfo() {
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
        this.editPateintSessionShedulingComponent.sessionScheduling.provider.model.doctorNPI,
    }
  }
  private constructModel() {
    return {
      id: this.selectedPateintSessionId,
      serviceDate: moment(this.editPateintSessionShedulingComponent.sessionScheduling.serviceDate).unix() * 1000,
      serviceStartTime: moment(this.editPateintSessionShedulingComponent.sessionScheduling.startTime).unix() * 1000,
      serviceEndTime: moment(this.editPateintSessionShedulingComponent.sessionScheduling.endTime).unix() * 1000,
      placeOfCode: this.editPateintSessionBillingCodeComponent.billingCode.placeOfCode,
      patientInfo: this.constructModelPateintInfo(),
      doctorInfo: this.constructorModelDoctorInfo(),
      clinicInfo: this.constructModelClinicInfo(),
      caseDiagnosis: this.constructModelICDCaseDiagnosis(),
      serviceCodes: this.editPateintSessionBillingCodeComponent.getServiceCodes()
    }
  }
  private constructModelClinicInfo() {
    return {
      clinicName: this.editPateintSessionBillingCodeComponent.billingCode.facility
    }
  }
  private constructModelICDCaseDiagnosis() {
    return {
      diagnosisCode: this.editPateintSessionBillingCodeComponent.billingCode.diagnosisCode.diagnosisCode,
      diagnosisDescription: this.editPateintSessionBillingCodeComponent.billingCode.diagnosisCode.diagnosisDescription
    }
  }
  update() {
    var updatedPateintSession: PatientSession = this.constructModel();
    if (!this.editPateintSessionShedulingComponent.sessionForm.valid)
      this.editPateintSessionShedulingComponent.notValidForm = true;
    if (!this.editPateintSessionBillingCodeComponent.billingcodeForm.valid)
      this.editPateintSessionBillingCodeComponent.notValidForm = true;
    if (!(this.editPateintSessionShedulingComponent.notValidForm || this.editPateintSessionBillingCodeComponent.notValidForm)) {
      this.patientSessionService.update(updatedPateintSession)
        .subscribe((result) => {
          this.changeVisibility.emit('close');
          this.toastr.success("pateint session updated")
        }, (error) => {
          this.toastr.success("Error during session udpate")
        })
    }
    console.log(JSON.stringify(updatedPateintSession));
  }
}

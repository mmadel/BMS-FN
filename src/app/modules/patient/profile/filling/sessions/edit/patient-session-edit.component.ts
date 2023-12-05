import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { BillingCode } from '../model/billing.code';
import { SessionScheduling } from '../model/session.scheduling';

@Component({
  selector: 'app-patient-session-edit',
  templateUrl: './patient-session-edit.component.html',
  styleUrls: ['./patient-session-edit.component.scss']
})
export class PatientSessionEditComponent implements OnInit {

  constructor(private emitPatientSessionService: EmitPatientSessionService) { }
  ngOnInit(): void {
    this.emitPatientSessionService.patientSession$.pipe(
      filter((selectedPateint) => selectedPateint !== null)
    ).subscribe((result) => {
      this.populateSessionScheduling(result);
      this.populateBillingCode(result)
    })
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
}

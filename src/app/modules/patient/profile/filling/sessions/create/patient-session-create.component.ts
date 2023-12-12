import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { BillingCodeComponent } from '../dependencies/billing/billing-code.component';
import { ShedulingComponent } from '../dependencies/scheduling/sheduling.component';

@Component({
  selector: 'app-patient-session-create',
  templateUrl: './patient-session-create.component.html',
  styleUrls: ['./patient-session-create.component.scss']
})
export class PatientSessionCreateComponent implements OnInit, AfterViewInit {
  @Input() selectedPateint: Patient;
  @ViewChild('pateintSessionShedulingComponent') pateintSessionShedulingComponent: ShedulingComponent;
  @ViewChild('pateintSessionBillingCodeComponent') pateintSessionBillingCodeComponent: BillingCodeComponent;
  patientSession: PatientSession;
  @Output() changeVisibility = new EventEmitter<string>()
  constructor(private patientSessionService: PatientSessionService,
    private toastr: ToastrService) { }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {

  }

  createSession() {
    if (!this.pateintSessionShedulingComponent.sessionForm.valid)
      this.pateintSessionShedulingComponent.notValidForm = true;
    if (!this.pateintSessionBillingCodeComponent.billingcodeForm.valid)
      this.pateintSessionBillingCodeComponent.notValidForm = true;
    if (!(this.pateintSessionShedulingComponent.notValidForm || this.pateintSessionBillingCodeComponent.notValidForm)) {
      this.constructModel();
      console.log(JSON.stringify(this.patientSession))
      this.patientSessionService.create(this.patientSession)
        .subscribe((result) => {
          this.changeVisibility.emit('close');

        }, (error) => {
          this.toastr.success("Error during session creation")
        })
    }

  }
  private constructModel() {
    this.patientSession = {
      serviceDate: moment(this.pateintSessionShedulingComponent.sessionScheduling.serviceDate).unix() * 1000,
      serviceStartTime: moment(this.pateintSessionShedulingComponent.sessionScheduling.startTime).unix() * 1000,
      serviceEndTime: moment(this.pateintSessionShedulingComponent.sessionScheduling.endTime).unix() * 1000,
      placeOfCode: this.pateintSessionBillingCodeComponent.billingCode.placeOfCode,
      patientId: this.selectedPateint.id,
      doctorInfo: this.constructorModelDoctorInfo(),
      clinicInfo: this.constructModelClinicInfo(),
      caseDiagnosis: this.constructModelICDCaseDiagnosis(),
      serviceCodes: this.pateintSessionBillingCodeComponent.getServiceCodes()
    }
  }

  private constructorModelDoctorInfo() {
    return {
      doctorId: this.pateintSessionShedulingComponent.sessionScheduling.provider.model.id,
      doctorFirstName: this.pateintSessionShedulingComponent.sessionScheduling.provider.model.firstName,
      doctorLastName: this.pateintSessionShedulingComponent.sessionScheduling.provider.model.lastName,
      doctorNPI: this.pateintSessionShedulingComponent.sessionScheduling.provider.model.npi
    }
  }

  private constructModelClinicInfo() {
    return {
      clinicName: this.pateintSessionBillingCodeComponent.billingCode.facility
    }
  }
  private constructModelICDCaseDiagnosis() {
    return {
      diagnosisCode: this.pateintSessionBillingCodeComponent.billingCode.diagnosisCode.diagnosisCode,
      diagnosisDescription: this.pateintSessionBillingCodeComponent.billingCode.diagnosisCode.diagnosisDescription
    }
  }
  clear() { }
}

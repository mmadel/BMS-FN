import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
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
    private toastr: ToastrService
    , private emitPatientSessionService: EmitPatientSessionService) { }
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
      this.patientSessionService.create(this.patientSession)
        .subscribe((result) => {
          this.changeVisibility.emit('close');
          this.toastr.success("Patient Session crteated")
          this.scrollUp();
        }, (error) => {
          this.toastr.error("Error during session creation")
          this.scrollUp();
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
      clinic: this.pateintSessionBillingCodeComponent.billingCode.facility,
      caseTitle: this.pateintSessionBillingCodeComponent.billingCode.caseTitle,
      caseDiagnosis: this.pateintSessionBillingCodeComponent.getDaignosises(),
      serviceCodes: this.pateintSessionBillingCodeComponent.getServiceCodes(),
      isCasesAttached: this.pateintSessionBillingCodeComponent.billingCode.isCaseAttached === undefined ? false :
        this.pateintSessionBillingCodeComponent.billingCode.isCaseAttached
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
  clear() { }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../model/clinical/patient';
import { DoctorInfo } from '../../model/clinical/session/doctor.info';
import { PatientSession } from '../../model/clinical/session/patient.session';
import { Country } from '../../model/common/country';
import { Gender } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';
import { CaseAddDaignosisComponent } from '../profile/billing/cases/add.daignosis/case-add-daignosis.component';
import { CreateInsuranceComponent } from '../profile/billing/insurance/create/create-insurance.component';
import { BillingCodeComponent } from '../profile/filling/sessions/dependencies/billing/billing-code.component';
import { ShedulingComponent } from '../profile/filling/sessions/dependencies/scheduling/sheduling.component';
import { PatientService } from '../service/patient.service';
import { PatientSessionService } from '../service/session/patient.session.service';
import { SessionBillingCodeComponent } from './components/session.billing.code/session-billing-code.component';

@Component({
  selector: 'patient-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  columns = [
    {
      key: 'serviceDate',
      label: 'Date Of Service',

    },
    {
      key: 'startDate',
      label: 'Start At',

    },
    {
      key: 'endDate',
      label: 'End At',

    },
    {
      key: 'provider',
      label: 'Provider',
    },
    {
      key: 'show',
      _style: { width: '5%' },
      label: '',
      filter: false,
      sorter: false,
    },
  ];
  @ViewChild('createInsuranceCompanyEditProfileComponent')
  createInsuranceCompanyEditProfileComponent: CreateInsuranceComponent;

  @ViewChild('createCaseEditProfileComponent')
  createCaseEditProfileComponent: CaseAddDaignosisComponent;

  @ViewChild('editProfilePateintSessionShedulingComponent')
  editProfilePateintSessionShedulingComponent: ShedulingComponent;
  @ViewChild('editProfilePateintSessionBillingCodeComponent')
  editProfilePateintSessionBillingCodeComponent: SessionBillingCodeComponent;

  @Input() patient: Patient = {}
  genders = Gender;
  genderKeys = Object.values;
  maritalStatuses = MaritalStatus;
  maritalStatusKeys = Object.values;
  phoneTypes = PhoneType
  phoneTypesKeys = Object.values;
  countries: Country[] = Countries;
  states: string[] = States;
  patientDOB: Date
  @Output() changeEditPorfileVisibility = new EventEmitter<string>()
  editProfileAddInsuranceVisibility: boolean = false;
  editProfileAddCaseVisibility: boolean = false;
  viewSessionDetailsVisibility: boolean = false;
  details_visible = Object.create({});
  selectedPateintSession: PatientSession;
  constructor(private patientService: PatientService
    , private toastr: ToastrService
    , private patientSessionService: PatientSessionService) { }

  ngOnInit(): void {
    this.populateModel();
  }

  populateModel() {
    this.patientDOB = moment.unix(this.patient?.birthDate / 1000).toDate();
  }
  handleModel() {
    this.patient.birthDate = moment(this.patientDOB).unix() * 1000;
  }
  remove(index: number) {
    this.patient.patientInsurances.splice(index, 1);
  }
  update() {
    this.handleModel();
    this.patientService.create(this.patient)
      .subscribe((result) => {
        this.changeEditPorfileVisibility.emit('profile')
        this.toastr.success('Patient updated')
      })
  }
  toggleeditProfileAddInsuranceVisibility() {
    this.editProfileAddInsuranceVisibility = !this.editProfileAddInsuranceVisibility;
  }
  toggleEditProfileAddCaseVisibilityVisibility() {
    this.editProfileAddCaseVisibility = !this.editProfileAddCaseVisibility;
  }
  openAddInsuranceCompany() {
    this.editProfileAddInsuranceVisibility = true;
  }
  openAddCase() {
    this.editProfileAddCaseVisibility = true;
  }
  changeeditProfileInsurancVisibility(event: any) {
    if (event === 'close') {
      this.editProfileAddInsuranceVisibility = false;
      this.createInsuranceCompanyEditProfileComponent.patientInsurance;
      this.patient.patientInsurances.push(this.createInsuranceCompanyEditProfileComponent.patientInsurance);
    }
  }
  removeCase(index: number) {
    this.patient.cases.splice(index, 1);
  }
  createCase() {
    this.patient.cases.push(this.createCaseEditProfileComponent.case)
    this.editProfileAddCaseVisibility = false;
  }
  togglesessionDetails() {
    this.viewSessionDetailsVisibility = !this.viewSessionDetailsVisibility;
  }
  openSessionDeatils(item: any) {
    this.selectedPateintSession = item;
    this.viewSessionDetailsVisibility = true;
  }
  updateSession(pateintSession: PatientSession) {
    var updatedPateintSession: PatientSession = this.constructModel(pateintSession);
    if (!this.editProfilePateintSessionShedulingComponent.sessionForm.valid)
      this.editProfilePateintSessionShedulingComponent.notValidForm = true;
    if (!this.editProfilePateintSessionBillingCodeComponent.editSessionBillingcodeForm.valid)
      this.editProfilePateintSessionBillingCodeComponent.notValidForm = true;
    if (!(this.editProfilePateintSessionShedulingComponent.notValidForm || this.editProfilePateintSessionBillingCodeComponent.notValidForm)) {
      this.patientSessionService.update(updatedPateintSession)
        .subscribe((result) => {
          this.viewSessionDetailsVisibility = false;
          this.toastr.success("pateint session updated")
        }, (error) => {
          this.toastr.success("Error during session udpate")
        })
    }
  }
  private constructModel(pateintSession: PatientSession) {
    return {
      id: pateintSession.id,
      serviceDate: moment(this.editProfilePateintSessionShedulingComponent.sessionScheduling.serviceDate).unix() * 1000,
      serviceStartTime: moment(this.editProfilePateintSessionShedulingComponent.sessionScheduling.startTime).unix() * 1000,
      serviceEndTime: moment(this.editProfilePateintSessionShedulingComponent.sessionScheduling.endTime).unix() * 1000,
      placeOfCode: this.editProfilePateintSessionBillingCodeComponent.billingCode.placeOfCode,
      patientId: this.patient.id,
      doctorInfo: this.constructorModelDoctorInfo(pateintSession.doctorInfo),
      clinicInfo: this.constructModelClinicInfo(),
      clinic: this.editProfilePateintSessionBillingCodeComponent.billingCode.facility,
      caseDiagnosis: this.editProfilePateintSessionBillingCodeComponent.getDaignosises(),
      serviceCodes: this.editProfilePateintSessionBillingCodeComponent.getServiceCodes(),
      caseTitle: this.editProfilePateintSessionBillingCodeComponent.billingCode.caseTitle
    }
  }
  private constructorModelDoctorInfo(doctorInfo?: DoctorInfo) {
    return {
      doctorId: this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        doctorInfo.doctorId :
        this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model.id,
      doctorFirstName: this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        doctorInfo.doctorFirstName :
        this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model.firstName,
      doctorLastName: this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        doctorInfo.doctorLastName :
        this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model.lastName,
      doctorNPI: this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model === undefined ?
        doctorInfo.doctorNPI :
        this.editProfilePateintSessionShedulingComponent.sessionScheduling.provider.model.doctorNPI,
    }
  }
  private constructModelClinicInfo() {
    return {
      clinicName: this.editProfilePateintSessionBillingCodeComponent.billingCode.facility.title
    }
  }
}

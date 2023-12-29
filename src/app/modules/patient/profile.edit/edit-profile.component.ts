import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../model/clinical/patient';
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
import { BillingCode } from '../profile/filling/sessions/model/billing.code';
import { PatientService } from '../service/patient.service';
import { SessionScheduling } from '../session/model/session.scheduling';

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
  details_visible = Object.create({});
  selectedPateintSession: PatientSession;
  constructor(private patientService: PatientService
    , private toastr: ToastrService) { }

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
        this.changeEditPorfileVisibility.emit('close')
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
    console.log(this.createCaseEditProfileComponent)
    this.patient.cases.push(this.createCaseEditProfileComponent.case)
    this.editProfileAddCaseVisibility = false;
  }
  toggleDetails(item: any) {
    console.log(item)
    this.details_visible[item] = !this.details_visible[item];
  }
}

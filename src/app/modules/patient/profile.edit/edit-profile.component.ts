import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../model/clinical/patient';
import { Country } from '../../model/common/country';
import { Gender } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';
import { CreateInsuranceComponent } from '../profile/billing/insurance/create/create-insurance.component';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'patient-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('createInsuranceCompanyEditProfileComponent')
  createInsuranceCompanyEditProfileComponent: CreateInsuranceComponent;
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
  openAddInsuranceCompany() {
    this.editProfileAddInsuranceVisibility = true;
  }
  changeeditProfileInsurancVisibility(event: any) {
    if (event === 'close') {
      this.editProfileAddInsuranceVisibility = false;
      this.createInsuranceCompanyEditProfileComponent.patientInsurance;
      this.patient.patientInsurances.push(this.createInsuranceCompanyEditProfileComponent.patientInsurance);
    }
  }
}

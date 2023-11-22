import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../model/clinical/patient';
import { Country } from '../../model/common/country';
import { Gender } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  notValidForm: boolean = false;
  @ViewChild('patientCreationForm') patientCreationForm: NgForm;
  patient: Patient = {
    gender: null,
    maritalStatus: null,
    address: {
      country: null,
      state: null
    },
    phoneType: null
  }
  patientDOB: Date
  genderKeys = Object.values;
  genders = Gender;
  maritalStatusKeys = Object.values;
  maritalStatuses = MaritalStatus;
  phoneTypesKeys = Object.values;
  phoneTypes = PhoneType
  countries: Country[] = Countries;
  states: string[] = States;

  constructor(private patientService: PatientService
    , private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  create() {
    if (this.patientCreationForm.valid) {
      this.patient.birthDate = moment(this.patientDOB).unix() * 1000;
      this.patientService.create(this.patient)
        .subscribe((result) => {
          this.toastr.success('Patient Created');
          this.patientCreationForm.reset();
        }, (error) => {
          this.toastr.error('Error in Patient Created');
        })
      this.notValidForm = false
    } else {
      this.notValidForm = true;
    }
  }
} 

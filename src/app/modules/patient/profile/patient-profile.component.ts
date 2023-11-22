import { Component, OnInit } from '@angular/core';
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
  patient: Patient = {
    address:{}
  }
  genderKeys = Object.values;
  genders = Gender;
  maritalStatusKeys = Object.values;
  maritalStatuses = MaritalStatus;
  phoneTypesKeys = Object.values;
  phoneTypes = PhoneType
  countries: Country[] = Countries;
  states: string[] = States;
  constructor(private patientService: PatientService) { }
  ngOnInit(): void {
  }

}

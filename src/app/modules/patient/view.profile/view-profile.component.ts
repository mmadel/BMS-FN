import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Patient } from '../../model/clinical/patient';
import { Country } from '../../model/common/country';
import { Gender } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';

@Component({
  selector: 'view-patient-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  @Input() patient:Patient
  genders = Gender;
  genderKeys = Object.values;
  maritalStatuses = MaritalStatus;
  maritalStatusKeys = Object.values;
  phoneTypes = PhoneType
  phoneTypesKeys = Object.values;
  countries: Country[] = Countries;
  states: string[] = States;
  patientDOB: Date
  constructor() { }

  ngOnInit(): void {
    this.patientDOB = moment.unix(this.patient.birthDate / 1000).toDate();
  }

}

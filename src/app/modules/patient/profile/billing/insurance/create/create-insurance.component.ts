import { Component, OnInit } from '@angular/core';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { Country } from 'src/app/modules/model/common/country';
import { Gender } from 'src/app/modules/model/enum/geneder';
import { Relation } from 'src/app/modules/model/enum/relation';
import { Countries } from 'src/app/modules/model/lookups/country-data-store';
import { States } from 'src/app/modules/model/lookups/state-data-store';

@Component({
  selector: 'app-create-insurance',
  templateUrl: './create-insurance.component.html',
  styleUrls: ['./create-insurance.component.scss']
})
export class CreateInsuranceComponent implements OnInit {
  notValidForm: boolean = false
  relationsKeys = Object.values;
  relations = Relation;
  genderKeys = Object.values;
  genders = Gender;
  countries: Country[] = Countries;
  states: string[] = States;
  patientInsurance: PatientInsurance = {
    relation: null,
    patientRelation: {
      gender: null,
      address: {
        country: null,
        state: null
      }
    }
  }
  constructor() { }

  ngOnInit(): void {
  }
  create() {

  }
  resetError() {

  }
}

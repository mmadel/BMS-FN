import { Component, OnInit } from '@angular/core';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { Country } from 'src/app/modules/model/common/country';
import { Gender } from 'src/app/modules/model/enum/geneder';
import { InsurancePlanType } from 'src/app/modules/model/enum/insurance.plan.type';
import { InsuranceResponsability } from 'src/app/modules/model/enum/insurance.responsability';
import { InformationRelease } from 'src/app/modules/model/enum/patient.insurance.information.release';
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
  insuranceResponsabilityKeys = Object.values;
  insuranceResponsability = InsuranceResponsability
  insurancePlanTypeKeys = Object.keys;
  insurancePlanType = InsurancePlanType;
  informationReleaseKeys = Object.keys;
  informationRelease = InformationRelease;
  patientInsurance: PatientInsurance = {
    relation: null,
    patientRelation: {
      gender: null,
      address: {
        country: null,
        state: null
      }
    },
    patientInsurancePolicy: {
      responsability: null,
      planType: null
    },
    patientInsuranceAdvanced: {
      acceptAssigment: true,
      signatureOnFile: true,
      informationRelease: null
    },
    payerAddress: {
      country: null,
      state: null
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

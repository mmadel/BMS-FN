import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from 'src/app/modules/model/clinical/patient';
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
  @ViewChild('insuranceCreateForm') insuranceCreateForm: NgForm;
  @Output() changeVisibility = new EventEmitter<string>()
  @Input() patient: Patient;
  notValidForm: boolean = false
  relationsKeys = Object.keys;
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
      r_gender: null,
      r_address: {
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
    if (this.insuranceCreateForm.valid) {
      this.notValidForm = false;
      this.changeVisibility.emit('close');
      //this.insuranceCreateForm.reset()
    } else {
      this.notValidForm = true;
    }
  }
  resetError() {
    this.notValidForm = false;
  }
  changeRelation() {
    if (this.patientInsurance.relation === 'Self') {
      this.patientInsurance.patientRelation.r_firstName = this.patient.firstName;
      this.patientInsurance.patientRelation.r_lastName = this.patient.lastName;
      this.patientInsurance.patientRelation.r_middleName = this.patient.middleName;
      this.patientInsurance.patientRelation.r_phone = this.patient.phone
      this.patientInsurance.patientRelation.r_gender = this.patient.gender;
      this.patientInsurance.patientRelation.r_address = this.patient.address
      this.patientInsurance.patientRelation.r_birthDate = this.patient.birthDate

    }
  }
}

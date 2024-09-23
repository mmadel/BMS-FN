import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PayerService } from 'src/app/modules/admin.tools/services/payer/payer.service';
import { Payer } from 'src/app/modules/model/admin/payer';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { Country } from 'src/app/modules/model/common/country';
import { Gender } from 'src/app/modules/model/enum/geneder';
import { InsuranceCompanyVisibility } from 'src/app/modules/model/enum/Insurance.company.visibility';
import { InsurancePlanType } from 'src/app/modules/model/enum/insurance.plan.type';
import { InsuranceResponsability } from 'src/app/modules/model/enum/insurance.responsability';
import { InformationRelease } from 'src/app/modules/model/enum/patient.insurance.information.release';
import { Relation } from 'src/app/modules/model/enum/relation';
import { Countries } from 'src/app/modules/model/lookups/country-data-store';
import { States } from 'src/app/modules/model/lookups/state-data-store';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { Role } from 'src/app/modules/secuirty/model/roles';

@Component({
  selector: 'app-create-insurance',
  templateUrl: './create-insurance.component.html',
  styleUrls: ['./create-insurance.component.scss']
})
export class CreateInsuranceComponent implements OnInit {
  @ViewChild('insuranceCreateForm') insuranceCreateForm: NgForm;
  @Output() changeVisibility = new EventEmitter<string>()
  @Input() patient: Patient;
  @Input() mode: string;
  @Input() editPatientInsurance: PatientInsurance;
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
  patientInsurance: PatientInsurance
  payers: Payer[]
  payerNameList: string[];
  payerIdList: string[];
  selectedPayerName: string;
  selectedPayerId: string
  componentRole: string[] = [Role.PATIENT_ROLE];
  constructor(private payerService: PayerService
    , private patientService: PatientService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fillModel();
    this.payerService.findAll()
      .subscribe((result: any) => {
        this.payers = result;
        this.payerNameList = this.payers.map(a => a.displayName);
        this.payerIdList = this.payers
          .filter(a => a.payerId !== undefined)
          .map(a => a.payerId + '')
      })
  }
  fillModel() {
    switch (this.mode) {
      case "create":
        this.patientInsurance = {
          relation: null,
          visibility: "Internal",
          isArchived: false,
          patientRelation: {
            r_gender: null,
            r_address: {
              country: null,
              state: null
            },
          },
          patientInsurancePolicy: {
            responsibility: null,
            planType: null
          },
          patientInsuranceAdvanced: {
            acceptAssigment: true,
            signatureOnFile: true,
            informationRelease: 'Signature On File'
          },
          insuranceCompany: new Array(),
          insuranceCompanyAddress: {},
          assigner: null
        }
        break;
      case "edit":
        this.patientInsurance = this.editPatientInsurance
        break;
    }
  }
  populatePayer() {
    switch (this.editPatientInsurance.visibility) {
      case "Internal":
        if (this.editPatientInsurance.assigner !== null) {
          this.selectedPayerId = this.editPatientInsurance.assigner[0]
          this.selectedPayerName = this.editPatientInsurance.assigner[1]
        } else {
          this.selectedPayerName = this.editPatientInsurance.insuranceCompany[0];
        }
        break;
      case "External":
        this.selectedPayerName = this.editPatientInsurance.insuranceCompany[0];
        this.selectedPayerId = this.editPatientInsurance.insuranceCompany[2]
        break;
    }
  }
  pickPayerName(event: any) {
    console.log(JSON.stringify(event))
    this.patientInsurance.visibility = 'External';
    this.payers.forEach(element => {
      if (element.displayName === event)
        this.selectedPayerId = element.payerId + '';
    });

  }
  unpickPayerName() {
    this.selectedPayerId = undefined;
    this.patientInsurance.visibility = 'Internal';
  }
  pickPayerId(event: any) {
    this.payers.forEach(element => {
      if (element.payerId + '' === event) {
        this.selectedPayerName = element.displayName
        this.fillPayerAddress(element);
        if (element.payerType === 'Clearing_House')
          this.patientInsurance.visibility = 'External';
        else
          this.patientInsurance.visibility = 'Internal';
      }
    });
  }
  unpickPayerId() {
    this.selectedPayerName = undefined
    this.patientInsurance.visibility = 'Internal';

  }
  fillPayerAddress(payer: Payer) {
    this.patientInsurance.insuranceCompanyAddress = {
      address: payer.address.address,
      state: payer.address.state,
      zipCode: payer.address.zipCode,
      city: payer.address.city
    }

  }
  create() {
    if (this.insuranceCreateForm.valid) {
      if (this.editPatientInsurance === undefined) {
        console.log(this.patientInsurance.visibility)
        switch (this.patientInsurance.visibility) {
          case "Internal":
            this.patientInsurance.insuranceCompany[0] = this.selectedPayerName
            break;
          case "External":
            this.patientInsurance.insuranceCompany[0] = this.selectedPayerName
            this.patientInsurance.insuranceCompany[1] = this.selectedPayerId
            break;
        }
        if (this.patientInsurance.patientInsurancePolicy.planType !== 'Workers_Compensation_Health_Claim')
          this.patientInsurance.patientInsurancePolicy.employer = undefined;
      }
      this.notValidForm = false;
      this.patientInsurance.patientRelation.r_address.state = this.patientInsurance.patientRelation.r_address.state.split('-')[0].trim();
      this.patientInsurance.patientRelation.r_birthDate = moment(this.patientInsurance.patientRelation.dob).unix() * 1000;
      this.patientService.createPatientInsurance(this.patientInsurance, this.patient.id)
        .subscribe((result: any) => {
          this.patientInsurance.assigner = result.records.assigner;
          this.patientInsurance.id = result.records.id;
          this.toastr.success("Patient insurance crteated")
          if (result.records.insuranceCompany !== null)
            this.patientInsurance.insuranceCompany = result.records.insuranceCompany
          this.scrollUp();
          this.changeVisibility.emit('close');
        }, error => {
          this.toastr.error("Error during creating patient insurance")
        })

    } else {
      this.notValidForm = true;
    }
  }
  resetError() {
    this.notValidForm = false;
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
  changeRelation() {
    if (this.patientInsurance.relation === 'Self') {
      this.patientInsurance.patientRelation.r_firstName = this.patient.firstName;
      this.patientInsurance.patientRelation.r_lastName = this.patient.lastName;
      this.patientInsurance.patientRelation.r_middleName = this.patient.middleName;
      this.patientInsurance.patientRelation.r_phone = this.patient.phone
      this.patientInsurance.patientRelation.r_gender = this.patient.gender;
      this.patientInsurance.patientRelation.r_address = this.patient.address
      this.patientInsurance.patientRelation.dob = moment.unix(this.patient.birthDate / 1000).toDate()
    } else {
      this.patientInsurance.patientRelation = {
        r_gender: null,
        r_address: {
          country: null,
          state: null
        }
      }
    }
  }
}

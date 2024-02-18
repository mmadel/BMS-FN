import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

@Component({
  selector: 'app-create-insurance',
  templateUrl: './create-insurance.component.html',
  styleUrls: ['./create-insurance.component.scss']
})
export class CreateInsuranceComponent implements OnInit {
  @ViewChild('insuranceCreateForm') insuranceCreateForm: NgForm;
  @Output() changeVisibility = new EventEmitter<string>()
  @Input() patient: Patient;
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
  constructor(private payerService: PayerService
    , private patientService: PatientService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fillModel();
    this.payerService.findAll()
      .subscribe((result: any) => {
        this.payers = result;
        this.payerNameList = this.payers.map(a => a.displayName);
        this.payerIdList = this.payers.map(a => a.payerId + '');
      })
  }
  fillModel() {
    if (this.editPatientInsurance !== null || this.editPatientInsurance !== undefined) {
      this.patientInsurance = this.editPatientInsurance
    } else {
      this.patientInsurance = {
        relation: null,
        patientRelation: {
          r_gender: null,
          r_address: {
            country: null,
            state: null
          }
        },
        patientInsurancePolicy: {
          responsibility: null,
          planType: null
        },
        patientInsuranceAdvanced: {
          acceptAssigment: true,
          signatureOnFile: true,
          informationRelease: 'Signature_on_file'
        },
        insuranceCompany: new Array(),
        insuranceCompanyAddress: {},
        assigner: null
      }
    }

  }
  pickPayerName(event: any) {
    this.payers.forEach(element => {
      if (element.displayName === event) {
        this.selectedPayerId = element.payerId + ''
        this.fillPayerAddress(element);
      }
    });
  }
  unpickPayerName() {
    this.selectedPayerId = undefined;

  }
  pickPayerId(event: any) {
    this.payers.forEach(element => {
      if (element.payerId + '' === event) {
        this.selectedPayerName = element.displayName
        this.fillPayerAddress(element);
      }
    });
  }
  unpickPayerId() {
    this.selectedPayerName = undefined

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
      this.notValidForm = false;
      this.patientInsurance.insuranceCompany[0] = this.selectedPayerName
      if (this.selectedPayerId !== undefined) {
        this.patientInsurance.insuranceCompany[1] = this.selectedPayerId
        this.patientInsurance.visibility = 'External'
      }
      if (this.selectedPayerId === undefined)
        this.patientInsurance.visibility = 'Internal'

      this.patientInsurance.isArchived = false;
      this.patientInsurance.patientRelation.r_address.state = this.patientInsurance.patientRelation.r_address.state.split('-')[0].trim();
      console.log(this.patientInsurance.visibility)
      this.patientService.createPatientInsurance(this.patientInsurance, this.patient.id)
        .subscribe((result: any) => {
          console.log(JSON.stringify(result))
          this.patientInsurance.assigner = result.records.assigner;
          this.patientInsurance.id = result.records.id;
          this.toastr.success("Patient insurance crteated")
          this.scrollUp();
          this.changeVisibility.emit('close');
        }, error => {
          console.log(JSON.stringify(error))
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
      this.patientInsurance.patientRelation.r_birthDate = this.patient.birthDate
    } else {
      this.patientInsurance.patientRelation = {}
      this.patientInsurance.patientRelation.r_address = {}
      this.patientInsurance.patientRelation.r_birthDate = undefined;
    }
  }
}

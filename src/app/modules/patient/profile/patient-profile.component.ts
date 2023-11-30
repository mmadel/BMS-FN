import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, first, tap } from 'rxjs';
import { Patient } from '../../model/clinical/patient';
import { Country } from '../../model/common/country';
import { Gender } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';
import { PateintEmittingService } from '../service/emitting/pateint-emitting.service';
import { PatientService } from '../service/patient.service';
import { BillingComponent } from './billing/billing.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  notValidForm: boolean = false;
  @ViewChild('patientCreationForm') patientCreationForm: NgForm;
  @ViewChild('billingComponent') billingComponent: BillingComponent;
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
  selectedTab: number = 0;
  isupdated: boolean = false;
  constructor(private patientService: PatientService
    , private toastr: ToastrService
    , private pateintEmittingService: PateintEmittingService
    , private route: ActivatedRoute
    , private router: Router) { }
  ngOnInit(): void {
    var patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.pateintEmittingService.selectedPatient$.pipe(
        filter((patient) => patient !== null),
        first()
      ).subscribe((result) => {
        this.isupdated = true;
        this.patient = result
        this.patientDOB = moment.unix(this.patient.birthDate / 1000).toDate();
      })
    } else {
      this.isupdated = false;
    }
  }
  onTabChange(event: any) {
    this.selectedTab = Number(event)
  }
  create(action?: string) {
    if (this.patientCreationForm.valid) {
      this.patient.birthDate = moment(this.patientDOB).unix() * 1000;
      this.patient.cases = this.billingComponent?.getCases();
      this.patient.referringProvider = this.billingComponent.getReferringProvider();
      this.patient.patientInsurances = this.billingComponent.getInsurances();
      this.patient.ssn = this.billingComponent.getSSN();
      this.patient.externalId = this.billingComponent.getExternalId();
      this.patientService.create(this.patient)
        .subscribe((result) => {
          if (this.isupdated)
            this.toastr.success('Patient Updated');
          else
            this.toastr.success('Patient Created');
          if (action === 'close')
            this.reset();
        }, (error) => {
          this.toastr.error('Error in Patient Created');
        })
      this.notValidForm = false
    } else {
      this.notValidForm = true;
    }
    if (action === 'close')
      this.router.navigate(['/patient/list']);
  }
  private reset() {
    this.patientCreationForm.reset();
    this.billingComponent.resetBilling();
    this.patientDOB = null;
  }
} 

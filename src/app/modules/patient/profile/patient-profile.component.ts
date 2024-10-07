import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, first, tap } from 'rxjs';
import { Patient } from '../../model/clinical/patient';
import { Country } from '../../model/common/country';
import { Gender, GenderIdentity } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';
import { Role } from '../../secuirty/model/roles';
import { PateintEmittingService } from '../service/emitting/pateint-emitting.service';
import { PatientService } from '../service/patient.service';
import { AdvancedComponent } from './advanced/advanced.component';
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
  @ViewChild('patientAdvancedComponent') patientAdvancedComponent: AdvancedComponent;
  patient: Patient
  patientDOB: Date
  genderKeys = Object.values;
  genderIdentity = Object.values;
  genders = Gender;
  gendersIdentity = GenderIdentity;
  maritalStatusKeys = Object.values;
  maritalStatuses = MaritalStatus;
  phoneTypesKeys = Object.values;
  phoneTypes = PhoneType
  countries: Country[] = Countries;
  states: string[] = States;
  selectedTab: number = 0;
  isupdated: boolean = false;
  componentRole: string[] = [Role.PATIENT_ROLE];
  constructor(private patientService: PatientService
    , private toastr: ToastrService
    , private pateintEmittingService: PateintEmittingService
    , private route: ActivatedRoute
    , private router: Router
    , private elementRef: ElementRef) { }
  ngOnInit(): void {
    var patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.patientService.findById(Number(patientId))
        .subscribe((result) => {
          this.isupdated = true;
          this.patient = result
          this.patientDOB = moment.unix(this.patient.birthDate / 1000).toDate();

        })
    } else {
      this.isupdated = false;
      this.patient = {
        gender: null,
        genderIdentity:null,
        maritalStatus: null,
        address: {
          country: null,
          state: null
        },
        phoneType: null
      }
    }
  }
  onTabChange(event: any) {
    this.selectedTab = Number(event)
  }
  close() {
    this.router.navigate(['/patient/list']);
  }
  create(action?: string) {
    if (this.patientCreationForm.valid) {
      this.patient.birthDate = moment(this.patientDOB).unix() * 1000;
      if (this.billingComponent !== undefined) {
        this.patient.cases = this.billingComponent.getCases();
        this.patient.referringProvider = this.billingComponent.getReferringProvider();
        this.patient.patientInsurances = this.billingComponent.getInsurances();
        this.patient.ssn = this.billingComponent.getSSN();
        this.patient.externalId = this.billingComponent.getExternalId();
      }
      if (this.patientAdvancedComponent !== undefined) {
        this.patient.patientAdvancedInformation = this.patientAdvancedComponent.patientAdvancedInformation;
      }
      this.patientService.create(this.patient)
        .subscribe((result: any) => {
          if (this.isupdated) {
            this.toastr.success('Patient Updated');
            if (action === 'close') {
              this.reset();
              this.router.navigate(['/patient/list']);
            }
          }
          else {
            this.toastr.success('Patient Created');
            this.router.navigate(['/patient/profile/' + result.records]);
          }

        }, (error) => {
          this.toastr.error('Error in Patient Created');
        })
      this.notValidForm = false
      this.scrollUp();
    } else {
      this.notValidForm = true;
    }

  }
  private reset() {
    this.patientCreationForm.reset();
    this.patientDOB = null;
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
} 

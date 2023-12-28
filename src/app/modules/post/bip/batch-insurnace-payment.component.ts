import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { InsuranceCompanyService } from '../../admin.tools/services/insurance.company/insurance-company.service';
import { InsuranceCompanyContainerService } from '../../Insurance/service/insurance-company-container.service';
import { InsuranceCompanyContainer } from '../../model/admin/insurance.company.container';
import { PaymentBatch } from '../../model/posting/batch.paymnet';
import { PatientService } from '../../patient/service/patient.service';
import { PostingServiceService } from '../service/posting-service.service';
import { ClientPaymentComponent } from './client/client-payment.component';
import { InsuranceCompanyPaymentComponent } from './insurance.company/insurance-company-payment.component';

@Component({
  selector: 'app-batch-insurnace-payment',
  templateUrl: './batch-insurnace-payment.component.html',
  styleUrls: ['./batch-insurnace-payment.component.scss']
})
export class BatchInsurnacePaymentComponent implements OnInit {
  @ViewChild('paymentForm') paymentForm: NgForm;
  @ViewChild('clientPayments') clientPayments: ClientPaymentComponent;
  @ViewChild('insuranceCompanyPayments') insuranceCompanyPayments: InsuranceCompanyPaymentComponent;
  notValidForm: boolean = false
  patientClient = new FormControl();
  insuranceCompanyForm = new FormControl();
  selectedSearchOption: string = "none";
  enteredClientName: string;
  filteredPatients: any;
  filteredInsuranceCompany: any;
  isLoading = false;
  isLoadingInsuranceCompany = false;
  isSearchDisable: boolean;
  selectedSearchPatientValue: any;
  selectedSearchInsuranceCompanyValue: any;
  renderedComponent: string = '';
  totalPayments: number = 0;
  totalAdjustments: number = 0;
  prevEmittedPayment: number = 0
  paymentBatch: PaymentBatch = {
    paymentMethod: null,
    receivedDate_date: new Date()
  }
  invalidServiceCode: any[]
  insuranceCompanyContainer: InsuranceCompanyContainer[]
  constructor(private patientService: PatientService
    , private insuranceCompanyService: InsuranceCompanyService
    , private postingServiceService: PostingServiceService
    , private toastr: ToastrService
    , private router: Router
    , private insuranceCompanyContainerService: InsuranceCompanyContainerService) {
  }
  ngOnInit(): void {
    this.findPatientByNameAutoComplete();
    this.findInsuranceCompanyByNameAutoComplete();

  }
  private findPatientByNameAutoComplete() {
    this.patientClient.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 0) {
            return true
          } else {
            this.filteredPatients = [];
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.enteredClientName = value;
          this.filteredPatients = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          return this.patientService.findByName(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.filteredPatients = [];
        } else {
          this.filteredPatients = data;
        }
      },
        error => {
          this.isLoading = false
        });
  }
  private findInsuranceCompanyByNameAutoComplete() {
    this.insuranceCompanyForm.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 0) {
            return true
          } else {
            this.filteredInsuranceCompany = [];
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.filteredInsuranceCompany = [];
          this.isLoadingInsuranceCompany = true;
        }),
        switchMap((value) => {
          return this.insuranceCompanyService.findByName(value)
            .pipe(
              finalize(() => {
                this.isLoadingInsuranceCompany = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.filteredInsuranceCompany = [];
        } else {
          this.filteredInsuranceCompany = data;
        }
      },
        error => {
          this.isLoadingInsuranceCompany = false
        });
  }

  changePatientValue(event: any) {
    this.selectedSearchPatientValue = event;
    this.isSearchDisable = this.selectedSearchOption !== 'none' && (this.selectedSearchPatientValue.length !== 0);
  }
  changeInsuranceCompanyValue(event: any) {
    this.selectedSearchInsuranceCompanyValue = event;
    this.isSearchDisable = this.selectedSearchOption !== 'none' && (this.selectedSearchInsuranceCompanyValue.length !== 0);
  }
  onChangePayements(event: any[]) {
    if (event[0] === 0)
      this.totalPayments = this.totalPayments + event[1];
    if (event[0] !== 0)
      this.totalPayments = this.totalPayments - event[0] + event[1];
    this.paymentBatch.totalAmount = this.totalPayments;
  }
  onChangeAdjustments(event: any[]) {
    if (event[0] === 0)
      this.totalAdjustments = this.totalAdjustments + event[1];
    if (event[0] !== 0)
      this.totalAdjustments = this.totalAdjustments - event[0] + event[1];
  }
  applyPayments() {
    if (this.clientPayments !== undefined)
      this.createClientPayment()
    if (this.insuranceCompanyPayments !== undefined)
      this.createInsuranceCompanyPayment();
  }
  createClientPayment() {
    var invalidServiceCode: any[] = this.clientPayments.constructPaymentLines(this.paymentBatch);
    if (this.paymentForm.valid && !(invalidServiceCode.length > 0) && (invalidServiceCode[0] !== -1)) {
      this.invalidServiceCode = []
      window.location.reload()
    } else {
      this.invalidServiceCode = invalidServiceCode;
      this.notValidForm = true;
    }
  }
  createInsuranceCompanyPayment() {
    var invalidServiceCode: any[] = this.insuranceCompanyPayments.constructPaymentLines(this.paymentBatch);
    if (this.paymentForm.valid && !(invalidServiceCode.length > 0) && (invalidServiceCode[0] !== -1)) {
      this.invalidServiceCode = []
      window.location.reload()
    } else {
      this.invalidServiceCode = invalidServiceCode;
      this.notValidForm = true;
    }
  }

  changeSearch() {
    if (this.selectedSearchOption === 'client') {
      this.insuranceCompanyContainerService.findInsuranceCompanyContianers()
        .subscribe((reuslt) => {
          this.insuranceCompanyContainer = reuslt;
        })
    } else {
      this.insuranceCompanyContainer = undefined;
    }
  }
}

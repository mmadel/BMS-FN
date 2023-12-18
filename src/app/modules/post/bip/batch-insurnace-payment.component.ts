import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { InsuranceCompanyService } from '../../admin.tools/services/insurance.company/insurance-company.service';
import { PaymentBatch } from '../../model/posting/batch.paymnet';
import { PaymentServiceLine } from '../../model/posting/payment.service.line';
import { PatientService } from '../../patient/service/patient.service';
import { PostingServiceService } from '../service/posting-service.service';
import { ClientPaymentComponent } from './client/client-payment.component';

@Component({
  selector: 'app-batch-insurnace-payment',
  templateUrl: './batch-insurnace-payment.component.html',
  styleUrls: ['./batch-insurnace-payment.component.scss']
})
export class BatchInsurnacePaymentComponent implements OnInit {
  @ViewChild('paymentForm') paymentForm: NgForm;
  @ViewChild('clientPayments') clientPayments: ClientPaymentComponent;
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
  selectedSearchValue: any;
  renderedComponent: string = '';
  totalPayments: number = 0;
  totalAdjustments: number = 0;
  prevEmittedPayment: number = 0
  paymentBatch: PaymentBatch = {
    paymentMethod: null,
    receivedDate_date: new Date()
  }
  invalidServiceCode: any[]
  constructor(private patientService: PatientService
    , private insuranceCompanyService: InsuranceCompanyService
    , private postingServiceService: PostingServiceService
    , private toastr: ToastrService
    , private router: Router) {
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

  changeValue(event: any) {
    this.selectedSearchValue = event;
    this.isSearchDisable = this.selectedSearchOption !== 'none' && (this.selectedSearchValue.length !== 0);
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
    this.invalidServiceCode = [];
    for (var i = 0; i < this.clientPayments.clientPayments.items.length; i++) {
      var item: any = this.clientPayments.clientPayments.items[i];
      if (item.sessionAction === null)
        this.invalidServiceCode.push(Number(item.serviceCodeId));
    }
    if (this.paymentForm.valid && this.invalidServiceCode.length === 0) {
      var clientId: number = this.filteredPatients[0].clientId;
      var paymentServiceLines: PaymentServiceLine[] = this.convertItemListToPaymentServiceLine()
      this.postingServiceService.createClientPayments(paymentServiceLines, clientId)
        .subscribe((result) => {
          this.toastr.success("Service lines payments submitted successfully")
          window.location.reload()
        }, (error) => {
          this.toastr.success("Error during submitting Service lines payments.")
        })
    } else {
      this.notValidForm = true;
    }
  }
  private convertItemListToPaymentServiceLine(): PaymentServiceLine[] {
    this.paymentBatch.receivedDate = moment(this.paymentBatch.receivedDate_date).unix() * 1000;
    this.paymentBatch.checkDate = moment(this.paymentBatch.checkDate_date).unix() * 1000;
    this.paymentBatch.depositDate = moment(this.paymentBatch.depositDate_date).unix() * 1000;
    var paymentLines: PaymentServiceLine[] = [];
    for (var i = 0; i < this.clientPayments.clientPayments.items.length; i++) {
      var item: any = this.clientPayments.clientPayments.items[i];
      var PaymentServiceLine: PaymentServiceLine = {
        sessionId: item.sessionId,
        serviceCodeId: item.serviceCodeId,
        dateOfService: item.dateOfService,
        cpt: item.cpt,
        provider: item.provider,
        billedValue: item.billedValue,
        previousPayments: item.previousPayments,
        payment: item.payment,
        prevPayment: item.prevPayment,
        adjust: item.adjust,
        prevAdjust: item.prevAdjust,
        balance: item.balance,
        sessionAction: item.sessionAction,
        paymentBatch: this.paymentBatch
      }
      paymentLines.push(PaymentServiceLine);
    }
    return paymentLines;
  }
}

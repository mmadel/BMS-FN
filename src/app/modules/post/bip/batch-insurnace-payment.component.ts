import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, debounceTime, tap, switchMap, finalize } from 'rxjs';
import { InsuranceCompanyService } from '../../admin.tools/services/insurance.company/insurance-company.service';
import { CustomDdateRanges } from '../../invoice/area/session.list/constant/custom.date.ranges';
import { PostingEmitterService } from '../../invoice/service/emitting/posting-emitter.service';
import { IsuranceCompany } from '../../model/admin/insurance.company';
import { PatientInsurance } from '../../model/clinical/patient.insurance';
import { PaymentBatch } from '../../model/posting/batch.paymnet';
import { ServiceLinePayment } from '../../patient/profile/filling/sessions/model/service.line.payment';
import { ServiceLinePaymentRequest } from '../../patient/profile/filling/sessions/model/service.line.payment.request';
import { PatientService } from '../../patient/service/patient.service';
import { ClientBatchReceiptRequest } from '../model/batch/client/client.batch.receipt.request';
import { BatchPaymentService } from '../service/batch/batch-payment.service';
import { ClientPaymentComponent } from './client/client-payment.component';
import { PostingFilterModel } from './filter/posting.filter.model';
import { InsuranceCompanyPaymentComponent } from './insurance.company/insurance-company-payment.component';

@Component({
  selector: 'app-batch-insurnace-payment',
  templateUrl: './batch-insurnace-payment.component.html',
  styleUrls: ['./batch-insurnace-payment.component.scss']
})
export class BatchInsurnacePaymentComponent implements OnInit {
  @Input() title: string
  @ViewChild('paymentForm') paymentForm: NgForm;
  @ViewChild('clientPayments') clientPayments: ClientPaymentComponent;
  @ViewChild('insuranceCompanyPayments') insuranceCompanyPayments: InsuranceCompanyPaymentComponent;
  customRanges = CustomDdateRanges.dateRnage;
  notValidForm: boolean = false
  patientClient = new FormControl();
  selectedInsuranceCompany: number = null;
  insuranceCompanyForm = new FormControl();
  selectedSearchOption: string = "none";
  enteredClientName: string;
  filteredPatients: any;
  filteredInsuranceCompany: any;
  isLoading = false;
  isLoadingInsuranceCompany = false;
  isSearchDisable: boolean;
  renderComponent: string
  renderedComponent: string = '';
  totalPayments: number = 0;
  totalAdjustments: number = 0;
  prevEmittedPayment: number = 0
  paymentBatch: PaymentBatch = {
    paymentMethod: null,
    receivedDate_date: new Date()
  }
  invalidServiceCode: any[]
  patientInsurances: PatientInsurance[]
  postingFilterModel: PostingFilterModel = {};
  constructor(private patientService: PatientService
    , private insuranceCompanyService: InsuranceCompanyService
    , private postingEmitterService: PostingEmitterService
    , private toastr: ToastrService
    , private batchPaymentService: BatchPaymentService) {
  }
  clientBatchReceiptRequest: ClientBatchReceiptRequest;
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
    this.postingFilterModel.entityId = event;
  }
  changeInsuranceCompanyValue(event: any) {
    this.postingFilterModel.entityId = event;
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
    if (this.clientPayments !== undefined) {
      this.createClientPayment()
    }
    if (this.insuranceCompanyPayments !== undefined) {
      this.createInsuranceCompanyPayment();
    }
  }
  createClientPayment() {
    var serviceLinePaymentRequest: ServiceLinePaymentRequest = this.clientPayments.constructPaymentLines(this.paymentBatch);
    serviceLinePaymentRequest.serviceLinePaymentType = 'InsuranceCompany'
    serviceLinePaymentRequest.paymentEntityId = this.selectedInsuranceCompany;
    var validateTotalPayment: boolean = this.validateTotalPayments(serviceLinePaymentRequest.serviceLinePayments);
    if (validateTotalPayment) {
      if (this.paymentForm.valid) {
        this.batchPaymentService.createBtachClientPayment(serviceLinePaymentRequest).subscribe((result: any) => {
          this.toastr.success('InsuranceCompany payment done.');
          this.renderComponent = undefined;
          this.paymentForm.reset();
          this.scrollUp();
          this.clear(0)
          this.clientBatchReceiptRequest = result
        }, error => {
          this.toastr.error('error during client payment.');
          this.scrollUp();
        })
      } else {
        this.notValidForm = true;
      }
    } else {
      this.toastr.error('Total payment not matched');
      this.scrollUp();
    }
  }
  createInsuranceCompanyPayment() {
    var serviceLinePaymentRequest: ServiceLinePaymentRequest = this.insuranceCompanyPayments.constructPaymentLines(this.paymentBatch);
    serviceLinePaymentRequest.serviceLinePaymentType = 'InsuranceCompany'
    var validateTotalPayment: boolean = this.validateTotalPayments(serviceLinePaymentRequest.serviceLinePayments);
    if (validateTotalPayment) {
      if (this.paymentForm.valid) {
        this.batchPaymentService.createBtachInsuranceCompanyPayment(serviceLinePaymentRequest).subscribe(result => {
          this.toastr.success('Insurance company payment done.');
          this.renderComponent = undefined;
          this.paymentForm.reset();
          this.clear(1)
          this.scrollUp();
        }, error => {
          this.toastr.error('error during Insurance company  payment.');
          this.scrollUp();
        })
      } else {
        this.notValidForm = true;
      }
    } else {
      this.toastr.error('Total payment not matched');
      this.scrollUp();
    }

  }
  private validateTotalPayments(serviceLinePayments: ServiceLinePayment[]): boolean {
    var totalPayments = 0
    for (var i = 0; i < serviceLinePayments.length; i++) {
      totalPayments = totalPayments + serviceLinePayments[i].payment
    }
    return totalPayments === this.paymentBatch.totalAmount;
  }
  search() {
    if (this.selectedSearchOption === 'client' && this.postingFilterModel.entityId > 0) {
      this.renderComponent = 'client'
      this.postingEmitterService.searchPostingClient$.next(this.postingFilterModel)
      this.patientService.findPatientInsuranceCompanies(this.postingFilterModel.entityId).subscribe((result: any) => {
        this.patientInsurances = result
      })
    }
    if (this.selectedSearchOption === 'insurance' && this.postingFilterModel.entityId > 0) {
      this.postingEmitterService.searchPostingInsuranceCompany$.next(this.postingFilterModel)
      this.renderComponent = 'insurance'
    }
  }
  clear(filterType: number) {
    if (filterType === 0) {
      this.selectedSearchOption = 'none';
      this.renderComponent = 'none'
    }
    if (filterType === 1) {
      this.patientClient.setValue(undefined);
      this.insuranceCompanyForm.setValue(undefined)
      this.filteredPatients = undefined;
      this.filteredInsuranceCompany = undefined;
      this.renderComponent = 'none'
    }
    this.postingFilterModel = {}
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

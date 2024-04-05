import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { InsuranceCompanyService } from '../../admin.tools/services/insurance.company/insurance-company.service';
import { CustomDdateRanges } from '../../invoice/area/session.list/constant/custom.date.ranges';
import { PostingEmitterService } from '../../invoice/service/emitting/posting-emitter.service';
import { IsuranceCompany } from '../../model/admin/insurance.company';
import { PaymentBatch } from '../../model/posting/batch.paymnet';
import { PatientService } from '../../patient/service/patient.service';
import { ClientPaymentComponent } from '../bip/client/client-payment.component';
import { PostingFilterModel } from '../bip/filter/posting.filter.model';
import { InsuranceCompanyPaymentComponent } from '../bip/insurance.company/insurance-company-payment.component';


@Component({
  selector: 'batch-template',
  templateUrl: './batch-template.component.html',
  styleUrls: ['./batch-template.component.scss']
})
export class BatchTemplateComponent implements OnInit {

  @Input() batchType: string
  @Input() title: string
  @ViewChild('paymentForm') paymentForm: NgForm;
  @ViewChild('clientPayments') clientPayments: ClientPaymentComponent;
  @ViewChild('insuranceCompanyPayments') insuranceCompanyPayments: InsuranceCompanyPaymentComponent;
  customRanges = CustomDdateRanges.dateRnage;
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
  isuranceCompany: IsuranceCompany[]
  postingFilterModel: PostingFilterModel = {};
  constructor(private patientService: PatientService
    , private insuranceCompanyService: InsuranceCompanyService
    , private postingEmitterService: PostingEmitterService) {
  }
  ngOnInit(): void {
    this.findPatientByNameAutoComplete();
    if (this.batchType === 'bip')
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
          console.log(JSON.stringify(data))
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
  // onChangePayements(event: any[]) {
  //   if (event[0] === 0)
  //     this.totalPayments = this.totalPayments + event[1];
  //   if (event[0] !== 0)
  //     this.totalPayments = this.totalPayments - event[0] + event[1];
  //   this.paymentBatch.totalAmount = this.totalPayments;
  // }
  // onChangeAdjustments(event: any[]) {
  //   if (event[0] === 0)
  //     this.totalAdjustments = this.totalAdjustments + event[1];
  //   if (event[0] !== 0)
  //     this.totalAdjustments = this.totalAdjustments - event[0] + event[1];
  // }
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
  //    window.location.reload()
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
  search() {
    if (this.selectedSearchOption === 'client' && this.postingFilterModel.entityId > 0) {
      this.renderComponent = 'client'
      this.postingEmitterService.searchPostingClient$.next(this.postingFilterModel)
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
}

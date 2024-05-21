import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CustomDdateRanges } from '../../invoice/area/session.list/constant/custom.date.ranges';
import { PostingEmitterService } from '../../invoice/service/emitting/posting-emitter.service';
import { IsuranceCompany } from '../../model/admin/insurance.company';
import { PaymentBatch } from '../../model/posting/batch.paymnet';
import { ServiceLinePayment } from '../../patient/profile/filling/sessions/model/service.line.payment';
import { ServiceLinePaymentRequest } from '../../patient/profile/filling/sessions/model/service.line.payment.request';
import { PatientService } from '../../patient/service/patient.service';
import { Role } from '../../secuirty/model/roles';
import { ClientPaymentComponent } from '../bip/client/client-payment.component';
import { PostingFilterModel } from '../bip/filter/posting.filter.model';
import { ClientBatchReceiptRequest } from '../model/batch/client/client.batch.receipt.request';
import { BatchPaymentService } from '../service/batch/batch-payment.service';

@Component({
  selector: 'app-batch-client-payment',
  templateUrl: './batch-client-payment.component.html',
  styleUrls: ['./batch-client-payment.component.scss']
})
export class BatchClientPaymentComponent implements OnInit {
  componentRole: string[] = [Role.PATIENT_ROLE, Role.BATCH_CLIENT_PAYMENT_ROLE];
  isSearch: boolean = false;
  @ViewChild('paymentForm') paymentForm: NgForm;
  @ViewChild('clientPayments') clientPayments: ClientPaymentComponent;
  customRanges = CustomDdateRanges.dateRnage;
  notValidForm: boolean = false
  patientClient = new FormControl();
  insuranceCompanyForm = new FormControl();
  selectedSearchOption: string = "none";
  enteredClientName: string;
  filteredPatients: any;
  filteredInsuranceCompany: any;
  isLoading = false;
  isSearchDisable: boolean;
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
  clientConfrimVisible: boolean;
  constructor(private patientService: PatientService
    , private postingEmitterService: PostingEmitterService
    , private toastr: ToastrService
    , private batchPaymentService: BatchPaymentService) {
  }
  clientBatchReceiptRequest: ClientBatchReceiptRequest;  
  ngOnInit(): void {
    this.findPatientByNameAutoComplete();
  }
  toggleClientConfrimVisible() {
    this.clientConfrimVisible = !this.clientConfrimVisible;
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
    this.createClientPayment()
  }
  createClientPayment() {
    var serviceLinePaymentRequest: ServiceLinePaymentRequest = this.clientPayments.constructPaymentLines(this.paymentBatch);
    serviceLinePaymentRequest.serviceLinePaymentType = 'Client'
    serviceLinePaymentRequest.paymentEntityId = this.postingFilterModel.entityId;
    var validateTotalPayment: boolean = this.validateTotalPayments(serviceLinePaymentRequest.serviceLinePayments);
    if (validateTotalPayment) {
      if (this.paymentForm.valid) {
        this.batchPaymentService.createBtachClientPayment(serviceLinePaymentRequest).subscribe((result: any) => {
          this.paymentForm.reset();
          this.scrollUp();
          this.clear()
          this.isSearch = false;
          this.clientConfrimVisible = true;
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
  private validateTotalPayments(serviceLinePayments: ServiceLinePayment[]): boolean {
    var totalPayments = 0
    for (var i = 0; i < serviceLinePayments.length; i++) {
      totalPayments = totalPayments + serviceLinePayments[i].payment
    }
    return totalPayments === this.paymentBatch.totalAmount;
  }
  search() {
    this.isSearch = true;
    this.postingEmitterService.searchPostingClient$.next(this.postingFilterModel)
  }
  clear() {
    this.patientClient.setValue(undefined);
    this.filteredPatients = undefined;
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
  export() {
    this.batchPaymentService.exportReceipt(this.clientBatchReceiptRequest).subscribe(result => {
      this.clientConfrimVisible = false;
      this.constructExportedFile(result, 'Receipt-', 'pdf')
    }, (error: any) => {
      this.clientConfrimVisible = false;
    });
  }
  constructExportedFile(response: any, fileName: string, extention: string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(response)
    a.href = objectUrl
    var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    a.download = fileName + nameDatePart + '.' + extention;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}

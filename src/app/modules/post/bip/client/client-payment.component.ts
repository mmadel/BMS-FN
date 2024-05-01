import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, map, Observable, tap } from 'rxjs';
import { PostingEmitterService } from 'src/app/modules/invoice/service/emitting/posting-emitter.service';
import { PaymentBatch } from 'src/app/modules/model/posting/batch.paymnet';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { BatchSessionServiceLinePayment } from 'src/app/modules/patient/profile/filling/sessions/model/batch.session.service.line.payment';
import { ServiceLinePaymentRequest } from 'src/app/modules/patient/profile/filling/sessions/model/service.line.payment.request';
import { EnterPaymentService } from 'src/app/modules/patient/service/session/payment/enter-payment.service';
import { PostingServiceService } from '../../service/posting-service.service';
import { PostingFilterModel } from '../filter/posting.filter.model';

@Component({
  selector: 'client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent extends ListTemplate implements OnInit {
  filter: PostingFilterModel;
  @Input() batchType: string;
  @Output() changePayments = new EventEmitter<any[]>()
  @Output() changeAdjustments = new EventEmitter<any[]>()
  @ViewChild('clientPayments') clientPayments: SmartTableComponent;
  serviceLinePayments$!: Observable<BatchSessionServiceLinePayment[]>;
  totalPayment: number = 0;
  serviceLinesPaymnet: any
  @Input() entityPaymentId: number;
  columns = [
    { key: 'id' },
    { key: 'dos', label: 'DateOfService' },
    'cpt',
    'provider',
    { key: 'charge', label: 'Billed' },
    { key: 'previousPayment', label: 'Pmts' },
    { key: 'payment', label: 'PmtAmt' },
    { key: 'adjust', label: 'Adjust' },
    { key: 'balance', label: 'Balance', _style: { width: '10%' } },
    { key: 'serviceLinePaymentAction', label: 'Session Actions', _style: { width: '20%' } },
  ];
  constructor(private postingServiceService: PostingServiceService
    , private toastr: ToastrService
    , private postingEmitterService: PostingEmitterService) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.postingEmitterService.searchPostingClient$.subscribe((emittedPostingFilter: PostingFilterModel) => {
      this.filter = emittedPostingFilter;
      switch (this.batchType) {
        case 'bc':
          this.findForClient();
          break;
        case 'bi':
          this.findForBatchInsuranceCompany();
          break;
      }
    })
  }
  private findForClient() {
    this.filter.startDate = this.filter.searchStartDate !== undefined ? moment(this.filter.searchStartDate).unix() * 1000 : undefined
    this.filter.endDate = this.filter.searchEndDate !== undefined ? moment(this.filter.searchEndDate).unix() * 1000 : undefined
    this.serviceLinePayments$ = this.postingServiceService.findClientPaymentsFilteredForBC(this.apiParams$, this.filter).pipe(
      filter((result) => result !== null),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
      }),
      map((response: any) => {
        this.serviceLinesPaymnet = response.records
        return response.records
      })
    );
  }
  private findForBatchInsuranceCompany() {
    this.filter.startDate = this.filter.searchStartDate !== undefined ? moment(this.filter.searchStartDate).unix() * 1000 : undefined
    this.filter.endDate = this.filter.searchEndDate !== undefined ? moment(this.filter.searchEndDate).unix() * 1000 : undefined
    this.serviceLinePayments$ = this.postingServiceService.findClientPaymentsFiltered(this.apiParams$, this.filter).pipe(
      filter((result) => result !== null),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
      }),
      map((response: any) => {
        this.serviceLinesPaymnet = response.records
        return response.records
      })
    );
  }

  changePaymnet(item: any) {
    var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === item.serviceLineId);
    var balance: number = _rslt.balance
    item.balance = this.calculateBalance(item.payment, item.adjust, balance)
  }
  private calculateBalance(payment: number, adjust: number, charge: number): number {

    return charge - ((payment === undefined || null ? 0 : payment) + (adjust === undefined || null ? 0 : adjust))
  }

  constructPaymentLines(paymentBatch: PaymentBatch): any {
    var invalidServiceCode: any[] = this.validate(this.clientPayments.items);
    if (!(invalidServiceCode.length > 0)) {
      return this.constructRequest(paymentBatch);
    }
    return invalidServiceCode;
  }
  private validate(items: any[]): any[] {
    var invalidServiceCode: any[] = [];
    for (var i = 0; i < items.length; i++) {
      var item: any = items[i];
      var isPaymentChanged: boolean = item.payment !== null && item.adjust
      if (item.serviceLinePaymentAction === null && isPaymentChanged)
        invalidServiceCode.push(Number(item.serviceLineId));
    }
    return invalidServiceCode
  }
  private constructRequest(paymentBatch: PaymentBatch): ServiceLinePaymentRequest {
    var serviceLinePaymentRequest: ServiceLinePaymentRequest = {};
    var filteredList: any = this.clientPayments.items.filter((item: any) => {
      return (item.payment !== null && item.adjust !== null)
    })
    serviceLinePaymentRequest.totalAmount = paymentBatch.totalAmount;
    serviceLinePaymentRequest.receivedDate =
      paymentBatch.receivedDate_date !== undefined ?
        moment(paymentBatch.receivedDate_date).unix() * 1000 : undefined

    serviceLinePaymentRequest.checkDate =
      paymentBatch.checkDate_date !== undefined ?
        moment(paymentBatch.checkDate_date).unix() * 1000 : undefined

    serviceLinePaymentRequest.depositDate =
      paymentBatch.depositDate_date !== undefined ?
        moment(paymentBatch.depositDate_date).unix() * 1000 : undefined

    serviceLinePaymentRequest.paymentMethod = paymentBatch.paymentMethod
    serviceLinePaymentRequest.serviceLinePayments = filteredList;
    return serviceLinePaymentRequest;
  }
} 

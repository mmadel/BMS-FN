import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SmartTableComponent } from '@coreui/angular-pro';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { PostingEmitterService } from 'src/app/modules/invoice/service/emitting/posting-emitter.service';
import { PaymentBatch } from 'src/app/modules/model/posting/batch.paymnet';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { BatchSessionServiceLinePayment } from 'src/app/modules/patient/profile/filling/sessions/model/batch.session.service.line.payment';
import { ServiceLinePayment } from 'src/app/modules/patient/profile/filling/sessions/model/service.line.payment';
import { ServiceLinePaymentRequest } from 'src/app/modules/patient/profile/filling/sessions/model/service.line.payment.request';
import { PateintEmittingService } from 'src/app/modules/patient/service/emitting/pateint-emitting.service';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { EnterPaymentService } from 'src/app/modules/patient/service/session/payment/enter-payment.service';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { PostingServiceService } from '../../service/posting-service.service';
import { PostingFilterModel } from '../filter/posting.filter.model';
import { PaymentLinesConstructor } from '../util/paymnet.lines.constructor';

@Component({
  selector: 'insurance-company-payment',
  templateUrl: './insurance-company-payment.component.html',
  styleUrls: ['./insurance-company-payment.component.scss']
})
export class InsuranceCompanyPaymentComponent extends ListTemplate implements OnInit {
  filter: PostingFilterModel;
  payment: number = 0;
  previouspayment: number = this.payment;
  adjust: number = 0;
  previousadjust: number = this.adjust;
  @Output() changePayments = new EventEmitter<any[]>()
  @Output() changeAdjustments = new EventEmitter<any[]>()
  insuranceCompanyPostingPayments$!: Observable<Map<string, BatchSessionServiceLinePayment[]>>;
  @ViewChildren('itemTable') children: QueryList<SmartTableComponent>;
  constructor(private postingServiceService: PostingServiceService
    , private patientService: PatientService
    , private pateintEmittingService: PateintEmittingService
    , private router: Router
    , private toastr: ToastrService
    , private postingEmitterService: PostingEmitterService
    , private enterPaymentService: EnterPaymentService) { super() }
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
  serviceLinesPaymnet: any = []
  componentRole: string[] = [Role.PAYMENT_ROLE, Role.BATCH_INSURANCE_PAYMENT_ROLE];
  @Input() entityPaymentId: number;
  ngOnInit(): void {
    this.initListComponent();
    this.postingEmitterService.searchPostingInsuranceCompany$.subscribe((emittedPostingFilter: PostingFilterModel) => {
      this.filter = emittedPostingFilter;
      this.find();
    })
  }

  find() {
    this.insuranceCompanyPostingPayments$ = this.postingServiceService.findInsuranceCompanyPayments(this.filter.entityId).pipe(
      map((response: any) => {
        var result: Map<string, BatchSessionServiceLinePayment[]> = response.records;
        for (const key in result) {
          this.serviceLinesPaymnet.push(...result[key])
        }
        return result;
      }),
    )
  }


  onFocusOutPaymnet(item: any) {
    var value: any[] = [];
    if (item.payment === item.tmpPreviousPayment) {
      return
    }
    if (this.isValidAmount(item.payment)) {
      value[1] = item.tmpPreviousPayment;
      item.tmpPreviousPayment = item.payment;
      value[0] = item.payment;
    }
    else {
      value[0] = 0;
      value[1] = item.tmpPreviousPayment;
      item.tmpPreviousPayment = 0
    }
    var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === item.serviceLineId);
    var balance: number = _rslt.balance
    item.balance = this.calculateBalance(item.payment, item.adjust, balance)
    this.changePayments.emit(value);
  }
  onFocusOutAdjust(item: any) {
    var value: any[] = [];
    if (item.adjust === item.tmpPreviousAdjust)
      return
    if (this.isValidAmount(item.adjust)) {
      value[1] = item.tmpPreviousAdjust
      item.tmpPreviousAdjust = item.adjust;
      value[0] = item.adjust;
    }
    else {
      value[0] = 0;
      value[1] = item.tmpPreviousAdjust;
      item.tmpPreviousAdjust = 0
    }
    var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === item.serviceLineId);
    var balance: number = _rslt.balance
    item.balance = this.calculateBalance(item.payment, item.adjust, balance)
    this.changeAdjustments.emit(value);
  }
  isValidAmount(amount: number): boolean {
    return amount > 0;
  }
  changePaymnet(item: any, type?: string) {
    switch (type) {
      case 'payment':
        this.changePayments.emit(item.payment)
        break;
      case 'adjust':
        this.changeAdjustments.emit(item.adjust)
        break;
    }
    var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === item.serviceLineId);
    var balance: number = _rslt.balance
    item.balance = this.calculateBalance(item.payment, item.adjust, balance)
  }
  private calculateBalance(payment: number, adjust: number, charge: number): number {

    return charge - ((payment === undefined || null ? 0 : payment) + (adjust === undefined || null ? 0 : adjust))
  }
  editClient(event: string) {
    this.patientService.findById(Number(event))
      .subscribe((result: any) => {
        this.pateintEmittingService.selectedPatient$.next(result)
        this.router.navigate(['/patient/profile', result.id]);
      })
  }
  constructPaymentLines(paymentBatch: PaymentBatch) {
    var pateintsPaymentServiceLines = {}
    var totalInvalidServiceCode: any[] = []
    var serviceLinePaymentRequest: ServiceLinePaymentRequest = this.constructRequest(paymentBatch);
    var serviceLinePayment: ServiceLinePayment[] = []
    for (var i = 0; i < this.children.length; i++) {
      var patient: string = this.children.get(i).tableFilterPlaceholder;
      var paymentServiceLine: any[] = this.children.get(i).items
      var invalidServiceCode: any[] = PaymentLinesConstructor.validate(paymentServiceLine);
      var patientId: number = Number(patient.split(',')[2])
      serviceLinePayment.push(...paymentServiceLine);
    }
    var filteredList: any = serviceLinePayment.filter((item: any) => {
      return (item.payment !== null || item.adjust !== null)
    })
    serviceLinePaymentRequest.serviceLinePayments = filteredList
    return serviceLinePaymentRequest;
  }


  private constructRequest(paymentBatch: PaymentBatch): ServiceLinePaymentRequest {
    var serviceLinePaymentRequest: ServiceLinePaymentRequest = {};
    serviceLinePaymentRequest.paymentEntityId = this.entityPaymentId;
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
    return serviceLinePaymentRequest;

  }
}

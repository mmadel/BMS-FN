import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, tap } from 'rxjs';
import { PaymentBatch } from 'src/app/modules/model/posting/batch.paymnet';
import { ClientPostingPayments } from 'src/app/modules/model/posting/client.posting.payments';
import { PaymentServiceLine } from 'src/app/modules/model/posting/payment.service.line';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PostingServiceService } from '../../service/posting-service.service';
import { PaymentLinesConstructor } from '../util/paymnet.lines.constructor';

@Component({
  selector: 'client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent extends ListTemplate implements OnInit {
  @Input() clientId: number;
  @Output() changePayments = new EventEmitter<any[]>()
  @Output() changeAdjustments = new EventEmitter<any[]>()
  @ViewChild('clientPayments') clientPayments: SmartTableComponent;
  clientPostingPayments$!: Observable<ClientPostingPayments[]>;
  totalPayment: number = 0;
  columns = [
    { key: 'id' },
    'dateOfService',
    'cpt',
    'provider',
    { key: 'billedValue', label: 'Billed' },
    { key: 'previousPayments', label: 'Pmts' },
    { key: 'payment', label: 'PmtAmt' },
    { key: 'adjust', label: 'Adjust' },
    { key: 'balance', label: 'Balance', _style: { width: '10%' } },
    { key: 'sessionAction', label: 'Session Actions', _style: { width: '20%' } },
  ];
  constructor(private postingServiceService: PostingServiceService
    , private toastr: ToastrService) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  private find() {
    this.clientPostingPayments$ = this.postingServiceService.findClientPayments(this.clientId).pipe(
      map((response: any) => { return response.records; })
    );
  }
  onChangeAdjust(event: any, item: any) {
    var adjust: number = Number(event.target.value);
    var payment: number = Number(item.payment);
    var billed: number = Number(item.billedValue);
    item.balance = Number(billed - (adjust + payment));
  }
  emitPayment(event: any, item: any) {
    var payment: number = Number(event.target.value);
    if (item.prevPayment === undefined) {
      item.prevPayment = payment;
      this.changePayments.emit([0, payment]);
    }
    if (item.prevPayment !== payment) {
      this.changePayments.emit([item.prevPayment, payment]);
    }
    item.prevPayment = payment;
    var adjust: number = Number(item.adjust);
    var billed: number = Number(item.billedValue);
    item.balance = Number(billed - (payment + adjust));
  }
  emitAdjust(event: any, item: any) {
    var adjust: number = Number(event.target.value);
    if (item.prevAdjust === undefined) {
      item.prevAdjust = adjust;
      this.changeAdjustments.emit([0, adjust]);
    }
    if (item.prevAdjust !== adjust) {
      this.changeAdjustments.emit([item.prevAdjust, adjust]);
    }
    item.prevAdjust = adjust;
    var payment: number = Number(item.payment);
    var billed: number = Number(item.billedValue);
    item.balance = Number(billed - (payment + adjust));
  }

  constructPaymentLines(paymentBatch: PaymentBatch): any[] {
    var invalidServiceCode: any[] = PaymentLinesConstructor.validate(this.clientPayments.items);
    if (!(invalidServiceCode.length > 0)) {
      var paymentLines: PaymentServiceLine[] = PaymentLinesConstructor.construct(this.clientPayments.items, paymentBatch)
      if (paymentLines.length > 0) {
        this.postingServiceService.createClientPayments(paymentLines, this.clientId)
          .subscribe((result) => {
            this.toastr.success("Service lines payments submitted successfully")
          }, (error) => {
            this.toastr.error("Error during submitting Service lines payments.")
          })
        invalidServiceCode = []
      } else {
        invalidServiceCode.push(-1);
      }
    }
    return invalidServiceCode;
  }
} 

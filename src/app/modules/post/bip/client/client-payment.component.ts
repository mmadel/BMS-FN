import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ClientPostingPayments } from 'src/app/modules/model/posting/client.posting.payments';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PostingServiceService } from '../../service/posting-service.service';

@Component({
  selector: 'client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss']
})
export class ClientPaymentComponent extends ListTemplate implements OnInit {
  @Input() clientId: number;
  clientPostingPayments$!: Observable<ClientPostingPayments[]>;
  columns = [
    'dateOfService',
    'cpt',
    'provider',
    { key: 'billedValue', label: 'Billed' },
    { key: 'previousPayments', label: 'Pmts' },
    { key: 'payment', label: 'PmtAmt' },
    { key: 'adjust', label: 'Adjust' },
    { key: 'balance', label: 'Balance', _style: { width: '10%' } },
    { key: 'sessionAction', label: 'Balance', _style: { width: '20%' } },
  ];
  constructor(private postingServiceService: PostingServiceService) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  private find() {
    this.clientPostingPayments$ = this.postingServiceService.findClientPayments(this.clientId).pipe(
      map((response: any) => { return response.records; })
    );
  }
  onChangePayment(event: any, item: any) {
    var payment: number = Number(event.target.value);
    var adjust: number = Number(item.adjust);
    var billed: number = Number(item.billedValue);
    item.balance = Number(billed - (payment + adjust));
  }
  onChangeAdjust(event: any, item: any) {
    var adjust: number = Number(event.target.value);
    var payment: number = Number(item.payment);
    var billed: number = Number(item.billedValue);
    item.balance = Number(billed - (adjust + item.payment));
  }
} 

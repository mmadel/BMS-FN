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
    { key: 'payment', label: 'PmtAmt'},
    { key: 'adjust', label: 'Adjust' },
    { key: 'balance', label: 'Balance' ,  _style: { width: '10%' } },
    { key: 'sessionAction', label: 'Balance' ,  _style: { width: '20%' } },
  ];
  constructor(private postingServiceService: PostingServiceService) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  private find() {
    this.clientPostingPayments$ = this.postingServiceService.findClientPayments(this.clientId, this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => { return response.records; })
    );

  }
} 

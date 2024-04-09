import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { PostingEmitterService } from 'src/app/modules/invoice/service/emitting/posting-emitter.service';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PostingFilterModel } from '../../bip/filter/posting.filter.model';
import { ClientBalance } from '../../model/client.balance';
import { ClientBalanceService } from '../../service/client-balance.service';

@Component({
  selector: 'finalize-charge',
  templateUrl: './finalize-charge.component.html',
  styleUrls: ['./finalize-charge.component.scss']
})
export class FinalizeChargeComponent extends ListTemplate implements OnInit {
  finalizeFilter: PostingFilterModel;
  finalizeClientBalance$!: Observable<ClientBalance[]>;
  columns = [
    {
      key: 'dos', label: 'DOS'
    },
    {
      key: 'serviceCode', label: 'Service'
    },
    {
      key: 'provider', label: 'Provider'
    },
    {
      key: 'charge', label: 'Charge'
    },
    {
      key: 'insCompanyPayment', label: 'Ins'
    },
    {
      key: 'clientPayment', label: 'Client'
    },
    {
      key: 'adjustPayment', label: 'Adj'
    },
    {
      key: 'balance', label: 'Balance'
    },
  ]
  constructor(private djdjdjd: ClientBalanceService
    , private postingEmitterService: PostingEmitterService) {
    super()
  }

  ngOnInit(): void {
    this.initListComponent();
    this.postingEmitterService.searchPostingInsuranceCompany$.subscribe((emittedPostingFilter: PostingFilterModel) => {
      this.finalizeFilter = emittedPostingFilter;
      this.find();
    })
  }
  private find() {
    this.finalizeClientBalance$ = this.djdjdjd.findfinalize(this.apiParams$, this.finalizeFilter.entityId, this.finalizeFilter)
      .pipe(
        filter((result) => result !== null),
        tap((response: any) => {
          this.totalItems$.next(response.number_of_records);
          if (response.number_of_records) {
            this.errorMessage$.next('');
          }
        }),
        map(response => {
          return response.records;
        })
      )
  }
  onselect(event:any){
      console.log(JSON.stringify(event))
  }
} 

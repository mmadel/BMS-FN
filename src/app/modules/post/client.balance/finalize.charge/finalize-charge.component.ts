import { Component, OnInit } from '@angular/core';
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
  selectedfinalizeClientBalance: ClientBalance[]
  sessionVisible:boolean
  enterPaymentVisible:boolean;
  selectedSession:any
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
    {
      key: 'actions', label: 'Actions'
    },
  ]
  constructor(private clientBalanceService: ClientBalanceService
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
    this.finalizeClientBalance$ = this.clientBalanceService.findfinalize(this.apiParams$, this.finalizeFilter.entityId, this.finalizeFilter)
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
  onselect(event: any) {
    this.selectedfinalizeClientBalance = []
    this.selectedfinalizeClientBalance.push(...event)
  }
  toggleOpenSessionVisible(){
    this.sessionVisible = !this.sessionVisible ;
  }
  toggleOpenEnterPaymentVisible(){    
    this.enterPaymentVisible=!this.enterPaymentVisible; 
  }
  changeEnterPaymentVisibility(event: any) {
    if (event === 'close') {
      this.enterPaymentVisible = false
    }
  }
  openEnterSession(item:any){
    this.selectedSession = item;
    this.enterPaymentVisible = true;
  }
} 

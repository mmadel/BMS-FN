import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { PostingEmitterService } from 'src/app/modules/invoice/service/emitting/posting-emitter.service';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { PostingFilterModel } from '../../bip/filter/posting.filter.model';
import { ClientBalance } from '../../model/client.balance';
import { ClientBalanceService } from '../../service/client-balance.service';

@Component({
  selector: 'pending-insurance',
  templateUrl: './pending-insurance.component.html',
  styleUrls: ['./pending-insurance.component.scss']
})
export class PendingInsuranceComponent extends ListTemplate implements OnInit {
  componentRole: string[] = [Role.PAYMENT_ROLE, Role.BALANCE_STATEMENT_PAYMENT_ROLE];
  pendinfFilter: PostingFilterModel;
  pendingClientBalance$!: Observable<ClientBalance[]>;
  selectedPendingClientBalance: ClientBalance[]
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
  sessionVisible: boolean
  enterPaymentVisible: boolean;
  selectedSession: any
  constructor(private clientBalanceService: ClientBalanceService,
    private postingEmitterService: PostingEmitterService,
    private patientSession: PatientSessionService) {
    super()
  }

  ngOnInit(): void {
    this.initListComponent();
    this.postingEmitterService.searchPostingInsuranceCompany$.subscribe((emittedPostingFilter: PostingFilterModel) => {
      this.pendinfFilter = emittedPostingFilter;
      this.find();
    })
  }
  public find() {
    this.pendingClientBalance$ = this.clientBalanceService.findAwaiting(this.apiParams$, this.pendinfFilter.entityId, this.pendinfFilter)
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
    this.selectedPendingClientBalance = []
    this.selectedPendingClientBalance.push(...event)
  }
  toggleOpenSessionVisible() {
    this.sessionVisible = !this.sessionVisible;
  }
  toggleOpenEnterPaymentVisible() {
    this.enterPaymentVisible = !this.enterPaymentVisible;
  }
  changeEnterPaymentVisibility(event: any) {
    if (event === 'close') {
      this.enterPaymentVisible = false
      this.find();
      this.clientBalanceService.clientPaymentUpdated$.next(1);
    }
  }
  openEnterSession(item: any) {
    this.patientSession.findSessionById(item.sessionId)
      .subscribe(result => {
        this.selectedSession = result;
        this.enterPaymentVisible = true;
      })
  }
}

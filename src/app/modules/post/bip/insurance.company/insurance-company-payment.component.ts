import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SmartTableComponent } from '@coreui/angular-pro';
import { map, Observable } from 'rxjs';
import { PaymentBatch } from 'src/app/modules/model/posting/batch.paymnet';
import { ClientPostingPayments } from 'src/app/modules/model/posting/client.posting.payments';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PateintEmittingService } from 'src/app/modules/patient/service/emitting/pateint-emitting.service';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { PostingServiceService } from '../../service/posting-service.service';

@Component({
  selector: 'insurance-company-payment',
  templateUrl: './insurance-company-payment.component.html',
  styleUrls: ['./insurance-company-payment.component.scss']
})
export class InsuranceCompanyPaymentComponent extends ListTemplate implements OnInit {
  @Input() insuranceCompanyId: number;
  @Output() changePayments = new EventEmitter<any[]>()
  @Output() changeAdjustments = new EventEmitter<any[]>()
  insuranceCompanyPostingPayments$!: Observable<Map<string, ClientPostingPayments[]>>;
  @ViewChildren('itemTable') children: QueryList<SmartTableComponent>;
  constructor(private postingServiceService: PostingServiceService
    , private patientService: PatientService
    , private pateintEmittingService: PateintEmittingService
    , private router: Router) { super() }
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
  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }

  find() {
    this.insuranceCompanyPostingPayments$ = this.postingServiceService.findInsuranceCompanyPayments(this.insuranceCompanyId).pipe(
      map((response: any) => { return response.records; }),
    )
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
  editClient(event: string) {
    this.patientService.findById(Number(event))
      .subscribe((result:any) => {
        console.log(JSON.stringify(result))
        this.pateintEmittingService.selectedPatient$.next(result)
        this.router.navigate(['/patient/profile', result.id]);
      })
  }
  constructPaymentLines(paymentBatch: PaymentBatch)  {
    this.children.forEach(ee=>{
      console.log(JSON.stringify(ee.tableFilterPlaceholder))
      console.log(JSON.stringify(ee.items))
      
    })
    return false;
  }
}

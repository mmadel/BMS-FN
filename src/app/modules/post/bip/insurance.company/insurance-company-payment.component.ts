import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ClientPostingPayments } from 'src/app/modules/model/posting/client.posting.payments';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PostingServiceService } from '../../service/posting-service.service';

@Component({
  selector: 'insurance-company-payment',
  templateUrl: './insurance-company-payment.component.html',
  styleUrls: ['./insurance-company-payment.component.scss']
})
export class InsuranceCompanyPaymentComponent extends ListTemplate  implements OnInit {
  @Input() insuranceCompanyId: number;
  insuranceCompanyPostingPayments$!: Observable<Map<string, ClientPostingPayments[]>>;
  constructor(private postingServiceService:PostingServiceService) {super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }

  find(){
    this.insuranceCompanyPostingPayments$= this.postingServiceService.findInsuranceCompanyPayments(9834).pipe(
      map((response: any) => { return response.records; })
    )
  }

}

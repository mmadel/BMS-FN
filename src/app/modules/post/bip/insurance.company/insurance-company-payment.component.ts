import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'insurance-company-payment',
  templateUrl: './insurance-company-payment.component.html',
  styleUrls: ['./insurance-company-payment.component.scss']
})
export class InsuranceCompanyPaymentComponent implements OnInit {
  @Input() insuranceCompanyId: number;
  constructor() { }

  ngOnInit(): void {
  }

}

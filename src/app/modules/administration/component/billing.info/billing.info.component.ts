import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface BillingInfo {
  businessName?: string
  firstName?: string,
  lastName?: string,
  npi?: string,
  taxId?: string,
  taxonomy?: string
  address?: string,
  addressTwo?: string,
  city?: string,
  state?: string,
  zipcode?: string,
  phone?: string
  fax?: string,
  email?: string
}
@Component({
  selector: 'billing-info',
  templateUrl: './billing.info.component.html',
  styleUrls: ['./billing.info.component.scss']
})
export class BillingInfoComponent implements OnInit {
  notValidForm: boolean = false;
  @ViewChild('billingInfoFrom') billingInfoFrom: NgForm;
  billingInfo: BillingInfo = {}
  constructor() { }

  ngOnInit(): void {

  }

}

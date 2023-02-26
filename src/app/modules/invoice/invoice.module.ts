import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';

import {
  InvoicingAreaComponent,
  InsurancePatientListComponent,
  InsuranceSessionListComponent
} from './index';



@NgModule({
  declarations: [
    InvoicingAreaComponent,
    InsurancePatientListComponent,
    InsuranceSessionListComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }

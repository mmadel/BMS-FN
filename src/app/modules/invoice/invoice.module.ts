import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { InvoiceRoutingModule } from './invoice-routing.module';

import {
  AlertModule,
  BadgeModule, ButtonGroupModule, ButtonModule,
  CardModule,
  CollapseModule, DatePickerModule, DateRangePickerModule, DropdownModule, FormModule, GridModule, ListGroupModule, ModalModule, NavModule, SharedModule, SmartPaginationModule, SmartTableModule,
  TableModule, TabsModule, TimePickerModule, TooltipModule, UtilitiesModule
} from '@coreui/angular-pro';

import { PatientModule } from '../patient';
import {
  InsurancePatientListComponent,
  InsuranceSessionListComponent,
  InvoiceCreationComponent, InvoicingAreaComponent
} from './index';



@NgModule({
  declarations: [
    InvoicingAreaComponent,
    InsurancePatientListComponent,
    InsuranceSessionListComponent,
    InvoiceCreationComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    AlertModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    SharedModule,
    SmartTableModule,
    TableModule,
    FormModule,
    DatePickerModule,
    DropdownModule,
    ButtonGroupModule,
    ListGroupModule,
    TooltipModule,
    TabsModule,
    NavModule,
    DateRangePickerModule,
    TimePickerModule,
    IconModule,
    UtilitiesModule,
    ModalModule,
    SmartPaginationModule,
    PatientModule
  ]
})
export class InvoiceModule { }

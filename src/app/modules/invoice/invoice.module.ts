import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { InvoiceRoutingModule } from './invoice-routing.module';

import {
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
  UtilitiesModule,
  ModalModule
} from '@coreui/angular-pro';

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
    ModalModule
  ]
})
export class InvoiceModule { }

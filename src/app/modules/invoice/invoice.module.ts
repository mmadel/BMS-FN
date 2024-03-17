import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { InvoiceRoutingModule } from './invoice-routing.module';

import {
  AlertModule,
  BadgeModule, ButtonGroupModule, ButtonModule,
  CardModule,
  CollapseModule, DatePickerModule, DateRangePickerModule, DropdownModule, FormModule, GridModule, ListGroupModule, ModalModule, NavModule, SharedModule, SmartPaginationModule, SmartTableModule,
  TableModule, TabsModule, TimePickerModule, TooltipModule, UtilitiesModule,
  CalloutModule
} from '@coreui/angular-pro';

import { PatientModule } from '../patient';
import {
  InsurancePatientListComponent,
  InsuranceSessionListComponent,
  InvoiceCreationComponent, InvoicingAreaComponent
} from './index';
import { SessionItemEditComponent } from './area/session.item.edit/session-item-edit.component';
import { ModelModule } from '../model/model.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    InvoicingAreaComponent,
    InsurancePatientListComponent,
    InsuranceSessionListComponent,
    InvoiceCreationComponent,
    SessionItemEditComponent,
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
    PatientModule,
    ModelModule,
    CalloutModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class InvoiceModule { }

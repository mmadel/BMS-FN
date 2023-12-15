import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { PostingRoutingModule } from './posting-routing.module';

import {
  BatchInsurnacePaymentComponent,
  ElectronicRemittanceAdviceComponent,
  PostingLinesComponent,
  PostingERAComponent
} from './index';
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
  ModalModule,
  MultiSelectModule,
  SpinnerModule,
} from '@coreui/angular-pro';
import { ModelModule } from '../model/model.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ClientPaymentComponent } from './bip/client/client-payment.component';
import { InsuranceCompanyPaymentComponent } from './bip/insurance.company/insurance-company-payment.component';

@NgModule({
  declarations: [
    BatchInsurnacePaymentComponent,
    ElectronicRemittanceAdviceComponent,
    PostingLinesComponent,
    PostingERAComponent,
    ClientPaymentComponent,
    InsuranceCompanyPaymentComponent
  ],
  imports: [
    CommonModule,
    PostingRoutingModule,
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
    ModalModule,
    ModelModule,
    AutocompleteLibModule,
    MultiSelectModule,
    SpinnerModule,
  ]
})
export class PostingModule { }

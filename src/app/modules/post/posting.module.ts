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
} from '@coreui/angular-pro';
import { ModelModule } from '../model/model.module';

@NgModule({
  declarations: [
    BatchInsurnacePaymentComponent,
    ElectronicRemittanceAdviceComponent,
    PostingLinesComponent,
    PostingERAComponent
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
    ModelModule
  ]
})
export class PostingModule { }

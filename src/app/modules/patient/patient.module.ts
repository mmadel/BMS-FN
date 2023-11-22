import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
//import patient components
import {
  PatientListComponent,
  PatientProfileComponent,
  PatientSessionComponent,
  BillingComponent,
  AuthsComponent,
  AdvancedComponent,
  FillingComponent,
  ShedulingComponent,
  BillingCodeComponent,
  SessionHistoryComponent
} from './index'

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
  TimePickerModule
} from '@coreui/angular-pro';

import { IconModule } from '@coreui/icons-angular';
import { ModelModule } from '../model/model.module';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientProfileComponent,
    PatientSessionComponent,
    BillingComponent,
    AuthsComponent,
    AdvancedComponent,
    FillingComponent,
    ShedulingComponent,
    BillingCodeComponent,
    SessionHistoryComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ModelModule,
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
    IconModule,
    TooltipModule,
    TabsModule,
    NavModule,
    DateRangePickerModule,
    TimePickerModule, 
  ]
})
export class PatientModule { }

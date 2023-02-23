import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
//import patient components
import {
  PatientListComponent,
  PatientProfileComponent,
  PatientSessionComponent,
  BillingComponent,
  AuthsComponent,
  AdvancedComponent,
  FillingComponent
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
  DateRangePickerModule
} from '@coreui/angular-pro';


import { IconModule } from '@coreui/icons-angular';
@NgModule({
  declarations: [
    PatientListComponent,
    PatientProfileComponent,
    PatientSessionComponent,
    BillingComponent,
    AuthsComponent,
    AdvancedComponent,
    FillingComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
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
    DateRangePickerModule

  ]
})
export class PatientModule { }

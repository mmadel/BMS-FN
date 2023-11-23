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
  TimePickerModule,
  ModalModule,
  MultiSelectModule,
  SpinnerModule
} from '@coreui/angular-pro';

import { IconModule } from '@coreui/icons-angular';
import { ModelModule } from '../model/model.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ViewReferringProviderComponent } from './profile/billing/referring.provider/view-referring-provider.component';
import { ViewCaseComponent } from './profile/billing/cases/view-case.component';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    SessionHistoryComponent,
    ViewReferringProviderComponent,
    ViewCaseComponent
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
    AutocompleteLibModule,
    ModalModule,
    ModelModule,
    MultiSelectModule,
    SpinnerModule
  ]
})
export class PatientModule { }

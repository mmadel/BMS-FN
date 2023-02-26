import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { InsuranceRoutingModule } from './insurance-routing.module';

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
  InsuranceListComponent,
  InsuranceSettingsModalComponent,
  GeneralSettingsComponent,
  Box33SettingsComponent,
  ClientListSettingsComponent
} from './index';



@NgModule({
  declarations: [
    InsuranceListComponent,
    InsuranceSettingsModalComponent,
    GeneralSettingsComponent,
    Box33SettingsComponent,
    ClientListSettingsComponent,
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
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
export class InsuranceModule { }

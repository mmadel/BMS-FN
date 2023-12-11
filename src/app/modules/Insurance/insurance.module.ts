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
import { EditProviderComponent } from './list/settings-modal/box33/edit.provider/edit-provider.component';
import { ModelModule } from '../model/model.module';



@NgModule({
  declarations: [
    InsuranceListComponent,
    InsuranceSettingsModalComponent,
    GeneralSettingsComponent,
    Box33SettingsComponent,
    ClientListSettingsComponent,
    EditProviderComponent,
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
    ModalModule,
    ModelModule
  ]
})
export class InsuranceModule { }

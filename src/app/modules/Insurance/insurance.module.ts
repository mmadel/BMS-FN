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
  GeneralSettingsComponent,
  Box33SettingsComponent,
  ClientListSettingsComponent
} from './index';
import { EditProviderComponent } from './list/settings-modal/box33/edit.provider/edit-provider.component';
import { ModelModule } from '../model/model.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditInternalInsuranceComponent } from './edit/edit-internal-insurance.component';



@NgModule({
  declarations: [
    InsuranceListComponent,
    GeneralSettingsComponent,
    Box33SettingsComponent,
    ClientListSettingsComponent,
    EditProviderComponent,
    EditInternalInsuranceComponent,
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
    ModelModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class InsuranceModule { }

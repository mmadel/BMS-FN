import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminToolsRoutingModule } from './admin-tools-routing.module';
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
  SmartPaginationModule
} from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ModelModule } from '../model/model.module';
import { GroupComponent } from './components/group/group.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ClinicsComponent } from './components/clinics/clinics.component';

@NgModule({
  declarations: [
    GroupComponent,
    OrganizationComponent,
    ClinicsComponent
  ],
  imports: [
    CommonModule,
    AdminToolsRoutingModule,
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
    SpinnerModule,
    SmartPaginationModule,
  ]
})
export class AdminToolsModule { }

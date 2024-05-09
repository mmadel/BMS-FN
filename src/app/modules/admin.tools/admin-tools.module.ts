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
  SmartPaginationModule,
  AccordionModule
} from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ModelModule } from '../model/model.module';
import { GroupComponent } from './components/group/group.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ClinicsComponent } from './components/clinics/clinics.component';
import { CreateFacilityComponent } from './components/clinics/create/create-facility.component';
import { ToastrModule } from 'ngx-toastr';
import { InsuranceMappingComponent } from './components/insurance.company/mapping/insurance-mapping.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AssignPayerComponent } from './components/insurance.company/mapping/payer.assign/assign-payer.component';
import { ListAccountsComponent } from './components/account/list/list-accounts.component';
import { CreateAccountComponent } from './components/account/create/create-account.component';
import { BillingRoleComponent } from './components/account/create/roles.components/billing.role/billing-role.component';

@NgModule({
  declarations: [
    GroupComponent,
    OrganizationComponent,
    ClinicsComponent,
    CreateFacilityComponent,
    InsuranceMappingComponent,
    AssignPayerComponent,
    ListAccountsComponent,
    CreateAccountComponent,
    BillingRoleComponent
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
    AccordionModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class AdminToolsModule { }

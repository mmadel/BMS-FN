import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { PostingRoutingModule } from './posting-routing.module';
import {MatTableModule} from '@angular/material/table';
import {
  BatchInsurnacePaymentComponent,
  ElectronicRemittanceAdviceComponent,
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
  SmartPaginationModule,
} from '@coreui/angular-pro';
import { ModelModule } from '../model/model.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ClientPaymentComponent } from './bip/client/client-payment.component';
import { InsuranceCompanyPaymentComponent } from './bip/insurance.company/insurance-company-payment.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BatchClientPaymentComponent } from './bcp/batch-client-payment.component';
import { ClientBalanceComponent } from './client.balance/client-balance.component';
import { FinalizeChargeComponent } from './client.balance/finalize.charge/finalize-charge.component';
import { PendingInsuranceComponent } from './client.balance/pending.insurance/pending-insurance.component';
import { ClientBalanceSettingsComponent } from './client.balance/settings/client-balance-settings.component';
import { PatientModule } from '../patient';
import { EraDetailsComponent } from './era/details/era-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatDialogModule} from '@angular/material/dialog';
import { PatientProfileDialogComponent } from './era/details/patient.profile.dialog/patient-profile-dialog.component';

@NgModule({
  declarations: [
    BatchInsurnacePaymentComponent,
    ElectronicRemittanceAdviceComponent,
    PostingERAComponent,
    ClientPaymentComponent,
    InsuranceCompanyPaymentComponent,
    BatchClientPaymentComponent,
    ClientBalanceComponent,
    FinalizeChargeComponent,
    PendingInsuranceComponent,
    ClientBalanceSettingsComponent,
    EraDetailsComponent,
    PatientProfileDialogComponent
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
    SmartPaginationModule,
    PatientModule,
    MatTableModule,
    InfiniteScrollModule,
    MatDialogModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PostingModule { }

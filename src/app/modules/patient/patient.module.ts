import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
//import patient components
import {
  PatientListComponent,
  PatientProfileComponent,

  BillingComponent,
  AuthsComponent,
  AdvancedComponent,
  FillingComponent,
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
  SpinnerModule,
  SmartPaginationModule,
  CalloutModule
} from '@coreui/angular-pro';

import { IconModule } from '@coreui/icons-angular';
import { ModelModule } from '../model/model.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ViewReferringProviderComponent } from './profile/billing/referring.provider/view-referring-provider.component';
import { ViewCaseComponent } from './profile/billing/cases/view-case.component';
import { ViewInsuranceComponent } from './profile/billing/insurance/view-insurance.component';
import { CreateInsuranceComponent } from './profile/billing/insurance/create/create-insurance.component';
import { PatientCmsComponent } from './profile/filling/cms/patient-cms.component';
import { PatientSessionCreateComponent } from './profile/filling/sessions/create/patient-session-create.component';
import { PateintSessionListComponent } from './profile/filling/sessions/list/pateint-session-list.component';
import { BillingCodeComponent } from './profile/filling/sessions/dependencies/billing/billing-code.component';
import { ShedulingComponent } from './profile/filling/sessions/dependencies/scheduling/sheduling.component';
import { SessionHistoryComponent } from './profile/filling/sessions/dependencies/history/session-history.component';
import { PatientSessionEditComponent } from './profile/filling/sessions/edit/patient-session-edit.component';
import { ServiceCodeCreateComponent } from './profile/filling/sessions/dependencies/service.code/create/service.code.create.component';
import { ServiceCodeListComponent } from './profile/filling/sessions/dependencies/service.code/list/service.code.list.component';
import { ServiceCodeEditComponent } from './profile/filling/sessions/dependencies/service.code/edit/service.code.edit.component';
import { DignosisListComponent } from './profile/filling/sessions/dependencies/dignosis.list/dignosis-list.component';
import { DaignosisCreationComponent } from './profile/filling/sessions/dependencies/dignosis.create/daignosis-creation.component';
import { CaseAddDaignosisComponent } from './profile/billing/cases/add.daignosis/case-add-daignosis.component';
import { ViewProfileComponent } from './profile.view/view-profile.component';
import { EditProfileComponent } from './profile.edit/edit-profile.component';
import { SessionBillingCodeComponent } from './profile.edit/components/session.billing.code/session-billing-code.component';
import { SessionServiceCodeListComponent } from './profile.edit/components/session.service.code.list/session-service-code-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateAuthComponent } from './profile/auths/create/create-auth.component';
import { ListAuthsComponent } from './profile/auths/list/list-auths.component';
import { EnterPaymentComponent } from './profile/filling/sessions/enter.paymnet/enter-payment.component';
import { EditPatientInsuranceComponent } from './profile.edit/components/edit.patient.insurance/edit-patient-insurance.component';
import { EditPatientCaseComponent } from './profile.edit/components/edit.patient-case/edit-patient-case.component';
import { EditPatientSessionComponent } from './profile.edit/components/edit.patient.session/edit-patient-session.component';
import { PatientSessionSchedulingComponent } from './profile.edit/components/edit.patient.session/patient.session/patient.session.scheduling/patient-session-scheduling.component';
import { PatientSessionCodingComponent } from './profile.edit/components/edit.patient.session/patient.session/patient.session.coding/patient-session-coding.component';
import { PatientSessionBillingComponent } from './profile.edit/components/edit.patient.session/patient.session/patient.session.billing/patient-session-billing.component';
import { EditPatientAuthorizationComponent } from './profile.edit/components/edit.authorization/edit-patient-authorization.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientProfileComponent,
    BillingComponent,
    AuthsComponent,
    AdvancedComponent,
    FillingComponent,
    ViewReferringProviderComponent,
    ViewCaseComponent,
    ViewInsuranceComponent,
    CreateInsuranceComponent,
    PateintSessionListComponent,
    PatientCmsComponent,
    PatientSessionCreateComponent,
    BillingCodeComponent,
    ShedulingComponent,
    SessionHistoryComponent,
    PatientSessionEditComponent,
    ServiceCodeCreateComponent,
    ServiceCodeListComponent,
    ServiceCodeEditComponent,
    ViewProfileComponent,
    DignosisListComponent,
    DaignosisCreationComponent,
    CaseAddDaignosisComponent,
    EditProfileComponent,
    SessionBillingCodeComponent,
    SessionServiceCodeListComponent,
    CreateAuthComponent,
    ListAuthsComponent,
    EnterPaymentComponent,
    EditPatientInsuranceComponent,
    EditPatientCaseComponent,
    EditPatientSessionComponent,
    PatientSessionSchedulingComponent,
    PatientSessionCodingComponent,
    PatientSessionBillingComponent,
    EditPatientAuthorizationComponent,
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
    SpinnerModule,
    SmartPaginationModule,
    CalloutModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  exports: [
    PatientSessionEditComponent,
    ViewProfileComponent,
    EditProfileComponent,
    ListAuthsComponent,
    EnterPaymentComponent
  ]

})
export class PatientModule { }

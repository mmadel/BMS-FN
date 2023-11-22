import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { ProvidersRoutingModule } from './providers-routing.module';
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
  ModalModule
} from '@coreui/angular-pro';
import {
  ListComponent,
  ReferringProviderListComponent
} from './index';
import { ReferringProviderCreateComponent } from './referring/create/referring-provider-create.component'

@NgModule({
  declarations: [
    ListComponent,
    ReferringProviderListComponent,
    ReferringProviderCreateComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule, AlertModule,
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
    ModalModule
  ]
})
export class ProvidersModule { }

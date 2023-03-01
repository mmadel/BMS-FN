import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';
import { ToolsRoutingModule } from './tools-routing.module';


//import compoenets
import {
  FeeScheduleComponent,
  CancelClaimComponent,
  ModifierRuleComponent,
  RuleCreationComponent
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
  ModalModule
} from '@coreui/angular-pro';

@NgModule({
  declarations: [
    FeeScheduleComponent,
    CancelClaimComponent,
    ModifierRuleComponent,
    RuleCreationComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
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
    ModalModule
  ]
})
export class ToolsModule { }

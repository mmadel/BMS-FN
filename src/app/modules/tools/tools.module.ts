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
  ModalModule,
  SmartPaginationModule,
  CalloutModule,
  PopoverModule} from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { CreateFeeScheduleComponent } from './fee.schedule/create/create-fee-schedule.component';
import { ModifierPipe } from './modifier.rules/pipe/modifier.pipe';

@NgModule({
  declarations: [
    FeeScheduleComponent,
    CancelClaimComponent,
    ModifierRuleComponent,
    RuleCreationComponent,
    CreateFeeScheduleComponent,
    ModifierPipe
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
    ModalModule,
    SmartPaginationModule,
    FormsModule,
    CalloutModule,
    PopoverModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class ToolsModule { }

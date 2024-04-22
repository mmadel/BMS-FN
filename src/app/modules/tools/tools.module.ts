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
  SmartPaginationModule} from '@coreui/angular-pro';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FindLinesComponent } from './fee.schedule/find.lines/find-lines.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FeeScheduleComponent,
    CancelClaimComponent,
    ModifierRuleComponent,
    RuleCreationComponent,
    FindLinesComponent
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
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class ToolsModule { }

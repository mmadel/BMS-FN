import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsFilingRoutingModule } from './cms-filing-routing.module';
import { FindHistoryComponent } from './component/list/find-history.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, CollapseModule, GridModule, SharedModule, SmartTableModule, TableModule, FormModule, DatePickerModule, DropdownModule, ButtonGroupModule, ListGroupModule, TooltipModule, TabsModule, NavModule, DateRangePickerModule, TimePickerModule, ModalModule, MultiSelectModule, SpinnerModule, SmartPaginationModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModelModule } from '../model/model.module';


@NgModule({
  declarations: [
    FindHistoryComponent
  ],
  imports: [
    CommonModule,
    CmsFilingRoutingModule,
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
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class CmsFilingModule { }

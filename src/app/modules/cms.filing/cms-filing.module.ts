import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsFilingRoutingModule } from './cms-filing-routing.module';
import { FindHistoryComponent } from './component/list/find-history.component';
import { ProgressModule, CalloutModule, AlertModule, BadgeModule, ButtonModule, CardModule, CollapseModule, GridModule, SharedModule, SmartTableModule, TableModule, FormModule, DatePickerModule, DropdownModule, ButtonGroupModule, ListGroupModule, TooltipModule, TabsModule, NavModule, DateRangePickerModule, TimePickerModule, ModalModule, MultiSelectModule, SpinnerModule, SmartPaginationModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModelModule } from '../model/model.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SessionHistoryItemComponent } from './component/item/session-history-item.component';
import { ShowActionsComponent } from './component/actions/show/show-actions.component';
import { CorrectClaimActionComponent } from './component/actions/correct.claim/correct-claim-action.component';

@NgModule({
  declarations: [
    FindHistoryComponent,
    SessionHistoryItemComponent,
    ShowActionsComponent,
    CorrectClaimActionComponent
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
    CalloutModule,
    MatPaginatorModule,
    ProgressModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class CmsFilingModule { }

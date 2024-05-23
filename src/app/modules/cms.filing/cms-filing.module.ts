import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { AlertModule, BadgeModule, ButtonGroupModule, ButtonModule, CalloutModule, CardModule, CollapseModule, DatePickerModule, DateRangePickerModule, DropdownModule, FormModule, GridModule, ListGroupModule, ModalModule, MultiSelectModule, NavModule, ProgressModule, SharedModule, SmartPaginationModule, SmartTableModule, SpinnerModule, TableModule, TabsModule, TimePickerModule, TooltipModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModelModule } from '../model/model.module';
import { PatientModule } from '../patient';
import { CmsFilingRoutingModule } from './cms-filing-routing.module';
import { CorrectClaimActionComponent } from './component/actions/correct.claim/correct-claim-action.component';
import { ShowActionsComponent } from './component/actions/show/show-actions.component';
import { SessionHistoryItemComponent } from './component/item/session-history-item.component';
import { FindHistoryComponent } from './component/list/find-history.component';

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
        PatientModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        
    ]
})
export class CmsFilingModule { }

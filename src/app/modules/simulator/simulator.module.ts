import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AlertModule,
  BadgeModule, ButtonGroupModule, ButtonModule,
  CardModule, CarouselModule, CollapseModule, DatePickerModule, DateRangePickerModule, DropdownModule, FormModule, GridModule, ListGroupModule, ModalModule,
  MultiSelectModule, NavModule, SharedModule, SmartPaginationModule, SmartTableModule, SpinnerModule, TableModule, TabsModule, TimePickerModule, TooltipModule
} from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModelModule } from '../model/model.module';
import { AddPayerComponent } from './components/add.payer/add-payer.component';
import { LandingPayerComponent } from './components/landing/landing-payer.component';
import { ViewPayersComponent } from './components/view.payers/view-payers.component';
import { SimulatorRoutingModule } from './simulator-routing.module';

@NgModule({
  declarations: [


    LandingPayerComponent,
    AddPayerComponent,
    ViewPayersComponent
  ],
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    CommonModule,
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
    ModalModule,
    ModelModule,
    MultiSelectModule,
    SpinnerModule,
    SmartPaginationModule,
    CarouselModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class SimulatorModule { }

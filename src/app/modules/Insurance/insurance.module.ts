import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';

import {
  InsuranceListComponent
} from './index'

@NgModule({
  declarations: [
    InsuranceListComponent
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule
  ]
})
export class InsuranceModule { }

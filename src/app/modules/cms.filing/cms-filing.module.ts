import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsFilingRoutingModule } from './cms-filing-routing.module';
import { FindHistoryComponent } from './component/list/find-history.component';


@NgModule({
  declarations: [
    FindHistoryComponent
  ],
  imports: [
    CommonModule,
    CmsFilingRoutingModule
  ]
})
export class CmsFilingModule { }

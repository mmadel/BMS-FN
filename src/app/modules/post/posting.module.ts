import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingRoutingModule } from './posting-routing.module';

import {
  BatchInsurnacePaymentComponent,
  ElectronicRemittanceAdviceComponent
} from './index';


@NgModule({
  declarations: [
    BatchInsurnacePaymentComponent,
    ElectronicRemittanceAdviceComponent
  ],
  imports: [
    CommonModule,
    PostingRoutingModule
  ]
})
export class PostingModule { }

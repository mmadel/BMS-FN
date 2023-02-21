import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';

import {
  ListComponent,
  ReferringProviderListComponent
} from './index'

@NgModule({
  declarations: [
    ListComponent,
    ReferringProviderListComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule
  ]
})
export class ProvidersModule { }

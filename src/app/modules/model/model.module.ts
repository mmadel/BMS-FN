import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipCodeDirective } from './directives/zip-code.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, FormModule, GridModule, SharedModule, TableModule, UtilitiesModule } from '@coreui/angular-pro';
import { ClonePipe } from './pipe/clone.pipe';
import { PhonePipe } from './pipe/phone/phone.pipe';
import { StatePipe } from './pipe/state/state.pipe';

const APP_COMMON_DIRECTIVES = [
  ZipCodeDirective
]


@NgModule({
  declarations: [
    APP_COMMON_DIRECTIVES,
    ClonePipe,
    PhonePipe,
    StatePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    SharedModule,
  ],
  exports: [
    APP_COMMON_DIRECTIVES,
    ClonePipe,
    PhonePipe,
    StatePipe,
    ReactiveFormsModule, FormsModule
  ]
})
export class ModelModule { }

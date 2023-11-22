import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipCodeDirective } from './directives/zip-code.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, FormModule, GridModule, SharedModule, TableModule, UtilitiesModule } from '@coreui/angular-pro';

const APP_COMMON_DIRECTIVES = [
  ZipCodeDirective
]


@NgModule({
  declarations: [
    APP_COMMON_DIRECTIVES
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
    ReactiveFormsModule, FormsModule
  ]
})
export class ModelModule { }

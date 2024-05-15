import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule, SharedModule } from '@coreui/angular-pro';
import { DisableInputDirective } from './directives/permissions/disable.inputs/disable-input.directive';
import { ReadonlyFormDirective } from './directives/permissions/readonly.form/readonly-form.directive';
import { ReadonlyInputDirective } from './directives/permissions/readonly.input/readonly-input.directive';
import { ZipCodeDirective } from './directives/zip-code.directive';
import { ClonePipe } from './pipe/clone.pipe';
import { PhonePipe } from './pipe/phone/phone.pipe';
import { StatePipe } from './pipe/state/state.pipe';

const APP_COMMON_DIRECTIVES = [
  ZipCodeDirective,
  ReadonlyFormDirective,
  ReadonlyInputDirective,
  DisableInputDirective,
]


@NgModule({
  declarations: [
    APP_COMMON_DIRECTIVES,
    ClonePipe,
    PhonePipe,
    StatePipe,
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

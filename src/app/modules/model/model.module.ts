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
import { DisplayInputDirective } from './directives/permissions/display.input/display-input.directive';
import { DisableDatePickerDirective } from './directives/permissions/disable.date.picker/disable-date-picker.directive';
import { DisableDateRangeDirective } from './directives/permissions/disable.date.range.picker/disable-date-range.directive';
import { DisableTimePickerDirective } from './directives/permissions/disable.time.picker/disable-time-picker.directive';
import { DisableAutoCompleteDirective } from './directives/permissions/disable.auto.complete/disable-auto-complete.directive';

const APP_COMMON_DIRECTIVES = [
  ZipCodeDirective,
  ReadonlyFormDirective,
  ReadonlyInputDirective,
  DisableInputDirective,
  DisplayInputDirective,
  DisableDatePickerDirective,
  DisableDateRangeDirective,
  DisableTimePickerDirective,
  DisableAutoCompleteDirective,
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

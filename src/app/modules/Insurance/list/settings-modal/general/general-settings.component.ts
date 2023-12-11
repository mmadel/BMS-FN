import { Component, Input, OnInit } from '@angular/core';
import { GeneralConfiguration } from '../../../model/general.configuration';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  @Input() selectedGeneralConfiguration: GeneralConfiguration;
  generalConfiguration: GeneralConfiguration;
  constructor() { }

  ngOnInit(): void {
    if (this.selectedGeneralConfiguration !== null)
      this.generalConfiguration = this.selectedGeneralConfiguration;
    else
      this.generalConfiguration = {
        box26: 'insured_primary_id',
        box32: false
      }
  }

}

import { Component, OnInit } from '@angular/core';
import { GeneralConfiguration } from '../../../model/general.configuration';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  generalConfiguration: GeneralConfiguration = {
    box26: 'insured_primary_id',
    box32: false
  }
  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit .... GeneralSettingsComponent')
  }

}

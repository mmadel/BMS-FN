import { Component, OnInit } from '@angular/core';
import { PatientAdvancedInformation } from 'src/app/modules/model/clinical/patient.advanced';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {
  patientAdvancedInformation: PatientAdvancedInformation = {
    pateintAdvancedCondtion: {
      employment: null,
      autoAccident: null,
      otherAccident: null

    },
    patientAdvancedDates: {}

  };
  constructor() { }

  ngOnInit(): void {
  }

}

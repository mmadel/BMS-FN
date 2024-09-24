import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
@Component({
  selector: 'patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.scss']
})
export class PatientSessionComponent implements OnInit {
  @Input() patient: Patient
  constructor() { }

  ngOnInit(): void {

  }

}

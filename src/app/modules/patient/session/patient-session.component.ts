import { Component, Input, OnInit } from '@angular/core';
import { PatientSession } from '../../model/clinical/session/patient.session';

@Component({
  selector: 'app-patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.scss']
})
export class PatientSessionComponent implements OnInit {
  @Input() model: PatientSession
  constructor() { }

  ngOnInit(): void {
  }

}

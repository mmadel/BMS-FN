import { Component, OnInit } from '@angular/core';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  constructor(private patientService: PatientService) { }
  public panes = [
    { name: 'Billing Info', id: 'tab-01', icon: "cil-money" },
    { name: 'Advanced', id: 'tab-02', icon: "cil-settings" },
    { name: 'Auth', id: 'tab-03', icon: "cil-task" },
    { name: 'Filling Info', id: 'tab-04', icon: "cil-paperPlane" }
  ];

  ngOnInit(): void {
  }

}

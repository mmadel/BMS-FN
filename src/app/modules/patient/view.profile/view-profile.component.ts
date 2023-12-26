import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../model/clinical/patient';

@Component({
  selector: 'view-patient-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  @Input() selectedPatient:Patient
  constructor() { }

  ngOnInit(): void {
  }

}

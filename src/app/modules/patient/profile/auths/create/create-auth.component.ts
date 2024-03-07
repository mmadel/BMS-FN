import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';

@Component({
  selector: 'create-auth',
  templateUrl: './create-auth.component.html',
  styleUrls: ['./create-auth.component.scss']
})
export class CreateAuthComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  patientAuth:PatientAuthorization={
    insCompany : []
  }
  constructor() { }

  ngOnInit(): void {
  }

  create(){
    this.changeVisibility.emit('close');
  }
}

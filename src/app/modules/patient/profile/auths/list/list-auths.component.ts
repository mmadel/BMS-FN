import { Component, Input, OnInit } from '@angular/core';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'list-auths',
  templateUrl: './list-auths.component.html',
  styleUrls: ['./list-auths.component.scss']
})
export class ListAuthsComponent implements OnInit {
  @Input() patientId: number
  patientAuthorization:PatientAuthorization[]
  selectedPatientAuthorization: PatientAuthorization;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.find(this.patientId).subscribe((result:any)=>{
      this.patientAuthorization = result;
    })
  }
  selectAuthorization(){

  }
  checkedAuth(event:any){
    this.selectedPatientAuthorization = event;
  }
}

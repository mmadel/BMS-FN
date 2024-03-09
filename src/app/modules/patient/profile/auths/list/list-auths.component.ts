import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'list-auths',
  templateUrl: './list-auths.component.html',
  styleUrls: ['./list-auths.component.scss']
})
export class ListAuthsComponent implements OnInit {
  @Input() patientId: number
  @Output() changeEditPorfileVisibility = new EventEmitter<string>()
  patientAuthorization: PatientAuthorization[]
  selectedPatientAuthorization: PatientAuthorization;
  constructor(private authService: AuthService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.find(this.patientId).subscribe((result: any) => {
      this.patientAuthorization = result;
    })
  }
  selectAuthorization() {
    this.changeEditPorfileVisibility.emit('auth')
    this.authService.selectAuthorization(this.patientId ,this.selectedPatientAuthorization.id)
    .subscribe(result=>{
      this.changeEditPorfileVisibility.emit('auth')
      this.toastr.success('Authorization selected successfully')
    })
  }
  changeAuth(event: any) {
    this.selectedPatientAuthorization = event;
  }
}

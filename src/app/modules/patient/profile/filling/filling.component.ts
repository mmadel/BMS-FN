import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { PatientSessionCreateComponent } from './sessions/create/patient-session-create.component';
import { PateintSessionListComponent } from './sessions/list/pateint-session-list.component';
@Component({
  selector: 'app-filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent implements OnInit {
  @Input() pateint: Patient;
  @ViewChild('patientSessionComponent') patientSessionComponent: PatientSessionCreateComponent;
  @ViewChild('pateintSessionListComponent') pateintSessionListComponent: PateintSessionListComponent;
  sestionFlag: string = "history";
  addSessionVisibility: boolean = false
  componentRole: string[] = [Role.PATIENT_ROLE ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onClickSessionHistory() {
    this.sestionFlag = 'history'
  }
  onClickCMS() {
    this.sestionFlag = 'cms'
  }
  onClickAttacment() {
    this.sestionFlag = ''
  }
  createSession() {
    this.toggleAddSession();
  }
  toggleAddSession() {
    this.addSessionVisibility = !this.addSessionVisibility
    if (!this.addSessionVisibility) {
      this.patientSessionComponent.clear();
    }
  }
  changeVisibility(event: any) {
    if (event === 'close'){
      this.addSessionVisibility = false;
      this.pateintSessionListComponent.find();
    }
  }
}

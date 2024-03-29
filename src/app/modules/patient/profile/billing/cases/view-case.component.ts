import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { PatientService } from '../../../service/patient.service';
import { EmitPatientSessionService } from '../../../service/session/shared/emit-patient-session.service';
import { CaseAddDaignosisComponent } from './add.daignosis/case-add-daignosis.component';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {
  @Input() patient: Patient;
  @ViewChild('caseAddDaignosisComponent') caseAddDaignosisComponent: CaseAddDaignosisComponent;
  addCaseVisibility: boolean = false
  _cases: PatientCase[]
  constructor(private emitPatientSessionService: EmitPatientSessionService
    , private patientService: PatientService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this._cases = this.patient.cases
  }
  toggleAddCaseVisibility() {
    this.addCaseVisibility = !this.addCaseVisibility
  }

  remove(index: number, patientCase: PatientCase) {
    this.patientService.deletePatietCase(patientCase.id)
      .subscribe((result) => {
        this._cases.splice(index, 1);
        this.toastr.success("successfully patient case deleted.")
        this.scrollUp();
      }, error => {
        this.toastr.error("error during create patient case.")
        this.scrollUp();
      })

  }
  edit(selectedCase: any) {

  }
  public getcases() {
    if (this._cases !== undefined && this._cases.length > 0)
      return this._cases;
    else
      return null;
  }
  public resetCases() {
    this._cases = [];
  }
  changeAddCaseVisibility(event: any) {
    if (event === 'close')
      this.addCaseVisibility = false;
  }
  createCase() {
    this.patientService.createPatientCase(this.caseAddDaignosisComponent.case, this.patient.id)
      .subscribe((reuslt) => {
        this._cases.push(this.caseAddDaignosisComponent.case)
        this.addCaseVisibility = false
        this.toastr.success("successfully patient case created.")
        this.scrollUp();
      }, error => {
        this.toastr.error("error during create patient case.")
        this.scrollUp();
      })
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}

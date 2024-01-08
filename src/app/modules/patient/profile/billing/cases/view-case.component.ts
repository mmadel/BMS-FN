import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, EMPTY, filter, finalize, switchMap, tap } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { CaseDiagnosisService } from '../../../service/case.diagnosis/case-diagnosis.service';
import { EmitPatientSessionService } from '../../../service/session/shared/emit-patient-session.service';
import { CaseAddDaignosisComponent } from './add.daignosis/case-add-daignosis.component';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {
  @Input() _cases: PatientCase[]
  @ViewChild('caseAddDaignosisComponent') caseAddDaignosisComponent: CaseAddDaignosisComponent;
  addCaseVisibility: boolean = false

  constructor(private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
  }
  toggleAddCaseVisibility() {
    this.addCaseVisibility = !this.addCaseVisibility
  }

  remove(index: number) {
    this._cases.splice(index, 1);
  }
  edit(selectedCase: any) {
    
  }
  public getcases() {
    if (this._cases !==undefined &&this._cases.length > 0)
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
    this._cases.push(this.caseAddDaignosisComponent.case)
    this.addCaseVisibility = false
  }
}

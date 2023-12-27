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
  cases: PatientCase[] = new Array();

  constructor(private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {

    this.emitPatientSessionService.createdCase$.pipe(
      filter((result) => result !== null)
    ).subscribe((result) => {
      console.log(JSON.stringify(result))
      this.cases.push(result);
    })

    this.cases.push(...this._cases)

  }
  toggleAddCaseVisibility() {
    this.addCaseVisibility = !this.addCaseVisibility
  }

  remove(index: number) {
    this.cases.splice(index, 1);
  }
  edit(selectedCase: any) {
    console.log(JSON.stringify(selectedCase))
  }
  public getcases() {
    if (this.cases.length > 0)
      return this.cases;
    else
      return null;
  }
  public resetCases() {
    this.cases = [];
  }
  changeAddCaseVisibility(event: any) {
    if (event === 'close')
      this.addCaseVisibility = false;
  }
  createCase() {
    this.cases.push(this.caseAddDaignosisComponent.case)
    this.addCaseVisibility = false
  }
}

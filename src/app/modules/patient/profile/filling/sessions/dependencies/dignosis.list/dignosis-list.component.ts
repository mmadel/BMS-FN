import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';

@Component({
  selector: 'dignosis-list',
  templateUrl: './dignosis-list.component.html',
  styleUrls: ['./dignosis-list.component.scss']
})
export class DignosisListComponent implements OnInit, OnDestroy {
  @Input() editMode?: boolean = false;
  diagnosises: CaseDiagnosis[];
  @Input() selectedDiagnosisCode?: CaseDiagnosis[];
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

    this.populateList();
  }
  pushDaignosis(daignosis: CaseDiagnosis) {
    if (this.diagnosises.length === 0)
      daignosis.primary = true
    else
      daignosis.primary = false
    this.diagnosises.push(daignosis);
    this.emitPatientSessionService.diagnosisCodes$.next(this.diagnosises.map(diagnosis => diagnosis.diagnosisCode))
  }
  private populateList() {
    if (this.selectedDiagnosisCode === undefined)
      this.emitPatientSessionService.sessionDaignosies$.pipe(
        tap((result) => {
          if (result === undefined || result === null) {
            this.diagnosises = new Array();
          }

        }),
        filter((daignosies) => (daignosies !== null)),
        filter((daignosies) => (daignosies !== undefined))
      ).subscribe((daignosies) => {
        this.diagnosises = new Array();
        for (var i = 0; i < daignosies.length; i++) {
          this.diagnosises.push(daignosies[i])
        }
        this.emitPatientSessionService.diagnosisCodes$.next(this.diagnosises.map(diagnosis => diagnosis.diagnosisCode))
      })
    else
      this.diagnosises = this.selectedDiagnosisCode
  }
}

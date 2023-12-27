import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { CaseDiagnosisService } from 'src/app/modules/patient/service/case.diagnosis/case-diagnosis.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';

@Component({
  selector: 'case-add-daignosis',
  templateUrl: './case-add-daignosis.component.html',
  styleUrls: ['./case-add-daignosis.component.scss']
})
export class CaseAddDaignosisComponent implements OnInit {
  isLoading = false;
  diagnosis?: CaseDiagnosis = {};
  filteredDiagnosis: any;
  diagnosisCtrl = new FormControl();
  case: PatientCase;
  constructor(private caseDiagnosisService: CaseDiagnosisService
    , private emitPatientSessionService: EmitPatientSessionService) { }


  ngOnInit(): void {
    this.initModel()
    this.diagnosisCtrl.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 1) {
            return true
          } else {
            this.filteredDiagnosis = [];
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.filteredDiagnosis = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          return this.caseDiagnosisService.find(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.filteredDiagnosis = [];
        } else {
          var diagnosisResponse: any = data;
          this.filteredDiagnosis = diagnosisResponse.listOfCodeName;
        }
      },
        error => {
          this.isLoading = false
        });
  }

  initModel() {
    this.diagnosisCtrl.setValue('')
    this.filteredDiagnosis = []
    this.case = {
      caseDiagnosis: []
    };
  }
  selectICD10diagnosis(event: any) {
    var diagnosis: string = event.target.value
    var code: string = diagnosis.split(',')[0]
    var desrciption: string = diagnosis.split(',')[1]
    this.diagnosis.diagnosisCode = code
    this.diagnosis.diagnosisDescription = desrciption;
  }
  addICD10diagnosis() {
    if (this.case.caseDiagnosis.length === 0)
      this.diagnosis.primary = true
    else
      this.diagnosis.primary = false
    if (Object.keys(this.diagnosis).length > 1)
      this.case.caseDiagnosis.push(this.diagnosis);
    this.diagnosis = {}
  }
}

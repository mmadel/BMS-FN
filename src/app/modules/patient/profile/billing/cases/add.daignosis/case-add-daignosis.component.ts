import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { CaseDiagnosisService } from 'src/app/modules/patient/service/case.diagnosis/case-diagnosis.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { Role } from 'src/app/modules/secuirty/model/roles';

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
  @Input() editcase: PatientCase;
  @Input() mode: string;
  componentScopes: string[] = [Role.PATIENT_ROLE ];
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
    switch (this.mode) {
      case 'create':
        this.diagnosisCtrl.setValue('')
        this.filteredDiagnosis = []
        this.case = {
          caseDiagnosis: []
        };
        break;
      case 'edit':
        this.case = this.editcase;
        break;
    }
  }
  selectICD10diagnosis(event: any) {
    var diagnosis: string = event.target.value
    var diagnosisArr = diagnosis.split(',')
    var code: string = diagnosisArr[0]
    var desrciption: string = diagnosisArr.slice(1).toString();
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
  remove(index: number){
    this.case.caseDiagnosis.splice(index, 1);
  }
}

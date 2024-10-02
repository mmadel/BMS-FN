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
  diagnosisValue: string
  diagnosisError: string = ''
  componentScopes: string[] = [Role.PATIENT_ROLE];
  @Output() changeVisibilityCaseAddDaignosis = new EventEmitter<string>()
  isICD10diagnosisSelected: boolean = false;
  constructor(private caseDiagnosisService: CaseDiagnosisService
    , private emitPatientSessionService: EmitPatientSessionService) { }


  ngOnInit(): void {
    this.initModel()
  }

  initModel() {
    switch (this.mode) {
      case 'create':
      case 'create-edit-patient-profile':
        this.case = {
          caseDiagnosis: []
        };
        break;
      case 'edit':
      case 'edit-edit-patient-profile':
        this.case = this.editcase;
        break;
    }
  }
  selectICD10diagnosis(event: any) {
    console.log(event.target.value);
    this.prepareICD10diagnosis(event.target.value)
    this.isICD10diagnosisSelected = true;
  }
  addICD10diagnosis() {
    if(!this.isICD10diagnosisSelected)
    this.prepareICD10diagnosis(this.filteredDiagnosis[0].flat().map(item => `${item}`).join(", "));
    if (this.case.caseDiagnosis.length === 0)
      this.diagnosis.primary = true
    else
      this.diagnosis.primary = false
    if (Object.keys(this.diagnosis).length > 1)
      this.case.caseDiagnosis.push(this.diagnosis);
    this.diagnosis = {}
  }
  remove(index: number) {
    this.case.caseDiagnosis.splice(index, 1);
  }
  private prepareICD10diagnosis(selectedDiagnosis: any) {
    var diagnosis: string = selectedDiagnosis
    var diagnosisArr = diagnosis.split(',')
    var code: string = diagnosisArr[0]
    var desrciption: string = diagnosisArr.slice(1).toString();
    this.diagnosis.diagnosisCode = code
    this.diagnosis.diagnosisDescription = desrciption;
  }
  search() {
    this.caseDiagnosisService.find(this.diagnosisValue).subscribe(data => {
      this.filteredDiagnosis = []
      if (data !== undefined) {
        var diagnosisResponse: any = data;
        this.filteredDiagnosis = diagnosisResponse.listOfCodeName;
        this.isICD10diagnosisSelected = false;
      }
    },error=>{
      console.log(error)
    })
  }
  createOrUpdate() {
    this.changeVisibilityCaseAddDaignosis.emit('close');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { CaseDiagnosisService } from '../../service/case-diagnosis.service';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {
  addCaseVisibility: boolean = false
  diagnosisCtrl = new FormControl();
  filteredDiagnosis: any;
  isLoading = false;
  cases: PatientCase[] = new Array();
  case: PatientCase = {
    caseDiagnosis: []
  };
  constructor(private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {

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
  toggleAddCaseVisibility() {
    this.addCaseVisibility = !this.addCaseVisibility
    this.clear();
  }
  clear() {
    this.case = {
      caseDiagnosis: []
    };
    this.diagnosisCtrl.setValue('')
    this.filteredDiagnosis = []
  }
  addCase() {
    this.cases.push(this.case)
    this.toggleAddCaseVisibility();
  }
  remove(index: number) {
    this.cases.splice(index, 1);
  }
  edit(selectedCase: any) {
    console.log(JSON.stringify(selectedCase))
  }
  addICD10diagnosis(diagnosis: any) {
    diagnosis.forEach((element: string) => {
      var code: string = element.split(',')[0]
      var desrciption: string = element.split(',')[1]
      const exists: boolean = this.case.caseDiagnosis?.findIndex(element => element.diagnosisCode === code) > -1;
      this.case.caseDiagnosis.push({
        diagnosisCode: code,
        diagnosisDescription: desrciption
      })
    });
  }
  public getcases() {
    return this.cases;
  }
  public resetCases(){
    this.case = null;
    this.cases = null;
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { CaseDiagnosisService } from 'src/app/modules/patient/service/case.diagnosis/case-diagnosis.service';
import { BillingCode } from '../../model/billing.code';

@Component({
  selector: 'daignosis-creation',
  templateUrl: './daignosis-creation.component.html',
  styleUrls: ['./daignosis-creation.component.scss']
})
export class DaignosisCreationComponent implements OnInit {
  isLoading = false;
  diagnosisCode?: CaseDiagnosis = {};
  filteredDiagnosis: any;
  diagnosisCtrl = new FormControl();
  diagnosisValue: string
  diagnosisError: string = ''
  @Output() onCreateDaignosis = new EventEmitter<CaseDiagnosis>()
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
  addICD10diagnosis(event: any) {
    var diagnosis: string = event.target.value
    var diagnosisArr = diagnosis.split(',')
    var code: string = diagnosisArr[0]
    var desrciption: string = diagnosisArr.slice(1).toString();
    this.diagnosisCode.diagnosisCode = code
    this.diagnosisCode.diagnosisDescription = desrciption;
  }
  pushDaignosis() {
    this.onCreateDaignosis.emit(this.diagnosisCode);
  }
  search() {
    this.caseDiagnosisService.find(this.diagnosisValue).subscribe(data => {
      if (data !== undefined) {
        var diagnosisResponse: any = data;
        this.filteredDiagnosis = diagnosisResponse.listOfCodeName;
      }
    })
  }
}

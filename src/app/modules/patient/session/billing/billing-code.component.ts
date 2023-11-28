import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { CaseDiagnosisService } from '../../profile/service/case-diagnosis.service';
import { BillingCode } from '../model/billing.code';

@Component({
  selector: 'app-billing-code',
  templateUrl: './billing-code.component.html',
  styleUrls: ['./billing-code.component.scss']
})
export class BillingCodeComponent implements OnInit {
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  @Input() billingCode: BillingCode
  diagnosisCtrl = new FormControl();
  isLoading = false; case: PatientCase = {
    caseDiagnosis: []
  };
  filteredDiagnosis: any = new Array()
  constructor(private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {
    if (this.billingCode.diagnosisCode !== null) {
      this.diagnosisCtrl.setValue(this.billingCode.diagnosisCode.diagnosisCode)
      this.filteredDiagnosis.push(this.billingCode.diagnosisCode.diagnosisDescription)
    }

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
  addICD10diagnosis(diagnosis: any) {
    diagnosis.forEach((element: string) => {
      var code: string = element.split(',')[0]
      var desrciption: string = element.split(',')[1]
      const exists: boolean = this.case.caseDiagnosis?.findIndex(element => element.diagnosisCode === code) > -1;
      if (!exists || this.case.caseDiagnosis.length === 0) {
        this.case.caseDiagnosis.push({
          diagnosisCode: code,
          diagnosisDescription: desrciption
        })
      }

    });
  }
}

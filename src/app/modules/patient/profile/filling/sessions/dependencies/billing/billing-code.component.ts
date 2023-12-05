import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { CaseDiagnosisService } from '../../../../../service/case.diagnosis/case-diagnosis.service';
import { BillingCode } from '../../model/billing.code';
import { ServiceCodeListComponent } from '../service.code/list/service.code.list.component';


@Component({
  selector: 'patient-session-billing-code',
  templateUrl: './billing-code.component.html',
  styleUrls: ['./billing-code.component.scss']
})
export class BillingCodeComponent implements OnInit {
  billingCode: BillingCode
  @ViewChild('billingcodeForm') billingcodeForm: NgForm;
  @ViewChild('serviceCodeListComponent') serviceCodeListComponent: ServiceCodeListComponent;
  notValidForm: boolean = false;
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  diagnosisCtrl = new FormControl();
  isLoading = false;
  filteredDiagnosis: any;
  unitCount: number;
  chargeCount: number;
  serviceCodeVisibility: boolean

  constructor(private caseDiagnosisService: CaseDiagnosisService) { }

  ngOnInit(): void {
    this.billingCode = {
      placeOfCode: null,
      facility: null,
    }
    this.selectICD10diagnosis();
  }
  selectICD10diagnosis() {
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
    var code: string = diagnosis.split(',')[0]
    var desrciption: string = diagnosis.split(',')[1]
    this.billingCode.diagnosisCode = {
      diagnosisCode: code,
      diagnosisDescription: desrciption
    }
  }
  toggleserviceCode() {
    this.serviceCodeVisibility = !this.serviceCodeVisibility
  }
  getCreatedServiceCode(createdServiceCode: ServiceCode) {
    this.serviceCodeVisibility = false;
    this.serviceCodeListComponent.pushServiceCode(createdServiceCode);
  }
  getServiceCodes(){
    return this.serviceCodeListComponent.getServiceCodes();
  }
}

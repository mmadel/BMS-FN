import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ProviderInfo } from 'src/app/modules/model/clinical/provider/provider.info';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionHistory } from 'src/app/modules/model/clinical/session/patient.session.history';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';

import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';
import { BillingCode } from '../model/billing.code';
import { SessionScheduling } from '../model/session.scheduling';

@Component({
  selector: 'app-patient-session-edit',
  templateUrl: './patient-session-edit.component.html',
  styleUrls: ['./patient-session-edit.component.scss']
})
export class PatientSessionEditComponent implements OnInit {
  ngOnDestroy() {
    
  }
  @Input() model: PatientSession
  sessionScheduling: SessionScheduling
  notValidForm: boolean = false;
  billingCode: BillingCode
  patientSessionHistory: PatientSessionHistory[]
  sessionModel: string = 'edit';
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  diagnosisCtrl = new FormControl();
  isLoading = false;
  filteredDiagnosis: any;
  unitCount: number;
  chargeCount: number;
  providerList: ProviderInfo[] = new Array();
  selectedServiceLine: ServiceCode;
  editServiceLineVisibility: boolean = false
  constructor() { }

  ngOnInit(): void {
    this.populate();
    this.countChargeUnit();
    
  }
  private populate() {
    this.populateSessionScheduling();
    this.populateBillingCode();
    this.populateSessionHistory();
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
  toggleEditServiceLine(serviceLine: ServiceCode, index: number) {
    if (serviceLine !== null) {
      serviceLine.id = index
      this.selectedServiceLine = serviceLine
    } else {
      this.selectedServiceLine = {
        id: null,
        cptCode: {},
        type: null,
        caseDiagnosis: []

      }
    }
    this.editServiceLineVisibility = !this.editServiceLineVisibility
  }
  private populateSessionScheduling() {
    this.sessionScheduling = {
      clientName: this.model.patientInfo.patientLastName + ',' + this.model.patientInfo.patientFirstName,
      provider: this.model.doctorInfo.doctorLastName + ',' + this.model.doctorInfo.doctorFirstName,
      serviceDate: moment.unix(this.model.serviceDate / 1000).toDate(),
      startTime: moment.unix(this.model.serviceStartTime / 1000).toDate(),
      endTime: moment.unix(this.model.serviceEndTime / 1000).toDate(),
    }

  }

  private populateBillingCode() {
    this.billingCode = {
      placeOfCode: this.model.placeOfCode,
      facility: this.model.clinicInfo.clinicName,
      diagnosisCode: this.model.caseDiagnosis[0],
      ServiceCodes: this.model.serviceCodes
    }
  }

  populateSessionHistory() {
    this.patientSessionHistory = new Array();
  }
  removeSergiceCode(index: number) {
    this.billingCode.ServiceCodes.splice(index, 1);
    this.countChargeUnit();
  }
  countChargeUnit() {
    this.unitCount = 0
    this.chargeCount = 0
    for (var i = 0; i < this.billingCode.ServiceCodes.length; i++) {
      var serviceLine: ServiceCode = this.billingCode.ServiceCodes[i];
      this.unitCount = this.unitCount + Number(serviceLine.cptCode.unit);
      this.chargeCount = this.chargeCount + Number(serviceLine.cptCode.charge);
    }
  }
}

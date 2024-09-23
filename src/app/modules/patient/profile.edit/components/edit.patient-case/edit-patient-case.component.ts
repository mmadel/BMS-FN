import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientCase } from 'src/app/modules/model/clinical/patient.case';
import { CaseAddDaignosisComponent } from '../../../profile/billing/cases/add.daignosis/case-add-daignosis.component';
import { Operation } from '../../enum/operation';
interface Patientcases {
  operation: Operation,
  patientInsurance: PatientCase
}
@Component({
  selector: 'edit-patient-case',
  templateUrl: './edit-patient-case.component.html',
  styleUrls: ['./edit-patient-case.component.scss']
})
export class EditPatientCaseComponent implements OnInit {
  @ViewChild('caseAddDaignosisComponent') caseAddDaignosisComponent: CaseAddDaignosisComponent;
  @Input() patient?: Patient
  addPatientCaseVisibility: boolean = false;
  editPatientCaseVisibility: boolean;
  selectedPatientCase: PatientCase;
  patientInsurances: Patientcases[] = []
  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.addPatientCaseVisibility = true;
  }
  edit(patientCase: PatientCase) {
    this.editPatientCaseVisibility = true;
    this.selectedPatientCase = patientCase;
  }
  remove(index: number) {
    this.patient.cases.splice(index, 1);
  }
  toggleVisibility(entity_name: string) {
    switch (entity_name) {
      case 'create-case':
        this.addPatientCaseVisibility = !this.addPatientCaseVisibility
        break;
      case 'edit-case':
        this.editPatientCaseVisibility = !this.editPatientCaseVisibility
        break;
    }
  }
  createPatientCaseChangeVisibility(event: any) { }

  editPatientCaseChangeVisibility(event: any) { }
}

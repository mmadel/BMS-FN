import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { CreateInsuranceComponent } from '../../../profile/billing/insurance/create/create-insurance.component';
import { Operation } from '../../enum/operation';

export interface PatientInsurances {
  operation: Operation,
  patientInsurance: PatientInsurance
}
@Component({
  selector: 'edit-patient-insurance',
  templateUrl: './edit-patient-insurance.component.html',
  styleUrls: ['./edit-patient-insurance.component.scss']
})
export class EditPatientInsuranceComponent implements OnInit {
  @ViewChild('createInsuranceComponent') createInsuranceComponent: CreateInsuranceComponent;
  @Input() patient?: Patient
  addPatientInsuranceVisibility: boolean = false;
  editPatientInsuranceVisibility: boolean;
  selectedPatientInsurance: PatientInsurance;
  patientInsurances: PatientInsurances[] = []
  constructor() { }

  ngOnInit(): void {
  }
  add() {
    this.addPatientInsuranceVisibility = true;
  }
  edit(patientInsurance: PatientInsurance) {
    this.editPatientInsuranceVisibility = true;
    this.selectedPatientInsurance = patientInsurance;
  }
  remove(index: number) {
    var deleted: PatientInsurance = this.patient.patientInsurances[index];
    this.patient.patientInsurances.splice(index, 1);
    this.updatePatientInsurances(Operation.delete, deleted)
  }
  toggleVisibility(entity_name: string) {
    switch (entity_name) {
      case 'create-insurance':
        this.addPatientInsuranceVisibility = !this.addPatientInsuranceVisibility
        break;
      case 'edit-insurance':
        this.editPatientInsuranceVisibility = !this.editPatientInsuranceVisibility
        break;
    }
  }
  createPatientInsuranceChangeVisibility(event: any) {
    if (event === 'close') {
      this.addPatientInsuranceVisibility = false;
      this.patient.patientInsurances.push(this.createInsuranceComponent.patientInsurance)
      this.updatePatientInsurances(Operation.create, this.createInsuranceComponent.patientInsurance)
    }
  }
  editPatientInsuranceChangeVisibility(event: any) {
    if (event === 'close') {
      this.editPatientInsuranceVisibility = false;
      this.patient.patientInsurances = this.patient.patientInsurances
        .filter(insurance => insurance.id !== this.createInsuranceComponent.patientInsurance.id);
      this.patient.patientInsurances.push(this.createInsuranceComponent.patientInsurance)
      this.updatePatientInsurances(Operation.update, this.createInsuranceComponent.patientInsurance)
    }
  }
  private updatePatientInsurances(operation: Operation, patientInsurance: PatientInsurance) {
    this.patientInsurances.push({
      operation: operation,
      patientInsurance: patientInsurance
    })
  }
}

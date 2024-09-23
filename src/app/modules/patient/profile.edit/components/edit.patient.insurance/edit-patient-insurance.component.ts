import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { CreateInsuranceComponent } from '../../../profile/billing/insurance/create/create-insurance.component';

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
    this.patient.patientInsurances.splice(index, 1);
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
    }
  }
}

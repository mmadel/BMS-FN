import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { CreateInsuranceComponent } from './create/create-insurance.component';

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrls: ['./view-insurance.component.scss']
})
export class ViewInsuranceComponent implements OnInit {
  @ViewChild('createInsuranceComponent') createInsuranceComponent: CreateInsuranceComponent;
  addInsuranceVisibility: boolean = false;
  patientInsurances: PatientInsurance[] = new Array();
  constructor() { }

  ngOnInit(): void {
    this.patientInsurances.push({
      isArchived: false,
      patientInsurancePolicy: {
        responsability: '3333',
        primaryId: '4949944',
      }
    })
  }
  toggleAddInsuranceVisibility() {
    this.addInsuranceVisibility = !this.addInsuranceVisibility;
  }
  changeVisibility(event: any) {
    console.log(JSON.stringify(this.createInsuranceComponent.patientInsurance))
    var createdInsurance: PatientInsurance = Object.create(this.createInsuranceComponent.patientInsurance);
    this.patientInsurances.push(createdInsurance);
    if (event === 'close') {
      this.addInsuranceVisibility = false;
    }
  }
  remove(index: number) {
    this.patientInsurances.splice(index, 1);
  }
}

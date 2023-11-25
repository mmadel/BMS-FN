import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { CreateInsuranceComponent } from './create/create-insurance.component';

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrls: ['./view-insurance.component.scss']
})
export class ViewInsuranceComponent implements OnInit {
  @ViewChild('createInsuranceComponent') createInsuranceComponent: CreateInsuranceComponent;
  @Input()patient:Patient
  addInsuranceVisibility: boolean = false;
  patientInsurances: PatientInsurance[] = new Array();
  constructor() { }

  ngOnInit(): void {
    // this.patientInsurances.push({
    //   isArchived: false,
    //   patientInsurancePolicy: {
    //     responsability: 'Primary',
    //     planType : "company insurance type A",
    //     primaryId: '4949944',
    //   }
    // })
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

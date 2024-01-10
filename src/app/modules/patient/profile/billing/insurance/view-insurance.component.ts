import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { PatientService } from '../../../service/patient.service';
import { CreateInsuranceComponent } from './create/create-insurance.component';

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrls: ['./view-insurance.component.scss']
})
export class ViewInsuranceComponent implements OnInit {
  @ViewChild('createInsuranceComponent') createInsuranceComponent: CreateInsuranceComponent;
  @Input() patient: Patient
  addInsuranceVisibility: boolean = false;
  patientInsurances: PatientInsurance[] = new Array();
  constructor(private patientService: PatientService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.patientInsurances = this.patient.patientInsurances
  }
  toggleAddInsuranceVisibility() {
    this.addInsuranceVisibility = !this.addInsuranceVisibility;
  }
  changeVisibility(event: any) {
    var createdInsurance: PatientInsurance = this.createInsuranceComponent.patientInsurance;
    this.patientInsurances.push(createdInsurance);
    if (event === 'close') {
      this.addInsuranceVisibility = false;
    }
  }
  remove(index: number, toBeDelete: PatientInsurance) {
    this.patientService.deletePatientInsurance(toBeDelete.id, toBeDelete.visibility)
    .subscribe((result) => {
      this.patientInsurances.splice(index, 1);
      this.toastr.success("Patient insurance deleted")
      this.scrollUp();
    }, error => {
      this.toastr.error("Error during deleting patient insurance delete")
      this.scrollUp();
    })
  }
  getInsurances() {
    if (this.patientInsurances !== undefined && this.patientInsurances.length > 0)
      return this.patientInsurances;
    else
      return null;
  }
  reset() {
    this.createInsuranceComponent?.insuranceCreateForm.reset();
    this.patientInsurances = []
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}

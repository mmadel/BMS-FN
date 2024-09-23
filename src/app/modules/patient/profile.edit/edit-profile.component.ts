import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../model/clinical/patient';
import { Country } from '../../model/common/country';
import { Gender } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';
import { PatientService } from '../service/patient.service';
import { EditPatientInsuranceComponent } from './components/edit.patient.insurance/edit-patient-insurance.component';

@Component({
  selector: 'patient-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() patient: Patient = {}
  genders = Gender;
  genderKeys = Object.values;
  maritalStatuses = MaritalStatus;
  maritalStatusKeys = Object.values;
  phoneTypes = PhoneType
  phoneTypesKeys = Object.values;
  countries: Country[] = Countries;
  states: string[] = States;
  patientDOB: Date


  @ViewChild('editPatientInsuranceComponent') editPatientInsuranceComponent: EditPatientInsuranceComponent;
  constructor(private patientService: PatientService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.patientDOB = moment.unix(this.patient.birthDate / 1000).toDate();
  }
  update() {
    //   this.patientService.create(this.patient)
    //     .subscribe((result) => {
    //       this.toastr.success('Patient updated')
    //     })
    console.log(JSON.stringify(this.editPatientInsuranceComponent.patientInsurances))
  }
}

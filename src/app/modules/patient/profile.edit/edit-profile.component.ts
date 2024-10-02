import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../model/clinical/patient';
import { UpdatePatientProfile } from '../../model/clinical/update.profile/update.patient.profile';
import { Country } from '../../model/common/country';
import { Gender, GenderIdentity } from '../../model/enum/geneder';
import { MaritalStatus } from '../../model/enum/marital.status';
import { PhoneType } from '../../model/enum/phone.type';
import { Countries } from '../../model/lookups/country-data-store';
import { States } from '../../model/lookups/state-data-store';
import { PatientService } from '../service/patient.service';
import { EditPatientCaseComponent } from './components/edit.patient-case/edit-patient-case.component';
import { EditPatientInsuranceComponent } from './components/edit.patient.insurance/edit-patient-insurance.component';
import { EditPatientSessionComponent } from './components/edit.patient.session/edit-patient-session.component';

@Component({
  selector: 'patient-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() patient: Patient = {}
  genders = Gender;
  genderKeys = Object.values;
  gendersIdentity = GenderIdentity;
  genderIdentity = Object.values;
  maritalStatuses = MaritalStatus;
  maritalStatusKeys = Object.values;
  phoneTypes = PhoneType
  phoneTypesKeys = Object.values;
  countries: Country[] = Countries;
  states: string[] = States;
  patientDOB: Date
  @ViewChild('editPatientInsuranceComponent') editPatientInsuranceComponent: EditPatientInsuranceComponent;
  @ViewChild('editPatientCaseComponent') editPatientCaseComponent: EditPatientCaseComponent;
  @ViewChild('editPatientSessionComponent') editPatientSessionComponent: EditPatientSessionComponent;
  @Output() changeEditProfileVisibility = new EventEmitter<string>()
  constructor(private patientService: PatientService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.patientDOB = moment.unix(this.patient.birthDate / 1000).toDate();
  }
  update() {
    console.log(JSON.stringify(this.patient))
    var updatePatientProfile: UpdatePatientProfile = {
      insurances: this.editPatientInsuranceComponent.patientInsurances,
      cases: this.editPatientCaseComponent.patientcases,
      sessions: this.editPatientSessionComponent.patientSessions,
      patient: this.patient
    }
    this.patientService.update(updatePatientProfile).subscribe(result => {
      this.changeEditProfileVisibility.emit('profile');
      this.scrollUp();
      this.toastr.success("pateint profile updated")
    }, error => {
      console.log(error)
      this.scrollUp();
      this.toastr.error("Error during update patient profile")
    })
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

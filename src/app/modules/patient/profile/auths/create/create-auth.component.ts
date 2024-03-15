import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'create-auth',
  templateUrl: './create-auth.component.html',
  styleUrls: ['./create-auth.component.scss']
})
export class CreateAuthComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  @Input() patientInsurances?: PatientInsurance[];
  @Input() patientId: number
  @Input() updatedModel: PatientInsurance
  selectedInsuranceCompany: string[];
  patientAuth: PatientAuthorization = {
    insCompany: []
  }
  insCpmanyName: string[];
  constructor(private authService: AuthService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.updatedModel !== undefined)
      this.fillModel();
    this.insCpmanyName = this.patientInsurances.map(inComp => inComp.insuranceCompany[0]);
  }
  fillModel() {
    this.patientAuth = this.updatedModel;
    this.pickInsCompany(this.patientAuth.insCompany[1])
  }
  create() {
    this.patientAuth.insCompany = this.selectedInsuranceCompany;
    this.patientAuth.startDateNumber = this.patientAuth.startDate !== undefined ? moment(this.patientAuth.startDate).unix() * 1000 : undefined
    this.patientAuth.expireDateNumber = this.patientAuth.expireDate !== undefined ? moment(this.patientAuth.expireDate).unix() * 1000 : undefined
    this.authService.create(this.patientAuth).subscribe(result => {
      this.toastr.success('Patient Authorization created');
      this.changeVisibility.emit('close');
      this.scrollUp();
    }, (error) => {
      this.toastr.error('Error  during Add Patient Authorization');
    })
  }
  update() {
    this.authService.update(this.patientAuth).subscribe(result => {
      this.toastr.success('Patient Authorization created');
      this.changeVisibility.emit('close');
      this.scrollUp();
    })
  }
  pickInsCompany(selectedInsCompany) {
    this.patientInsurances.forEach(patientInsurance => {
      if (patientInsurance.insuranceCompany[0] === selectedInsCompany) {
        this.selectedInsuranceCompany = patientInsurance.insuranceCompany;
      }
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

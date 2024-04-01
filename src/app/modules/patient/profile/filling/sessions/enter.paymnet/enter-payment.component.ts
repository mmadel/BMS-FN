import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';

@Component({
  selector: 'enter-payment',
  templateUrl: './enter-payment.component.html',
  styleUrls: ['./enter-payment.component.scss']
})
export class EnterPaymentComponent implements OnInit {
  @Input() session: any;
  DOS: string;
  client: string;
  provider: string;
  totalUnits:number;
  totalCharge:number
  constructor() { }

  ngOnInit(): void {
    this.populateDate();
    this.calculateNumbers();
  }
  private populateDate() {
    this.DOS = moment.unix(this.session.data.serviceDate / 1000).format('MM/DD/YYYY')
    this.client = this.session.data.patientName;
    this.provider = this.session.data.doctorInfo.doctorLastName + ',' + this.session.data.doctorInfo.doctorFirstName
  }
  private calculateNumbers() {
    this.totalUnits = 0;
    this.totalCharge = 0;
    let totalPmt = 0;
    let totalAdj = 0;
    this.session.serviceCodes
    for (const obj of this.session.data.serviceCodes) {
      this.totalUnits += obj.cptCode.unit;
      this.totalCharge += obj.cptCode.charge;
  }
  }
}

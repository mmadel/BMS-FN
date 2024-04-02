import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { EnterPaymentService } from 'src/app/modules/patient/service/session/payment/enter-payment.service';
import { ServiceLinePayment } from '../model/service.line.payment';
import { ServiceLinePaymentRequest } from '../model/service.line.payment.request';

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
  totalUnits: number;
  totalCharge: number
  totalPmt: number;
  totalAdj: number
  totalBalance: number
  columns = [
    { key: 'balance', label: 'balance' },
    { key: 'payment', label: 'New Pmt' },
    { key: 'adjust', label: 'New Adj' },
    { key: 'pmt_description', label: 'Pmt Description' },
    { key: 'sessionAction', label: 'Session Actions', },
  ];
  serviceLinePaymentRequest: ServiceLinePaymentRequest = {
    serviceLinePaymentType: null,
    serviceLinePayments: []
  }
  constructor(private enterPaymentService: EnterPaymentService) { }

  ngOnInit(): void {
    this.fetchPayment();
  }
  private populateDate() {
    this.DOS = moment.unix(this.session.data.serviceDate / 1000).format('MM/DD/YYYY')
    this.client = this.session.data.patientName;
    this.provider = this.session.data.doctorInfo.doctorLastName + ',' + this.session.data.doctorInfo.doctorFirstName
  }
  private calculateNumbers(paymnet: any) {
    this.totalUnits = 0;
    this.totalCharge = 0;
    this.totalPmt = 0;
    this.totalAdj = 0;
    this.totalBalance = 0

    for (const obj of this.session.data.serviceCodes) {
      var _rslt = paymnet.find((pmnts: any) => pmnts.serviceLineId === obj.id);
      this.totalUnits += obj.cptCode.unit;
      this.totalCharge += obj.cptCode.charge;
      if (_rslt !== undefined) {
        console.log(JSON.stringify(_rslt))
        this.totalPmt += _rslt.payment
        this.totalAdj += _rslt.adjust;
        this.totalBalance += _rslt.balance
      }
    }
  }
  private fetchPayment() {
    var serviceLinesIds: number[] = new Array()
    for (const obj of this.session.data.serviceCodes) {
      serviceLinesIds.push(obj.id)
    }
    this.enterPaymentService.find(serviceLinesIds).subscribe((result: any) => {
      this.populateDate();
      this.calculateNumbers(result);
    })
  }
  onChangeType() {
    for (const obj of this.session.data.serviceCodes) {
      var serviceLinePayment: ServiceLinePayment = {
        charge: obj.cptCode.charge,
        unit: obj.cptCode.unit,
        balance:3,
        payment:40,
        adjust:44
      }
      this.serviceLinePaymentRequest.serviceLinePayments.push(serviceLinePayment);
    }
  }
  onSelectedItemsChange(event: any) {

  }
}

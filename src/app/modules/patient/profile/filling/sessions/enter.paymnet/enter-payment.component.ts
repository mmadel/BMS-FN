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
    { key: 'service', label: 'Service', _style: { width: '20%' } },
    { key: 'charge', label: 'Charge' },
    { key: 'balance', label: 'balance' },
    { key: 'payment', label: 'New Pmt' },
    { key: 'adjust', label: 'New Adj' },
    { key: 'pmt_description', label: 'Pmt Description' },
    { key: 'sessionAction', label: 'Session Actions', _style: { width: '20%' }},
  ];
  serviceLinePaymentRequest: ServiceLinePaymentRequest = {
    serviceLinePaymentType: null,
    serviceLinePayments: []
  }
  serviceLinesPaymnet: any
  constructor(private enterPaymentService: EnterPaymentService) { }

  ngOnInit(): void {
    this.fetchPayment();
  }
  private populateDate() {
    this.DOS = moment.unix(this.session.data.serviceDate / 1000).format('MM/DD/YYYY')
    this.client = this.session.data.patientName;
    this.provider = this.session.data.doctorInfo.doctorLastName + ',' + this.session.data.doctorInfo.doctorFirstName
  }
  private calculateNumbers() {
    this.totalUnits = 0;
    this.totalCharge = 0;
    this.totalPmt = 0;
    this.totalAdj = 0;
    this.totalBalance = 0

    for (const obj of this.session.data.serviceCodes) {
      var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === obj.id);
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
      this.serviceLinesPaymnet = result
      this.populateDate();
      this.calculateNumbers();
    })
  }
  onChangeType() {
    for (const obj of this.session.data.serviceCodes) {
      var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === obj.id);
      var serviceLinePayment: ServiceLinePayment = {
        charge: obj.cptCode.charge,
        balance: _rslt?.balance,
        payment: _rslt?.payment,
        adjust: _rslt?.payment,
        service: obj.cptCode.serviceCode + '.' + obj.cptCode.modifier
      }
      this.serviceLinePaymentRequest.serviceLinePayments.push(serviceLinePayment);
    }
  }
  onSelectedItemsChange(event: any) {

  }
}

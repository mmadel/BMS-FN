import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
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
  @ViewChild('serviceLinesPayments') serviceLinesPayments: SmartTableComponent;
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
    { key: 'sessionAction', label: 'Session Actions', _style: { width: '20%' } },
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
  private populateData() {
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
      this.populateData();
      this.calculateNumbers();
    })
  }
  onChangeType() {
    for (const obj of this.session.data.serviceCodes) {
      var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === obj.id);
      var serviceLinePayment: ServiceLinePayment = {
        charge: obj.cptCode.charge,
        balance: this.calculateBalance(_rslt?.payment, _rslt?.adjust, obj.cptCode.charge),
        payment: _rslt?.payment,
        adjust: _rslt?.adjust,
        service: obj.cptCode.serviceCode + '.' + obj.cptCode.modifier,
        unit: obj.cptCode.unit
      }
      this.serviceLinePaymentRequest.serviceLinePayments.push(serviceLinePayment);
    }
  }
  calculateBalance(payment: number, adjust: number, charge: number): number {
    var balance: number;
    console.log(payment + ' ' + adjust + ' ' + charge)
    // if (payment !== undefined)
    //   balance = charge - (payment + 0)
    // if (adjust !== undefined)
    //   balance = charge - (0 + adjust)
    // if ((payment !== undefined && adjust !== undefined))
    //   balance = charge - (payment + adjust)
    // else
    //   balance = charge;
    return charge - ((payment === undefined ? 0 : payment) + (adjust === undefined ? 0 : adjust))
  }
  changePaymnet(item: any) {
    item.balance = this.calculateBalance(item.payment, item.adjust, item.charge)
  }
  changeToServiceLine(item: any) {
    this.totalUnits = item.unit;
    this.totalCharge = item.charge;
    this.totalPmt = item.payment
    this.totalAdj = item.adjust
    this.totalBalance = item.balance;
  }
  changeToAllServiceLines() {
    this.calculateNumbers();
  }
  submit() {
    console.log(JSON.stringify(this.serviceLinesPayments.items))
  }
}

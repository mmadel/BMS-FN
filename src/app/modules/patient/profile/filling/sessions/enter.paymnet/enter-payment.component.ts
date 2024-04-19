import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SmartTableComponent } from '@coreui/angular-pro';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
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
  @Input() insuranceCompanies: any
  @Output() changeVisibility = new EventEmitter<string>()
  @ViewChild('serviceLinesPayments') serviceLinesPayments: SmartTableComponent;
  DOS: string;
  client: string;
  provider: string;
  totalUnits: number;
  totalCharge: number
  totalPmt: number;
  totalAdj: number
  totalBalance: number
  validity: any = [true]
  sessionData: any
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
    paymentMethod: null,
    serviceLinePayments: []
  }
  serviceLinesPaymnet: any
  selectedInsuranceCompany: number = null
  serviceLinesActions: string[];
  constructor(private enterPaymentService: EnterPaymentService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSessionData();
    this.fetchPayment();
  }
  private getSessionData() {
    console.log(JSON.stringify(this.session))
    this.sessionData = this.session.data === undefined ? this.session.records : this.session.data
  }
  private populateData() {
    this.DOS = moment.unix(this.sessionData.serviceDate / 1000).format('MM/DD/YYYY')
    this.client = this.sessionData.patientName;
    this.provider = this.sessionData.doctorInfo.doctorLastName + ',' + this.sessionData.doctorInfo.doctorFirstName
  }
  private calculateNumbers() {
    this.totalUnits = 0;
    this.totalCharge = 0;
    this.totalPmt = 0;
    this.totalAdj = 0;
    this.totalBalance = 0

    for (const obj of this.sessionData.serviceCodes) {
      var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === obj.id);
      this.totalUnits += obj.cptCode.unit;
      this.totalCharge += obj.cptCode.charge;
      if (_rslt !== undefined) {
        this.totalPmt += _rslt.payment
        this.totalAdj += _rslt.adjust;
        this.totalBalance += this.calculateBalance(_rslt.payment, _rslt.adjust, obj.cptCode.charge)
      } else {
        this.totalBalance += this.calculateBalance(undefined, undefined, obj.cptCode.charge)
      }
    }
  }
  private fetchPayment() {
    var serviceLinesIds: number[] = new Array()
    for (const obj of this.sessionData.serviceCodes) {
      serviceLinesIds.push(obj.id)
    }
    this.enterPaymentService.find(serviceLinesIds).subscribe((result: any) => {
      this.serviceLinesPaymnet = result
      this.populateData();
      this.calculateNumbers();
    })
  }
  onChangeType() {
    for (const obj of this.sessionData.serviceCodes) {
      var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === obj.id);
      var serviceLinePayment: ServiceLinePayment = {
        charge: obj.cptCode.charge,
        balance: _rslt.balance,
        service: obj.cptCode.serviceCode + '.' + obj.cptCode.modifier,
        unit: obj.cptCode.unit,
        serviceLineId: obj.id,
        type: obj.type
      }
      this.serviceLinePaymentRequest.serviceLinePayments.push(serviceLinePayment);
    }
  }
  private calculateBalance(payment: number, adjust: number, charge: number): number {
    return charge - ((payment === undefined || null ? 0 : payment) + (adjust === undefined || null ? 0 : adjust))
  }
  changePaymnet(item: any) {
    var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === item.serviceLineId);
    var balance: number = _rslt.balance
    item.balance = this.calculateBalance(item.payment, item.adjust, balance)
    console.log('### ' + item.adjust)
  }
  changeToServiceLine(item: any) {
    var _rslt = this.serviceLinesPaymnet.find((pmnts: any) => pmnts.serviceLineId === item.serviceLineId);
    this.totalUnits = item.unit;
    this.totalCharge = item.charge;
    this.totalPmt = _rslt.payment
    this.totalAdj = _rslt.adjust
    this.totalBalance = _rslt.balance;
  }
  changeToAllServiceLines() {
    this.calculateNumbers();
  }
  submit() {
    this.validate();
    if (this.validity[0]) {
      this.constructRequest();
      this.enterPaymentService.create(this.serviceLinePaymentRequest).subscribe((result) => {
        this.changeVisibility.emit('close');
        this.toastr.success("Session Payment done.!")
        this.scrollUp();
      })
    }
  }
  private validate() {
    if (this.serviceLinePaymentRequest.serviceLinePaymentType === null) {
      this.validity[0] = false
      this.validity[1] = 'select Type'
    }
    else if (this.serviceLinePaymentRequest.paymentMethod === null) {
      this.validity[0] = false
      this.validity[1] = 'select method'
    } else {
      var filledServiceLines: any = this.serviceLinesPayments.items.filter((item: any) => {
        return (item.payment !== undefined && item.adjust !== undefined) && (item.payment !== null && item.adjust !== null)
      })
      for (let item of filledServiceLines) {
        if (item.serviceLinePaymentAction === undefined
          || item.serviceLinePaymentAction === null
          || item.serviceLinePaymentAction === '') {
          this.validity[0] = false
          this.validity[1] = 'select action'
          break;
        } else {
          this.validity[0] = true
          this.validity[1] = ''
        }
      }
    }
  }
  private constructRequest() {
    var filteredList: any = this.serviceLinesPayments.items.filter((item: any) => {
      return item.payment !== undefined || null && item.adjust !== undefined || null
    })
    this.serviceLinePaymentRequest.receivedDate =
      this.serviceLinePaymentRequest.receivedDate_date !== undefined ?
        moment(this.serviceLinePaymentRequest.receivedDate_date).unix() * 1000 : undefined

    this.serviceLinePaymentRequest.checkDate =
      this.serviceLinePaymentRequest.checkDate_date !== undefined ?
        moment(this.serviceLinePaymentRequest.checkDate_date).unix() * 1000 : undefined

    this.serviceLinePaymentRequest.depositDate =
      this.serviceLinePaymentRequest.depositDate_date !== undefined ?
        moment(this.serviceLinePaymentRequest.depositDate_date).unix() * 1000 : undefined

    this.serviceLinePaymentRequest.authtDate =
      this.serviceLinePaymentRequest.authtDate_date !== undefined ?
        moment(this.serviceLinePaymentRequest.authtDate_date).unix() * 1000 : undefined
    if (this.serviceLinePaymentRequest.serviceLinePaymentType === 'Client')
      this.serviceLinePaymentRequest.paymentEntityId = this.sessionData.patientId;
    if (this.serviceLinePaymentRequest.serviceLinePaymentType === 'InsuranceCompany')
      this.serviceLinePaymentRequest.paymentEntityId = this.selectedInsuranceCompany
    this.serviceLinePaymentRequest.serviceLinePayments = filteredList
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
  generateServiceLineAction(serviceLinetype: string): string[] {
    var serviceLinesActions: string[] = new Array();
    switch (serviceLinetype) {
      case 'Initial':
        serviceLinesActions.push('Close')
        serviceLinesActions.push('Current_Status')
        break;
      case 'Invoice':
        serviceLinesActions.push('Resubmit')
        serviceLinesActions.push('Close')
        serviceLinesActions.push('Current_Status')
        break;
      case 'Close':
        serviceLinesActions.push('Resubmit')
        serviceLinesActions.push('Reopen')
        serviceLinesActions.push('Current_Status')
        break;
    }
    return serviceLinesActions;
  }
}

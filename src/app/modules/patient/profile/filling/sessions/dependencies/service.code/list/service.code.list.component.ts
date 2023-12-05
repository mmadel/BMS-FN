import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';

@Component({
  selector: 'service-code-list',
  templateUrl: './service.code.list.component.html',
  styleUrls: ['./service.code.list.component.scss']
})
export class ServiceCodeListComponent implements OnInit {
  serviceCodes: ServiceCode[] = new Array();
  unitCount: number;
  chargeCount: number;
  constructor() { }

  ngOnInit(): void {
    this.countChargeUnit();
  }
  toggleEditServiceLine(serviceCode: ServiceCode, index: number) {

  }
  popSergiceCode(index: number) {
    this.serviceCodes.splice(index, 1);
    this.countChargeUnit();
  }
  countChargeUnit() {
    this.unitCount = 0
    this.chargeCount = 0
    for (var i = 0; i < this.serviceCodes.length; i++) {
      var serviceCode: ServiceCode = this.serviceCodes[i];
      this.unitCount = this.unitCount + Number(serviceCode.cptCode.unit);
      this.chargeCount = this.chargeCount + Number(serviceCode.cptCode.charge);
    }
  }
  pushServiceCode(serviceCode: ServiceCode) {
    this.serviceCodes.push(serviceCode);
    this.countChargeUnit();
  }

  getServiceCodes() {
    return this.serviceCodes;
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { ServiceLineType } from 'src/app/modules/model/enum/session/service.line.type';


@Component({
  selector: 'service-code-creation',
  templateUrl: './service.code.create.component.html',
  styleUrls: ['./service.code.create.component.scss']
})
export class ServiceCodeCreateComponent implements OnInit {
  serviceCode: ServiceCode;
  @Output() onCreateServiceCode = new EventEmitter<ServiceCode>()
  constructor() { }

  ngOnInit(): void {
    this.serviceCode = {
      cptCode: {}
    }
  }
  saveServiceCode() {
    this.serviceCode.type = ServiceLineType.Initial;
    this.onCreateServiceCode.emit(this.serviceCode);
  }

}

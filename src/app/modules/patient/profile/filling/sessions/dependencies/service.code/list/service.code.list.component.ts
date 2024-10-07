import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, tap } from 'rxjs';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { Role } from 'src/app/modules/secuirty/model/roles';

@Component({
  selector: 'service-code-list',
  templateUrl: './service.code.list.component.html',
  styleUrls: ['./service.code.list.component.scss']
})
export class ServiceCodeListComponent implements OnInit {
  componentRole: string[] = [Role.PATIENT_ROLE];
  serviceCodes: ServiceCode[] = new Array();
  unitCount: number;
  chargeCount: number;
  @Input() editMode?: boolean = false;
  editServiceCodeVisibility: boolean = false;
  @Input() selectedServiceCodes?: ServiceCode[]
  selectedItems: any[] = [];
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    this.populateList();
    // if (this.editMode)
    //   this.populateList();
    // else
    //   this.serviceCodes = new Array();
  }
  toggleEditServiceLine(serviceCode: ServiceCode, index: number) {
    this.emitPatientSessionService.sessionserviceCode$.next(serviceCode)
    this.editServiceCodeVisibility = true;
  }
  popServiceCode(index: number) {
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
  private populateList() {
    if (this.selectedServiceCodes === undefined)
      this.emitPatientSessionService.sessionserviceCodes$.pipe(
        filter((serviceCodes) => serviceCodes !== null)
      ).subscribe((serviceCodes) => {
        this.serviceCodes = new Array();
        for (var i = 0; i < serviceCodes.length; i++) {
          this.serviceCodes.push(serviceCodes[i])
        }
        this.countChargeUnit();
      })
    else
      this.serviceCodes = this.selectedServiceCodes
  }
  toggleEditServiceCode() {
    this.editServiceCodeVisibility = !this.editServiceCodeVisibility;
  }
  changeVisibility(event: any) {
    if (event === 'close') {
      this.editServiceCodeVisibility = false;
      this.countChargeUnit();
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CPTCode } from 'src/app/modules/model/clinical/cpt.code';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { FeeScheduleLine } from 'src/app/modules/tools/fee.schedule/model/fee.schedule.line';
import { FeeScheduleService } from 'src/app/modules/tools/fee.schedule/service/fee-schedule.service';

@Component({
  selector: 'session-item-edit',
  templateUrl: './session-item-edit.component.html',
  styleUrls: ['./session-item-edit.component.scss']
})
export class SessionItemEditComponent implements OnInit {
  componentScopes: string[] = [Role.BILLING_ROLE, Role.INVOICE_BILLING_ROLE ];
  @Input() serviceCode: ServiceCode
  @Input() doctorNPI: string
  @Input() itemType: string
  @Output() changeVisibility = new EventEmitter<string>()
  placeOfCodeKeys = Object.keys;
  modifier: string[] = []
  feeCtrl = new FormControl();
  feeScheduleLine: FeeScheduleLine;
  isLoading = false;
  constructor(private patientSessionService: PatientSessionService,
    private toastr: ToastrService,
    private feeScheduleService: FeeScheduleService) { }

  ngOnInit(): void {
    if (this.itemType === 'cpt') {
      this.fetchcFeeSchdule();
      this.modifier = this.serviceCode.cptCode.modifier.split('.');
    }
    if(this.itemType === 'unit' || this.itemType === 'charge'){
      this.feeScheduleService.findByCpt(this.doctorNPI, this.serviceCode.cptCode.serviceCode)
      .subscribe((result:any)=>{
        this.feeScheduleLine = result;
      })
    }
  }
  edit() {
    var cptCode: CPTCode = {
      serviceCode: this.itemType === 'cpt' ? this.serviceCode.cptCode.serviceCode : null,
      modifier: this.itemType === 'cpt' ? this.modifier.join(".") : this.serviceCode.cptCode.modifier,
      unit: this.itemType === 'unit' ? this.serviceCode.cptCode.unit : null,
      charge: this.serviceCode.cptCode.charge
    }
    this.patientSessionService.updateItems(this.serviceCode.id, cptCode)
      .subscribe(result => {
        this.changeVisibility.emit('session-item');
        this.toastr.success("pateint session updated")
      }, (error) => {
        this.toastr.error("Error during session udpate")
      })
  }
  private fetchcFeeSchdule() {
    this.feeCtrl.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 1) {
            return true
          } else {
            this.feeScheduleLine = {};
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.feeScheduleLine = {};
          this.isLoading = true;
        }),
        switchMap((value) => {
          return this.feeScheduleService.findByCpt(this.doctorNPI, value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.feeScheduleLine = {};
        } else {
          this.feeScheduleLine = data;
          this.calculateCharge()
        }
      },
        error => {
          this.isLoading = false
        });
  }
  public calculateCharge() {
    if(Object.keys(this.feeScheduleLine).length){
      switch (this.feeScheduleLine.rateType) {
        case 'Per_Unit':
          this.serviceCode.cptCode.charge = this.serviceCode.cptCode.unit * this.feeScheduleLine.chargeAmount;
          break;
        case 'Fixed':
          this.serviceCode.cptCode.charge = this.feeScheduleLine.chargeAmount;
          break;
      }
    }    
  }
}

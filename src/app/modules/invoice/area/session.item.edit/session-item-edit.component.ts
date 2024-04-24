import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CPTCode } from 'src/app/modules/model/clinical/cpt.code';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';

@Component({
  selector: 'session-item-edit',
  templateUrl: './session-item-edit.component.html',
  styleUrls: ['./session-item-edit.component.scss']
})
export class SessionItemEditComponent implements OnInit {
  @Input() serviceCode: ServiceCode
  @Input() itemType: string
  @Output() changeVisibility = new EventEmitter<string>()
  placeOfCodeKeys = Object.keys;
  modifier: string[] = []
  constructor(private patientSessionService: PatientSessionService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.modifier= this.serviceCode.cptCode.modifier.split('.');
  }
  edit() {
    var cptCode: CPTCode = {
      serviceCode: this.itemType === 'cpt' ? this.serviceCode.cptCode.serviceCode : null,
      unit: this.itemType === 'unit' ? this.serviceCode.cptCode.unit : null,
      charge: this.itemType === 'charge' ? this.serviceCode.cptCode.charge : 0.0,
    }
    this.patientSessionService.updateItems(this.serviceCode.id, cptCode)
      .subscribe(result => {
        this.changeVisibility.emit('session-item');
        this.toastr.success("pateint session updated")
      }, (error) => {
        this.toastr.error("Error during session udpate")
      })
  }
}

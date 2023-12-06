import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, first } from 'rxjs';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';

@Component({
  selector: 'service-code-update',
  templateUrl: './service.code.edit.component.html',
  styleUrls: ['./service.code.edit.component.scss']
})
export class ServiceCodeEditComponent implements OnInit {

  constructor(private emitPatientSessionService: EmitPatientSessionService) { }
  selectedServiceCode: ServiceCode;
  @Output() changeVisibility = new EventEmitter<string>()
  ngOnInit(): void {
    this.emitPatientSessionService.sessionserviceCode$.pipe(
      filter((selectedServiceCode) => selectedServiceCode !== null),
      first()
    ).subscribe((selectedServiceCode) => {
      this.selectedServiceCode = selectedServiceCode;
    })
  }
  updateServiceCode() {
    this.changeVisibility.emit('close');
  }
  
}

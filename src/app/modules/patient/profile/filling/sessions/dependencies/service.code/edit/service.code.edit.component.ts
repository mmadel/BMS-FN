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
  modifier:string[]=[]
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }
  selectedServiceCode: ServiceCode;
  @Output() changeVisibility = new EventEmitter<string>()
  ngOnInit(): void {
    this.emitPatientSessionService.sessionserviceCode$.pipe(
      filter((selectedServiceCode) => selectedServiceCode !== null),
      first()
    ).subscribe((selectedServiceCode) => {
      this.modifier = selectedServiceCode.cptCode.modifier.split('.')
      this.selectedServiceCode = selectedServiceCode;
    })
  }
  updateServiceCode() {
    this.selectedServiceCode.cptCode.modifier= this.modifier.join(".") 
    this.changeVisibility.emit('close');
  }
  
}

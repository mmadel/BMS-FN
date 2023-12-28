import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { ServiceLineType } from 'src/app/modules/model/enum/session/service.line.type';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';


@Component({
  selector: 'service-code-creation',
  templateUrl: './service.code.create.component.html',
  styleUrls: ['./service.code.create.component.scss']
})
export class ServiceCodeCreateComponent implements OnInit {
  serviceCode: ServiceCode;
  modifier: string[] = []
  diagnosisCodes: string[];
  selectedDiagnosisCodes: string[];
  emptyDiagnosisCodes: boolean = true;
  @Output() onCreateServiceCode = new EventEmitter<ServiceCode>()
  constructor(private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    this.serviceCode = {
      cptCode: {}
    }
    this.emitPatientSessionService.diagnosisCodes$.pipe(
      filter(result => result !== null)
    ).subscribe((result) => {
      this.diagnosisCodes = result;
      if (this.diagnosisCodes.length !== 0)
        this.emptyDiagnosisCodes = false;
    })
  }
  saveServiceCode() {
    this.serviceCode.type = ServiceLineType.Initial;
    this.serviceCode.cptCode.modifier = this.modifier.join(".")
    this.serviceCode.diagnoses= this.selectedDiagnosisCodes
    this.onCreateServiceCode.emit(this.serviceCode);    
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
import { SessionScheduling } from '../../model/session.scheduling';
interface ProviderInfo {
  name: string,
  model: Provider
}
@Component({
  selector: 'patient-session-sheduling',
  templateUrl: './sheduling.component.html',
  styleUrls: ['./sheduling.component.scss']
})
export class ShedulingComponent implements OnInit {
  sessionScheduling: SessionScheduling;
  providers: ProviderInfo[];
  notValidForm: boolean = false;
  @ViewChild('sessionForm') sessionForm: NgForm;
  @Input() editMode?: boolean = false
  constructor(private providerService: ProviderService, private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    if (this.editMode)
      this.popultaeModel();
    else
      this.initializeModel();
    this.findProviders();
  }
  private popultaeModel() {
    this.emitPatientSessionService.sessionScheduling$.pipe(
      filter((selectedSessionScheduling) => selectedSessionScheduling !== null)
    ).subscribe((selectedSessionScheduling) => {
      this.sessionScheduling = selectedSessionScheduling;
    })
  }
  private initializeModel() {
    this.sessionScheduling = {}
  }
  private findProviders() {
    this.providerService.findAllWithoutPagination()
      .subscribe((result: any) => {
        this.providers = new Array();
        for (var i = 0; i < result.length; i++) {
          this.providers.push({
            name: result[i].lastName + ',' + result[i].firstName,
            model: result[i]
          })
        }
      })
  }
}

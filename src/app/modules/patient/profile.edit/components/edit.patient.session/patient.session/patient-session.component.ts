import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { SessionScheduling } from 'src/app/modules/patient/session/model/session.scheduling';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
interface ProviderInfo {
  name: string,
  model: Provider
}
@Component({
  selector: 'patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.scss']
})
export class PatientSessionComponent implements OnInit {
  notValidForm: boolean = false;
  providers: ProviderInfo[];
  sessionScheduling: SessionScheduling={};
  constructor(private providerService: ProviderService,private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    this.findProviders();
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
  pickProvider(event: any) {
    this.emitPatientSessionService.selectedProvider$.next(event)
  }

}

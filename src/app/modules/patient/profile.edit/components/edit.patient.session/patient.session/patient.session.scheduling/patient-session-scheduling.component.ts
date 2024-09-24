import { Component, OnInit, Provider } from '@angular/core';
import { SessionScheduling } from 'src/app/modules/patient/session/model/session.scheduling';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
interface ProviderInfo {
  name: string,
  model: Provider
}
@Component({
  selector: 'patient-session-scheduling',
  templateUrl: './patient-session-scheduling.component.html',
  styleUrls: ['./patient-session-scheduling.component.scss']
})
export class PatientSessionSchedulingComponent implements OnInit {
  notValidForm: boolean = false;
  providers: ProviderInfo[];
  sessionScheduling: SessionScheduling = {};
  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.findProviders();
  }
  pickProvider(event: any) {
    this.providerService.selectedProvider$.next(event.model)
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

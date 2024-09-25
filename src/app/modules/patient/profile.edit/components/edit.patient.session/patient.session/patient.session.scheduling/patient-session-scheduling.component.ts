import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
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
  @Input() selectedSession: PatientSession
  notValidForm: boolean = false;
  providers: ProviderInfo[];
  sessionScheduling: SessionScheduling = {};
  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.findProviders();
    this.fillModel();
  }

  pickProvider(event: any) {
    this.providerService.selectedProvider$.next(event.model)
  }
  private fillModel() {
    if (this.selectedSession !== undefined) {
      var provider: ProviderInfo = {
        name: this.selectedSession.doctorInfo.doctorLastName + ',' + this.selectedSession.doctorInfo.doctorFirstName,
        model: {
          firstName: this.selectedSession.doctorInfo.doctorFirstName,
          lastName: this.selectedSession.doctorInfo.doctorLastName,
          npi: this.selectedSession.doctorInfo.doctorNPI
        }
      }
      this.sessionScheduling = {
        provider: provider,
        serviceDate: moment.unix(this.selectedSession.serviceDate / 1000).toDate(),
        startTime: moment.unix(this.selectedSession.serviceStartTime / 1000).toDate(),
        endTime: moment.unix(this.selectedSession.serviceEndTime / 1000).toDate()

      }
      this.providerService.selectedProvider$.next(provider.model)
    }
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

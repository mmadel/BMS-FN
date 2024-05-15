import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { Provider } from 'src/app/modules/model/clinical/provider/provider';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { ProviderService } from 'src/app/modules/providers/service/provider.service';
import { Role } from 'src/app/modules/secuirty/model/roles';
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
  componentScopes: string[] = [Role.PATIENT_ROLE ];
  sessionScheduling: SessionScheduling;
  providers: ProviderInfo[];
  notValidForm: boolean = false;
  @ViewChild('sessionForm') sessionForm: NgForm;
  @Input() editMode?: boolean = false
  @Input() patientSession: PatientSession;
  constructor(private providerService: ProviderService, private emitPatientSessionService: EmitPatientSessionService) { }

  ngOnInit(): void {
    if (this.editMode)
      this.popultaeModel();
    else
      this.initializeModel();
    this.findProviders();
  }
  private popultaeModel() {

    if (this.patientSession === undefined)
      this.emitPatientSessionService.sessionScheduling$.pipe(
        filter((selectedSessionScheduling) => selectedSessionScheduling !== null)
      ).subscribe((selectedSessionScheduling) => {
        this.sessionScheduling = selectedSessionScheduling;
        var pushedDoctor: any = {
          model: {
            npi: this.sessionScheduling.providerNPI
          }
        }
        this.emitPatientSessionService.selectedProvider$.next(pushedDoctor)
      })
    else
      this.populateSessionScheduling()
  }
  private initializeModel() {
    var initStartDate = new Date();
    initStartDate.setHours(10)
    initStartDate.setMinutes(0);

    var initEndDate = new Date();
    initEndDate.setHours(11)
    initEndDate.setMinutes(0);
    this.sessionScheduling = {
      startTime: initStartDate,
      endTime: initEndDate,
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
  private populateSessionScheduling() {
    this.sessionScheduling = {
      provider: this.patientSession.doctorInfo.doctorLastName + ',' + this.patientSession.doctorInfo.doctorFirstName,
      serviceDate: moment.unix(this.patientSession.serviceDate / 1000).toDate(),
      startTime: moment.unix(this.patientSession.serviceStartTime / 1000).toDate(),
      endTime: moment.unix(this.patientSession.serviceEndTime / 1000).toDate(),
    }
  }
  pickProvider(event: any) {
    this.emitPatientSessionService.selectedProvider$.next(event)
  }
}

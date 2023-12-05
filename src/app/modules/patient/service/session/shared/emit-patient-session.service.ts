import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { BillingCode } from '../../../profile/filling/sessions/model/billing.code';
import { SessionScheduling } from '../../../session/model/session.scheduling';

@Injectable({
  providedIn: 'root'
})
export class EmitPatientSessionService {
  public patientSession$: BehaviorSubject<PatientSession | null> = new BehaviorSubject<PatientSession | null>(null);
  public sessionScheduling$: BehaviorSubject<SessionScheduling | null> = new BehaviorSubject<SessionScheduling | null>(null);
  public sessionBillingCode$: BehaviorSubject<BillingCode | null> = new BehaviorSubject<BillingCode | null>(null);
  public sessionserviceCodes$: BehaviorSubject<ServiceCode[] | null> = new BehaviorSubject<ServiceCode[] | null>(null);
  constructor() { }
}

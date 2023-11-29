import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';

@Injectable({
  providedIn: 'root'
})
export class PateintEmittingService {
  public selectedPatient$: BehaviorSubject<Patient | null> = new BehaviorSubject<Patient | null>(null);
  constructor() { }
}

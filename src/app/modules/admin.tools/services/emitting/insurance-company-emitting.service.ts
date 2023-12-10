import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IsuranceCompany } from 'src/app/modules/model/admin/insurance.company';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyEmittingService {
  public selectedInsuranceCompany$: BehaviorSubject<IsuranceCompany | null> = new BehaviorSubject<IsuranceCompany | null>(null);

  constructor() { }
}

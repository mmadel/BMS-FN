import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Organization } from 'src/app/modules/model/admin/organiztion';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyConfigurationEmitterService {
  public updatedBillingProvider$: BehaviorSubject<Organization | null> = new BehaviorSubject<Organization | null>(null);
  constructor() { }
}

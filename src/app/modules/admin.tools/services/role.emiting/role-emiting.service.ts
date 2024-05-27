import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';

@Injectable({
  providedIn: 'root'
})
export class RoleEmitingService {
  public viewRoles$: BehaviorSubject<RoleScope[] | null> = new BehaviorSubject<RoleScope[] | null>(null);
  constructor() { }
}

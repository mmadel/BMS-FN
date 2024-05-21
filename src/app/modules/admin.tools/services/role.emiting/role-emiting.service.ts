import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';

@Injectable({
  providedIn: 'root'
})
export class RoleEmitingService {
  public selectedRole$: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
  public viewRoles$: BehaviorSubject<RoleScope[] | null> = new BehaviorSubject<RoleScope[] | null>(null);
  constructor() { }
}

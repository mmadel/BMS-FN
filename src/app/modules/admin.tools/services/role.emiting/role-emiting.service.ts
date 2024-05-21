import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleEmitingService {
  public selectedRole$: BehaviorSubject<Boolean | null> = new BehaviorSubject<Boolean | null>(null);
  constructor() { }
}

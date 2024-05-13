import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenderNavItemsService {
  public renderItems$: BehaviorSubject<INavData[] | null> = new BehaviorSubject<INavData[] | null>(null);
  constructor() { }
}

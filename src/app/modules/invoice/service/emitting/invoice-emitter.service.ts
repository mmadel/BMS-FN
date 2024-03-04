import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientSessionResponse } from '../../model/client.session.response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEmitterService {
  public invoicedSession$: BehaviorSubject<ClientSessionResponse | null> = new BehaviorSubject<ClientSessionResponse | null>(null);
  public clientId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  constructor() { }
}

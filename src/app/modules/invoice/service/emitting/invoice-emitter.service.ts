import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientSessionResponse } from '../../model/client.session.response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEmitterService {
  public selectedInvoiceClientSession$: BehaviorSubject<ClientSessionResponse | null> = new BehaviorSubject<ClientSessionResponse | null>(null);
  constructor() { }
}

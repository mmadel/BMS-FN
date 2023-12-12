import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ClientSessionResponse } from '../../model/client.session.response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceEmitterService {
  public selectedInvoiceClientSession$: Subject<ClientSessionResponse | null> = new Subject<ClientSessionResponse | null>();
  constructor() { }
}

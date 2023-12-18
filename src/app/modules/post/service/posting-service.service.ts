import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiParams } from '../../model/interface/api.params';
import { PaymentServiceLine } from '../../model/posting/payment.service.line';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class PostingServiceService extends BasePaginationService  {
  private baseUrl = environment.baseURL + 'posting'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findClientPayments(clientId:number): Observable<any> {
    var url = this.baseUrl + '/find/client/'+clientId
    return this.httpClient.get(url)
  }

  public createClientPayments( paymentServiceLine:PaymentServiceLine,clientId:number) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create/payments/clientId/' + clientId
    return this.httpClient.post(`${url}`, JSON.stringify(paymentServiceLine), { 'headers': headers })
  }
}

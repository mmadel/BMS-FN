import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceLinePaymentRequest } from '../../../profile/filling/sessions/model/service.line.payment.request';

@Injectable({
  providedIn: 'root'
})
export class EnterPaymentService {
  private baseUrl = environment.baseURL + '/session/payment'
  constructor(private httpClient: HttpClient) { }

  public find(serviceLinesIds:number[]){
    var url = this.baseUrl + '/find/' + serviceLinesIds;
    return this.httpClient.get(url);
  }
  public create(serviceLinePaymentRequest:ServiceLinePaymentRequest){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create';
    return this.httpClient.post( url, JSON.stringify(serviceLinePaymentRequest),{ 'headers': headers })
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceLinePaymentRequest } from 'src/app/modules/patient/profile/filling/sessions/model/service.line.payment.request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchPaymentService {
  private baseUrl = environment.baseURL + '/batch/paymentm'
  constructor(private httpClient: HttpClient) { }
  public createBtachClientPayment(serviceLinePaymentRequest:ServiceLinePaymentRequest){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/client/create';
    return this.httpClient.post( url, JSON.stringify(serviceLinePaymentRequest),{ 'headers': headers })
  }

  public createBtachInsuranceCompanyPayment(serviceLinePaymentRequest:ServiceLinePaymentRequest){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/insurance-company/create';
    return this.httpClient.post( url, JSON.stringify(serviceLinePaymentRequest),{ 'headers': headers })
  }
}

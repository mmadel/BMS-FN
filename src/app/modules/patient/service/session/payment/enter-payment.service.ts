import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnterPaymentService {
  private baseUrl = environment.baseURL + '/session/payment'
  constructor(private httpClient: HttpClient) { }

  public find(serviceLinesIds:number[]){
    var url = this.baseUrl + '/find/' + serviceLinesIds;
    this.httpClient.get
  }
}

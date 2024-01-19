import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payer } from '../../model/admin/payer';

@Injectable({
  providedIn: 'root'
})
export class PayerService {
  private baseUrl = environment.baseURL + '/payer'
  constructor(private httpClient: HttpClient) { }
  create(payer:Payer) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(payer), { 'headers': headers })
  }
  list(){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find'
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
}

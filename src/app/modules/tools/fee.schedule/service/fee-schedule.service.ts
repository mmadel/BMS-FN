import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeScheduleService {
  private baseUrl = environment.baseURL + '/fee/schedule'
  constructor(private httpClient: HttpClient) { }

  create(feeSchdeuleModel: FeeSchdeuleModel) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return
    this.httpClient.post(`${url}`, JSON.stringify(feeSchdeuleModel), { responseType: 'blob', 'headers': headers })
  }
  find() {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find'
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  findById(id:number) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find/id/'+id
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
}

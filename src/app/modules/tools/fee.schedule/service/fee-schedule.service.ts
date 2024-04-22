import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from 'src/app/modules/model/interface/api.params';
import { BasePaginationService } from 'src/app/modules/model/service/base-pagination.service';
import { environment } from 'src/environments/environment';
import { FeeSchedule } from '../model/fee.schedule';

@Injectable({
  providedIn: 'root'
})
export class FeeScheduleService extends BasePaginationService {
  private baseUrl = environment.baseURL + '/fee/schedule'
  constructor(httpClient: HttpClient) { super(httpClient) }

  create(feeSchdeuleModel: FeeSchedule) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(feeSchdeuleModel), { 'headers': headers })
  }
  find() {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find'
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  findByCpt(cpt: string) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find/cpt/' + cpt
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  findById(id: number) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find/id/' + id
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  public findAll(feeId: number): Observable<any> {
    var url = this.baseUrl + '/find/lines/fee/' + feeId
    return this.httpClient.get(url)
  }
  public deleteById(id: number) {
    var url = this.baseUrl + '/delete/id/' + id
    return this.httpClient.delete(`${url}`,)
  }
}

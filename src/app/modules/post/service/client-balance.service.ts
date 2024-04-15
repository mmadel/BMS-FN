import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterModel } from '../../invoice/area/session.list/filter/filter.model';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';
import { PostingFilterModel } from '../bip/filter/posting.filter.model';
import { ClientBalanceInvoice } from '../model/clinet.balance.invoice';

@Injectable({
  providedIn: 'root'
})
export class ClientBalanceService extends BasePaginationService {
  private baseUrl = environment.baseURL + '/client/balance'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findAwaiting(config$: BehaviorSubject<IApiParams>, clientId: number, filterModel: PostingFilterModel): Observable<any> {
    var url = this.baseUrl + '/find/awaiting/patient/' + clientId;
    return this.post(config$, url, JSON.stringify(filterModel))
  }
  public findfinalize(config$: BehaviorSubject<IApiParams>, clientId: number, filterModel: PostingFilterModel): Observable<any> {
    var url = this.baseUrl + '/find/finalized/patient/' + clientId;
    return this.post(config$, url, JSON.stringify(filterModel))
  }

  public export(clientBalanceInvoice: ClientBalanceInvoice){
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/pdf';
    return this.httpClient.post(`${url}`, JSON.stringify(clientBalanceInvoice), { responseType: 'blob', 'headers': headers })
  }
  public findClientBalanceSettings(){
    var url = this.baseUrl + '/settings/find/';
    return this.httpClient.get(url)
  }
}

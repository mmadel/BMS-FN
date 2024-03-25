import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';
import { FilterModel } from '../area/session.list/filter/filter.model';
import { InvoiceRequestCreation } from '../model/invoice.request.creation';
import { InvoiceRequest } from '../model/temp/invoice.request';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BasePaginationService {

  private baseUrl = environment.baseURL + '/invoice'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/find'
    return this.get(config$, url)
  }
  public findByClient(config$: BehaviorSubject<IApiParams>, clientId: number): Observable<any> {
    var url = this.baseUrl + '/find/patient/' + clientId
    return this.get(config$, url)
  }
  public findByClientFilter(config$: BehaviorSubject<IApiParams>, clientId: number, filterModel: FilterModel): Observable<any> {
    var url = this.baseUrl + '/find/patient/' + clientId;
    return this.post(config$, url, JSON.stringify(filterModel))
  }

  correctClaim() {
    var url = this.baseUrl + '';
    return this.httpClient.get(url)
  }
  create(invoiceRequest: InvoiceRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(invoiceRequest), { responseType: 'blob', 'headers': headers })
  }

  createElectronic(invoiceRequest: InvoiceRequest) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create/electronic'
    return this.httpClient.post(`${url}`, JSON.stringify(invoiceRequest), { responseType: 'blob', 'headers': headers })
  }
  downloadCMS(invoiceId: number) {
    var url = this.baseUrl + '/download/cms/invoice/' + invoiceId
    return this.httpClient.post(`${url}`, null, { responseType: 'blob' });
  }
}

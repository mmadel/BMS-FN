import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provider } from '../../model/clinical/provider/provider';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends BasePaginationService {
  public selectedProvider$: BehaviorSubject<Provider | null> = new BehaviorSubject<Provider | null>(null);
  private baseUrl = environment.baseURL + '/provider'
  constructor(httpClient: HttpClient) { super(httpClient) }
  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/find'
    return this.get(config$, url)
  }

  create(provider: Provider) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(provider), { 'headers': headers })
  }
  update(provider: Provider) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/update'
    return this.httpClient.put(`${url}`, JSON.stringify(provider), { 'headers': headers })
  }
  delete(id: number) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/delete/id/' + id
    return this.httpClient.delete(`${url}`, { 'headers': headers })
  }
  public findAllWithoutPagination() {
    var url = this.baseUrl + '/find/all'
    return this.httpClient.get(url);
  }

  public findProviderByNPI(npi: number) {
    var url = environment.baseURL + '/nppes//find/provider/npi/' + npi;
    return this.httpClient.get(url);
  }
}

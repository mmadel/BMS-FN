import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReferringProvider } from '../../model/clinical/referring.provider';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ReferringProviderService extends BasePaginationService {
  private baseUrl = environment.baseURL + '/referring/provider'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findAll(config$: BehaviorSubject<IApiParams>) {
    return this.get(config$, this.baseUrl + '/find')
  }

  create(referringProvider: ReferringProvider) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(referringProvider), { 'headers': headers })
  }
}

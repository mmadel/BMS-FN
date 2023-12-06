import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../model/admin/clinic';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'clinic'

  constructor(httpClient: HttpClient) { super(httpClient) }

  create(clinic: Clinic) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(clinic), { 'headers': headers })
  }

  update(clinic: Clinic) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/update'
    return this.httpClient.put(`${url}`, JSON.stringify(clinic), { 'headers': headers })
  }
  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/find'
    return this.get(config$, url)
  }
}

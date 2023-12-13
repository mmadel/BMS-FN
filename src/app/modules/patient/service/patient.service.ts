import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../../model/clinical/patient';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'patient'
  constructor(httpClient: HttpClient) { super(httpClient) }

  create(patient: Patient) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(patient), { 'headers': headers })
  }

  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/find'
    return this.get(config$, url)
  }

  public findById(patientId: number) {
    var url = this.baseUrl + '/find/patientId/' + patientId
    return this.httpClient.get(url)
  }
}

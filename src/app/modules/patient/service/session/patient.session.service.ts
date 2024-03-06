import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CPTCode } from 'src/app/modules/model/clinical/cpt.code';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { IApiParams } from 'src/app/modules/model/interface/api.params';
import { BasePaginationService } from 'src/app/modules/model/service/base-pagination.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientSessionService extends BasePaginationService {
  private baseUrl = environment.baseURL + '/session'

  constructor(httpClient: HttpClient) { super(httpClient) }

  public findSessions(config$: BehaviorSubject<IApiParams>, patientId: number): Observable<any> {
    var url = this.baseUrl + '/find/patientId/' + patientId
    return this.get(config$, url)
  }
  create(patientSession: PatientSession) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(patientSession), { 'headers': headers })
  }
  update(patientSession: PatientSession) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/update'
    return this.httpClient.put(`${url}`, JSON.stringify(patientSession), { 'headers': headers })
  }
  updateItems(serviceLineId: number, cptCode: CPTCode) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/update/items/serviceLineId/' + serviceLineId
    return this.httpClient.put(`${url}`, JSON.stringify(cptCode), { 'headers': headers })
  }
  public findSessionById(sessionId: number): Observable<any> {
    var url = this.baseUrl + '/find/id/' + sessionId;
    return this.httpClient.get(url);
  }
  correctClaim(patientSession: PatientSession) {
    var url = this.baseUrl + '/correct';
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.put(`${url}`, JSON.stringify(patientSession), { 'headers': headers })
  }
}

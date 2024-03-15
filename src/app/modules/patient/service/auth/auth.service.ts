import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientAuthorization } from 'src/app/modules/model/clinical/auth/patient.auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseURL + '/authorization'
  constructor(private httpClient: HttpClient) { }

  create(patientAuthorization: PatientAuthorization) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(patientAuthorization), { 'headers': headers })
  }
  update(patientAuthorization: PatientAuthorization) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/update'
    return this.httpClient.put(`${url}`, JSON.stringify(patientAuthorization), { 'headers': headers })
  }
  find(patientId: number) {
    var url = this.baseUrl + '/find/patientId/' + patientId
    return this.httpClient.get(url)
  }
  findBySession(patientId: number, sessionId: number) {
    var url = this.baseUrl + '/find/patientId/' + patientId + '/session/' + sessionId
    return this.httpClient.get(url)
  }
  delete(authId: number) {
    var url = this.baseUrl + '/delete/auth/' + authId
    return this.httpClient.delete(url)
  }
  selectAuthorization(sessionId: number, authId: number) {
    var url = this.baseUrl + '/assign/session/' + sessionId + '/authorization/' + authId
    return this.httpClient.put(url, null)
  }
}

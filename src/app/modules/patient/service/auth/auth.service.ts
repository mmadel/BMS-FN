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
}

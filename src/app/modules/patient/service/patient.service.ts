import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../../model/clinical/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private userUrl = environment.baseURL + 'patient'
  constructor(private httpClient: HttpClient) { }

  create(patient: Patient) {
    const headers = { 'content-type': 'application/json' }
    var url = this.userUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(patient), { 'headers': headers })
  }
}

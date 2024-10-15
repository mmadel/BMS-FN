import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from 'src/app/modules/model/admin/organiztion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateOrganizationService {
  private baseUrl = environment.baseURL + '/organization'
  constructor(private httpClient: HttpClient) {  }

  create(organization: Organization) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(organization), { 'headers': headers })
  }
}

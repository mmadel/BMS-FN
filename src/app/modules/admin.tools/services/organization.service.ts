import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Organization } from '../../model/admin/organiztion';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = environment.baseURL + 'organization'
  constructor(private httpClient: HttpClient) { }

  findDefaultOrganization() {
    var url = this.baseUrl + '/find/default'
    return this.httpClient.get(url);
  }
  update(organization: Organization) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/update'
    return this.httpClient.put(`${url}`, JSON.stringify(organization), { 'headers': headers })
  }
}

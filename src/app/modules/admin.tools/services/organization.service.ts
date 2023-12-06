import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = environment.baseURL + 'organization'
  constructor(private httpClient: HttpClient) { }

  findDefaultOrganization() {
    var url = this.baseUrl + '/find'
    return this.httpClient.get(url);
  }
}

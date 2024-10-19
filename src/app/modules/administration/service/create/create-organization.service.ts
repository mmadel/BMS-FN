import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from 'src/app/modules/model/admin/organiztion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateOrganizationService {
  private baseUrl = environment.baseURL + '/onboarding'
  constructor(private httpClient: HttpClient) { }

  create(organization: Organization) {
    var name: string = this.constructOrgName(organization.businessName)
    const headers = { 'content-type': 'application/json', 'X-TenantID': name }
    var url = this.baseUrl + '/setup'
    return this.httpClient.post(`${url}`, JSON.stringify(organization), { 'headers': headers })
  }
  private constructOrgName(name: string): string {
    const words = name.split(/[^a-zA-Z0-9]/).filter(word => word.length > 0);

    // If the input contains only one word, return the capitalized word
    if (words.length === 1) {
      return words[0];
    }
  
    // If multiple words, construct the new string from the first character of each word
    return words.map(word => word[0]).join('');
  }
}

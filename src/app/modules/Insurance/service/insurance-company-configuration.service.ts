import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InsuranceCompanyConfiguration } from '../../model/admin/insurance.company.configuration';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyConfigurationService {
  private baseUrl = environment.baseURL + '/insurance/company'

  constructor(private httpClient:HttpClient) { }
  configure(insuranceCompnayConfiguration : InsuranceCompanyConfiguration) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/configure'
    return this.httpClient.post(`${url}`, JSON.stringify(insuranceCompnayConfiguration), { 'headers': headers })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IsuranceCompanyMapper } from 'src/app/modules/model/admin/insurance.company.mapper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyService {
  private baseUrl = environment.baseURL + '/insurance/company'

  constructor(private httpClient: HttpClient) { }
  
  public findAll(): Observable<any> {
    var url = this.baseUrl + '/find'
    return this.httpClient.get(url)
  }
  map(isuranceCompanyMapper: IsuranceCompanyMapper) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/map'
    return this.httpClient.put(`${url}`, JSON.stringify(isuranceCompanyMapper), { 'headers': headers })
  }
  mapAll(isuranceCompanyMappers: IsuranceCompanyMapper[]) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/map/all'
    return this.httpClient.put(`${url}`, JSON.stringify(isuranceCompanyMappers), { 'headers': headers })
  }
}

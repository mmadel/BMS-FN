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
  public findByName(name:string): Observable<any> {
    var url = this.baseUrl + '/find/name/' + name
    return this.httpClient.get(url)
  }
  public findInternal(): Observable<any> {
    var url = this.baseUrl + '/find/internal'
    return this.httpClient.get(url)
  }
  public findInternalPayerById(id: number) {
    var url = this.baseUrl + '/find/internal/id/' + id
    return this.httpClient.get(url)
  }
  map(isuranceCompanyMapper: IsuranceCompanyMapper) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/map'
    return this.httpClient.post(`${url}`, JSON.stringify(isuranceCompanyMapper), { 'headers': headers })
  }
  mapAll(isuranceCompanyMappers: IsuranceCompanyMapper[]) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/map/all'
    return this.httpClient.put(`${url}`, JSON.stringify(isuranceCompanyMappers), { 'headers': headers })
  }
  public findInternalMapperById(id: string) {
    var url = this.baseUrl + '/find/internal/mapper/id/' + id
    return this.httpClient.get(url);
  }
  public findElementInsuranceCompanyConfiguration(id: number, visibility: string) {
    var url = this.baseUrl + '/find/element/configuration/id/' + id + '/visibility/' + visibility
    return this.httpClient.get(url);
  }
  public findInsuranceCompanyConfiguration(id: number, visibility: string) {
    var url = this.baseUrl + '/find/configuration/id/' + id + '/visibility/' + visibility
    return this.httpClient.get(url);
  }
}

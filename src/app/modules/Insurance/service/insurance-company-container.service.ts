import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyContainerService {
  private baseUrl = environment.baseURL + '/insurance/company'

  constructor(private httpClient:HttpClient) { }
  
  public findInsuranceCompanyContianers(): Observable<any> {
    var url = this.baseUrl + '/find'
    return this.httpClient.get(url)
  }
}

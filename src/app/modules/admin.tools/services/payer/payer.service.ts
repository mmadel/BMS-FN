import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayerService {
  private baseUrl = environment.baseURL + 'payer'
  constructor(private httpClient: HttpClient) { }
  public findAll() {
    var url = this.baseUrl + '/find'
    return this.httpClient.get(url)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BasePaginationService {

  private baseUrl = environment.baseURL + 'invoice'
  constructor(httpClient: HttpClient) { super(httpClient) }
  
  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/find/clients'
    return this.get(config$, url)
  }
}
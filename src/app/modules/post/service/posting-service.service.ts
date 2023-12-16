import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class PostingServiceService extends BasePaginationService  {
  private baseUrl = environment.baseURL + 'posting'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findClientPayments(clientId:number , config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/find/client/'+clientId
    return this.get(config$, url)
  }
}

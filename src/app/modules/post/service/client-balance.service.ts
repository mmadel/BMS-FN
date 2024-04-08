import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterModel } from '../../invoice/area/session.list/filter/filter.model';
import { IApiParams } from '../../model/interface/api.params';
import { BasePaginationService } from '../../model/service/base-pagination.service';
import { PostingFilterModel } from '../bip/filter/posting.filter.model';

@Injectable({
  providedIn: 'root'
})
export class ClientBalanceService extends BasePaginationService {
  private baseUrl = environment.baseURL + '/client/balance'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findAwaiting(config$: BehaviorSubject<IApiParams>, clientId: number, filterModel: PostingFilterModel): Observable<any> {
    var url = this.baseUrl + '/find/awaiting/patient/' + clientId;
    return this.post(config$, url, JSON.stringify(filterModel))
  }
  public findfinalize(config$: BehaviorSubject<IApiParams>, clientId: number, filterModel: PostingFilterModel): Observable<any> {
    
    var url = this.baseUrl + '/find/finalized/patient/' + clientId;
    console.log('########################## ' +  url)
    return this.post(config$, url, JSON.stringify(filterModel))
  }

}

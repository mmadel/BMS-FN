import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from 'src/app/modules/model/interface/api.params';
import { BasePaginationService } from 'src/app/modules/model/service/base-pagination.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EraService extends BasePaginationService {
  private baseUrl = environment.baseURL + '/ch'
  constructor(httpClient: HttpClient) { 
    super(httpClient)
  }
  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/era/list'
    return this.get(config$, url)
  }
}

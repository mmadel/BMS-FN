import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { IApiParams } from 'src/app/modules/model/interface/api.params';
import { ERAHistory } from 'src/app/modules/model/invoice/era/er.history';
import { BasePaginationService } from 'src/app/modules/model/service/base-pagination.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EraService extends BasePaginationService {
  public selectedPatient$: BehaviorSubject<Patient | null> = new BehaviorSubject<Patient | null>(null);
  private baseUrl = environment.baseURL + '/ch'
  constructor(httpClient: HttpClient) {
    super(httpClient)
  }
  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/era/list'
    return this.get(config$, url)
  }

  public createERAHistory(eraHistory: ERAHistory) {
    const headers = { 'content-type': 'application/json' }
    var url = environment.baseURL + '/era' + '/create/history'
    return this.httpClient.post(`${url}`, JSON.stringify(eraHistory), { 'headers': headers })
  }
}

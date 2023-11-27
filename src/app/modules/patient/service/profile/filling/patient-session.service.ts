import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiParams } from 'src/app/modules/model/interface/api.params';
import { BasePaginationService } from 'src/app/modules/model/service/base-pagination.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientSessionService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'session'

  constructor(httpClient: HttpClient) { super(httpClient) }

  public findSessions(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/find/patientId/46'
    return this.get(config$, url)
  }
}

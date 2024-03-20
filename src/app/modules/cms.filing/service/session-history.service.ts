import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasePaginationService } from '../../model/service/base-pagination.service';

@Injectable({
  providedIn: 'root'
})
export class SessionHistoryService extends BasePaginationService {

  private baseUrl = environment.baseURL + '/session/history'
  constructor(httpClient: HttpClient) { super(httpClient) }

  find(): Observable<any> {
    var url = this.baseUrl + '/find';
    return this.httpClient.get(url)
  }
}

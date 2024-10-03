import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasePaginationService } from '../../model/service/base-pagination.service';
import { SessionHistoryCriteria } from '../model/session.history.criteria';

@Injectable({
  providedIn: 'root'
})
export class SessionHistoryService extends BasePaginationService {

  private baseUrl = environment.baseURL + '/session/history'
  constructor(httpClient: HttpClient) { super(httpClient) }

  find(offset: number, limit: number) {
    var url = this.baseUrl + '/find?offset=' + offset + '&limit=' + limit;
    return this.httpClient.get(url)
  }
  search(offset: number, limit: number, sessionHistoryCriteria: SessionHistoryCriteria) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/search?offset=' + offset + '&limit=' + limit;
    return this.httpClient.post(url, JSON.stringify(sessionHistoryCriteria), { 'headers': headers })
  }

  findMessages(submissionID: number) {
    var url = this.baseUrl + '/find/messages/submissionId/' + submissionID
    return this.httpClient.get(url)
  }

  prepareClaimToSend(patientId: number, submissionId: number) {
    var url = this.baseUrl + '/prepare/claim/patient/' + patientId + '/submissionId/' + submissionId;
    return this.httpClient.get(url)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiParams } from '../../model/interface/api.params';
import { PaymentServiceLine } from '../../model/posting/payment.service.line';
import { BasePaginationService } from '../../model/service/base-pagination.service';
import { PostingFilterModel } from '../bip/filter/posting.filter.model';

@Injectable({
  providedIn: 'root'
})
export class PostingServiceService extends BasePaginationService {
  private baseUrl = environment.baseURL + '/posting'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findClientPayments(config$: BehaviorSubject<IApiParams>, clientId: number): Observable<any> {
    var url = this.baseUrl + '/find/patient/' + clientId
    return this.get(config$, url)
  }
  public findClientPaymentsFiltered(config$: BehaviorSubject<IApiParams>, postingFilter: PostingFilterModel): Observable<any> {
    var url = this.baseUrl + '/find';
    return this.post(config$, url, JSON.stringify(postingFilter))
  }
  public findInsuranceCompanyPayments(insuranceCompany: number): Observable<any> {
    var url = this.baseUrl + '/find/insurance/company/' + insuranceCompany
    return this.httpClient.get(url)
  }

  public createClientPayments(paymentServiceLine: IItem[], clientId: number) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create/payments/clientId/' + clientId
    return this.httpClient.post(`${url}`, JSON.stringify(paymentServiceLine), { 'headers': headers })
  }
  public createInsuranceCompanyPayments(pateintsPaymentServiceLines: any) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create/payments/insurance/company'
    return this.httpClient.post(`${url}`, pateintsPaymentServiceLines, { 'headers': headers })
  }
}

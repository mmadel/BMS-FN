import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, from, Observable, retry, switchMap, throwError } from 'rxjs';
import { IApiParams } from '../interface/api.params';
import { PaginationData } from '../interface/pagination.data';
const httpOptions = {
  // headers: new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   Connection: 'keep-alive'
  // })
};
@Injectable({
  providedIn: 'root'
})
export class BasePaginationService {
  url: string;
  constructor(public httpClient: HttpClient) { }
  get(config$: BehaviorSubject<IApiParams>, url: string): Observable<any> {
    this.url = url;
    return config$.pipe(
      debounceTime(100),
      distinctUntilChanged(
        (previous, current) => {
          return JSON.stringify(previous) === JSON.stringify(current);
        }
      ),
      switchMap((config) => this.fetchData(config))
    );
  }
  post(config$: BehaviorSubject<IApiParams>, url: string, body: string): Observable<any> {
    this.url = url;
    return config$.pipe(
      debounceTime(100),
      distinctUntilChanged(
        (previous, current) => {
          return JSON.stringify(previous) === JSON.stringify(current);
        }
      ),
      switchMap((config) => this.fetchPostData(config, body))
    );
  }
  private fetchData(params: IApiParams): Observable<PaginationData> {
    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });
    const options = Object.keys(httpParams).length
      ? { params: httpParams, ...httpOptions }
      : { params: {}, ...httpOptions };
    return this.httpClient
      .get<PaginationData>(this.url, options)
      .pipe(
        retry({ count: 1, delay: 100000, resetOnSuccess: true }),
        catchError(this.handleHttpError)
      )
  }
  private fetchPostData(params: IApiParams, body: string): Observable<PaginationData> {
    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const options = Object.keys(httpParams).length
      ? { params: httpParams, ...httpOptions, headers: headers }
      : { params: {}, ...httpOptions };
    return this.httpClient
      .post<PaginationData>(this.url, body, options)
      .pipe(
        retry({ count: 1, delay: 100000, resetOnSuccess: true }),
        catchError(this.handleHttpError)
      )
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
  private constructURL(url: string, clinicId?: number) {
    var urlArr: string[] = url.split('/clinicId/')
    if (urlArr[1] === '') {
      return url + clinicId;
    } else {
      return urlArr[0] + '/clinicId/' + clinicId + urlArr[1]
    }
  }
}

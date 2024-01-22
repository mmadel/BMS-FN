import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseDiagnosisService {
  private baseUrl = environment.baseURL + '/case/diagnosis'
  constructor(private httpClient: HttpClient) { }

  find(term:any){
    var url:string = this.baseUrl + "/find/term/"+ term;
    return this.httpClient.get(url).pipe(tap(data => data))
  }
}

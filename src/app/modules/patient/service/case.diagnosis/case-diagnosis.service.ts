import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseDiagnosisService {
  public selectedCaseDiagnosis$: BehaviorSubject<CaseDiagnosis[] | null> = new BehaviorSubject<CaseDiagnosis[] | null>(null);
  private baseUrl = environment.baseURL + '/case/diagnosis'
  constructor(private httpClient: HttpClient) { }

  find(term:any){
    var url:string = this.baseUrl + "/find/term/"+ term;
    return this.httpClient.get(url).pipe(tap(data => data))
  }
}

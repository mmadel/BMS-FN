import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModifierRule } from '../model/modifier.rule';

@Injectable({
  providedIn: 'root'
})
export class ModifierRuleService {
  private baseUrl = environment.baseURL + '/modifier'
  constructor(private httpClient: HttpClient) { }

  create(modifierRule: ModifierRule) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/create'
    return this.httpClient.post(`${url}`, JSON.stringify(modifierRule), { 'headers': headers })
  }
  findAll() {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find'
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  findById(id:number) {
    const headers = { 'content-type': 'application/json' }
    var url = this.baseUrl + '/find/id/'+id
    return this.httpClient.get(`${url}`, { 'headers': headers })
  }
  public deleteById(id: number) {
    var url = this.baseUrl + '/delete/id/' + id
    return this.httpClient.delete(`${url}`,)
  }
}

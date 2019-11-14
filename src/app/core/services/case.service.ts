import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GridResponse } from './../../shared/components/grid/grid';
import { Case } from './../models/Case.model';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/case/${id}`);
  }

  post(casee: Case): Observable<any> {
    return this.apiService.post(`/case`, casee);
  }

  put(id: number, casee: Case): Observable<any> {
    return this.apiService.put(`/case/${id}`, casee);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/case/${id}`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/case`, params);
  }
}

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GridResponse } from './../../shared/components/grid/grid';
import { Script } from './../models/Script.model';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class ScriptService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number, params?: HttpParams, expand?: string): Observable<any> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/script/${id}`, params);
  }

  post(script: Script): Observable<any> {
    return this.apiService.post(`/script`, script);
  }

  put(id: number, script: Script): Observable<any> {
    return this.apiService.put(`/script/${id}`, script);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/script/${id}`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/script`, params);
  }
}

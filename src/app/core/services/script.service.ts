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

  get(id: number): Observable<any> {
    return this.apiService.get(`/script/${id}`);
  }

  post(script: Script): Observable<any> {
    return this.apiService.post(`/script`, script);
  }

  put(id: number, script: Script): Observable<any> {
    return this.apiService.put(`/script/${id}`, script);
  }

  query(params?: HttpParams): Observable<GridResponse> {
    return this.apiService.get(`/script`, params);
  }
}

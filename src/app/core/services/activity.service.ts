import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GridResponse } from './../../shared/components/grid/grid';
import { Activity } from './../models/Activity.model';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/Activity/${id}`);
  }

  post(activity: Activity): Observable<any> {
    return this.apiService.post(`/Activity`, activity);
  }

  put(id: number, activity: Activity): Observable<any> {
    return this.apiService.put(`/Activity/${id}`, activity);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/Activity/${id}`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/Activity`, params);
  }
}

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

  get(id: number, params?: HttpParams, expand?: string): Observable<any> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/activity/${id}`, params);
  }

  post(activity: Activity): Observable<any> {
    return this.apiService.post(`/activity`, activity);
  }

  put(id: number, activity: Activity): Observable<any> {
    return this.apiService.put(`/activity/${id}`, activity);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/activity/${id}`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/activity`, params);
  }
}

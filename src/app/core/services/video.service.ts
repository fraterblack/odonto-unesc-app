import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GridResponse } from './../../shared/components/grid/grid';
import { Video } from './../models/Video.model';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/video/${id}`);
  }

  post(video: Video): Observable<any> {
    return this.apiService.post(`/video`, video);
  }

  put(id: number, video: Video): Observable<any> {
    return this.apiService.put(`/video/${id}`, video);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/video/${id}`);
  }

  query(params?: HttpParams, expand?: string): Observable<GridResponse> {
    if (expand) {
      params = params.set('expand', expand);
    }

    return this.apiService.get(`/video`, params);
  }
}

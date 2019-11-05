import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { GridResponse, GridState } from './../../shared/components/grid/grid';
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

  query(args: GridState): Observable<GridResponse> {
    return this.apiService.get(`/video`, this.parseArgsToHttpParams(args))
      .pipe(mapToGridResponse());
  }
}

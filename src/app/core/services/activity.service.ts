import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { GridResponse, GridState } from './../../shared/components/grid/grid';
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
    return this.apiService.get(`/Lesson/${id}`);
  }

  post(activity: Activity): Observable<any> {
    return this.apiService.post(`/Lesson`, activity);
  }

  put(id: number, activity: Activity): Observable<any> {
    return this.apiService.put(`/Lesson/${id}`, activity);
  }

  query(args: GridState): Observable<GridResponse> {
    return this.apiService.get(`/Lesson`, this.parseArgsToHttpParams(args))
      .pipe(mapToGridResponse());
  }
}

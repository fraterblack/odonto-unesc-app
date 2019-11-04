import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapToGridResponse } from 'src/app/shared/rxjs-operators';

import { GridResponse, GridState } from './../../shared/components/grid/grid';
import { User } from './../models/User.model';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service {

  constructor(private apiService: ApiService) {
    super();
  }

  get(id: number): Observable<any> {
    return this.apiService.get(`/teacher/${id}`);
  }

  post(user: User): Observable<any> {
    return this.apiService.post(`/teacher`, user);
  }

  put(id: number, user: User): Observable<any> {
    return this.apiService.put(`/teacher/${id}`, user);
  }

  query(args: GridState): Observable<GridResponse> {
    return this.apiService.get(`/teacher`, this.parseArgsToHttpParams(args))
      .pipe(mapToGridResponse());
  }
}

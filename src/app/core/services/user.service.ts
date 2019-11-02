import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './../models/User.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  get(id: number): Observable<any> {
    return this.apiService.get(`/teacher/${id}`);
  }

  put(id: number, user: User): Observable<any> {
    return this.apiService.put(`/teacher/${id}`, user);
  }
}

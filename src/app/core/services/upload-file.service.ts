import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService extends Service {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  // get(id: number): Observable<any> {
  //   return this.apiService.get(`/upload/video/${id}`);
  // }

  // post(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.apiService.post(`/upload/video/`, formData);
  // }

  post(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(
      `${environment.api_url}/upload/video/`,
      formData,
      {
        observe: 'events',
        reportProgress: true
      });
  }

}

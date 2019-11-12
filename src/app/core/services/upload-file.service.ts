import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService extends Service {

  constructor(private apiService: ApiService, private http: HttpClient) {
    super();
  }

  get(fileName: string): Observable<any> {
    return this.apiService.get(`${environment.api_url}/upload/video/${fileName}`);
  }

  post(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(
      `${environment.api_url}/upload/video/`,
      formData,
      {
        observe: 'events',
        reportProgress: true
      })
      .pipe(catchError(this.apiService.formatErrors));
  }

}

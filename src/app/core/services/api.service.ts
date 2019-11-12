import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  formatErrors(error: any) {
    // Try to extract error message from returned error
    if (error.error && error.error.detalhes && error.error.detalhes instanceof Object) {
      if (error.error.detalhes.errors) {
        return throwError(error.error.detalhes.errors[0].message);
      }

      return throwError(error.error.detalhes.erro);
    }

    // Workaround: Remove after standarize error returns from API
    if (error.error && error.error.erro && error.error.erro.erro) {
      return throwError(error.error.erro.erro);
    }

    // Workaround: Remove after standarize error returns from API
    if (error.error instanceof Object) {
      return throwError(error.message);
    }

    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}

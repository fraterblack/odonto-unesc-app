import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { shareReplay, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

export enum AuthenticationType {
  ADMINISTRATOR = 'admin',
  MANAGER = 'manager',
  STUDENT = 'student'
}

export enum SessionName {
  ID = 'id',
  NAME = 'name',
  TOKEN = 'token',
  TYPE = 'type',
  EXPIRE_AT = 'expires_at'
}

export interface JWTPayload {
  id: number;
  name: string;
  code: number;
  type: AuthenticationType;
  issued_at: number;
  expire_at: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Login Administrator user
   * @param code User code
   * @param password User password
   */
  loginAdministrator(code: string, password: string) {
    return this.http.post(`${environment.authApiUrl}/signin`, { code, password })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem(SessionName.TOKEN);
    localStorage.removeItem(SessionName.ID);
    localStorage.removeItem(SessionName.NAME);
    localStorage.removeItem(SessionName.TYPE);
    localStorage.removeItem(SessionName.EXPIRE_AT);
  }

  /**
   * Get active token
   *
   * @returns string
   */
  getToken(): any {
    return localStorage.getItem(SessionName.TOKEN);
  }

  /**
   * Get authentication expiration
   *
   * @returns moment.Moment
   */
  getExpiration(): moment.Moment {
    const expiration = localStorage.getItem(SessionName.EXPIRE_AT);

    if (!expiration) {
      return null;
    }

    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  /**
   * Verify if user is authenticated is logged in
   *
   * @returns boolean
   */
  isLoggedIn(): boolean {
    if (!this.getExpiration()) {
      return false;
    }

    return moment().isBefore(this.getExpiration());
  }

  /**
   * Verify if user is authenticated is logged out
   *
   * @returns boolean
   */
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  /**
   * Verify if authenticated user is a administrator
   *
   * @returns boolean
   */
  isAdminLoggedIn(): boolean {
    return this.isLoggedIn() && localStorage.getItem(SessionName.TYPE) === AuthenticationType.ADMINISTRATOR;
  }

  /**
   * Verify if authenticated user is a manager (Has permission to manage other users)
   *
   * @returns boolean
   */
  isManagerLoggedIn(): boolean {
    return this.isLoggedIn() && localStorage.getItem(SessionName.TYPE) === AuthenticationType.MANAGER;
  }

  /**
   * Verify if authenticated user is a student
   *
   * @returns boolean
   */
  isStudentLoggedIn(): boolean {
    return this.isLoggedIn() && localStorage.getItem(SessionName.TYPE) === AuthenticationType.STUDENT;
  }

  private setSession(result: any) {
    const token = result.token;
    const payload = jwtDecode(token) as JWTPayload;
    const expireAt = moment.unix(payload.expire_at);

    localStorage.setItem(SessionName.TOKEN, result.token);
    localStorage.setItem(SessionName.ID, payload.id.toString());
    localStorage.setItem(SessionName.NAME, payload.name);
    localStorage.setItem(SessionName.TYPE, payload.type);
    localStorage.setItem(SessionName.EXPIRE_AT, JSON.stringify(expireAt.valueOf()));
  }
}

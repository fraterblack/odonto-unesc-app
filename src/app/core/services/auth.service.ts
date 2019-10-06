import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private studentAuthenticated = true; // TODO: Change to false when implemented all authentication logic
  private adminAuthenticated = true; // TODO: Change to false when implemented all authentication logic

  constructor() {}

  authenticateUser() {
    // TODO: Create logic to authenticate user
    this.studentAuthenticated = true;
    this.adminAuthenticated = true;
  }

  isStudentAuthenticated(): boolean {
    return this.studentAuthenticated;
  }

  isAdminAuthenticated(): boolean {
    return this.adminAuthenticated;
  }
}

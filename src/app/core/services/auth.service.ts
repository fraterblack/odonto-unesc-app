import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = true; // TODO: Change to false when implemented all authentication logic

  constructor() {}

  authenticateUser() {
    this.logged = true;
  }

  isUserAuthenticated(): boolean {
    return this.logged;
  }
}

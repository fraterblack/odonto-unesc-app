import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.hasPermission();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.hasPermission();
  }

  hasPermission(): boolean {
    if (this.authService.isManagerLoggedIn()) {
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/auth/login']);

    return false;
  }
}

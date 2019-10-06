import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanLoad {
  constructor() {}

  canActivate(): boolean {
    return true;
  }

  canLoad(): boolean {
    return true;
  }
}

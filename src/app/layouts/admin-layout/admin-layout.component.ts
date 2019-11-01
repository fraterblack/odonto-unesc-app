import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnDestroy {
  authService: AuthService;

  private mdSizeQuery: MediaQueryList;
  private mdSizeQueryListener: () => void;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, authService: AuthService, media: MediaMatcher) {
    this.authService = authService;

    this.mdSizeQueryListener = () => changeDetectorRef.detectChanges();

    this.mdSizeQuery = media.matchMedia('(max-width: 1024px)');
    this.mdSizeQuery.addEventListener('change', this.mdSizeQueryListener);
  }

  hideSideNav(): boolean {
    return this.mdSizeQuery.matches;
  }

  ngOnDestroy(): void {
    this.mdSizeQuery.removeEventListener('change', this.mdSizeQueryListener);
  }

  onLogout() {
    this.router.navigate(['auth/logout']);
  }
}

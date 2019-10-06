import { ActivityLayoutComponent } from './layouts/activity-layout/activity-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FeaturedMessageLayoutComponent } from './layouts/featured-message-layout/featured-message-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  // ACTIVITY - Student Area
  {
    path: '',
    component: ActivityLayoutComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: 'activity',
        loadChildren: () =>
          import('./modules/student/activity/activity.module').then(m => m.StudentActivityModule)
      }
    ]
  },
  // ADMIN - Teacher Area
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      // HOME
      {
        path: '',
        loadChildren: () =>
          import('./modules/admin/home/home.module').then(m => m.AdminHomeModule)
      },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error',
    component: FeaturedMessageLayoutComponent,
    loadChildren: () =>
      import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: '/error/not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

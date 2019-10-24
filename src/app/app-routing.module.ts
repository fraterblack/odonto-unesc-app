import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from './core/guards/admin-auth.guard';
import { StudentAuthGuard } from './core/guards/student-auth.guard';
import { ActivityLayoutComponent } from './layouts/activity-layout/activity-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FeaturedMessageLayoutComponent } from './layouts/featured-message-layout/featured-message-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  // STUDENT AREA - Activities
  {
    path: '',
    component: ActivityLayoutComponent,
    canActivate: [StudentAuthGuard],
    canLoad: [StudentAuthGuard],
    children: [
      {
        path: 'activity',
        loadChildren: () =>
          import('./modules/student/student.module').then(m => m.StudentModule)
      }
    ]
  },
  // ADMIN - Teacher Area
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/admin/admin.module').then(m => m.AdminModule)
      }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/home',
    pathMatch: 'full'
  },
  // HOME
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  },
  // ACTIVITIES
  {
    path: 'activities',
    loadChildren: () =>
      import('./activities/activities.module').then(m => m.ActivitiesModule)
  },
  // SCRIPTS
  {
    path: 'scripts',
    loadChildren: () =>
      import('./scripts/scripts.module').then(m => m.ScriptsModule)
  },
  // CASES
  {
    path: 'cases',
    loadChildren: () =>
      import('./cases/cases.module').then(m => m.CasesModule)
  },
  // VIDEOS
  {
    path: 'videos',
    loadChildren: () =>
      import('./videos/videos.module').then(m => m.VideosModule)
  },
  // USERS
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then(m => m.UsersModule)
  },
  // SETTINGS
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(m => m.SettingsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AdminAuthGuard } from './guards/admin-auth.guard';
import { ManagerAuthGuard } from './guards/manager-auth.guard';
import { throwIfAlreadyLoaded } from './guards/module-load.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { StudentAuthGuard } from './guards/student-auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    StudentAuthGuard,
    AdminAuthGuard,
    ManagerAuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

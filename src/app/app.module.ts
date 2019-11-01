import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ActivityLayoutComponent } from './layouts/activity-layout/activity-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminNavMenuComponent } from './layouts/admin-nav-menu/admin-nav-menu.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FeaturedMessageLayoutComponent } from './layouts/featured-message-layout/featured-message-layout.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ActivityLayoutComponent,
    AppComponent,
    AuthLayoutComponent,
    FeaturedMessageLayoutComponent,
    AdminNavMenuComponent
  ],
  imports: [
    // angular
    BrowserModule,

    // 3rd party
    BrowserAnimationsModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

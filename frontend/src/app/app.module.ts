import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryLayoutModule } from './layouts/primary-layout/primary-layout.module';
import { LandingModule } from './landing/landing.module';
import { LandingLayoutModule } from './layouts/landing-layout/landing-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './auth/services/auth-interceptor.service';
import { sessionInterceptorProviders } from './auth/services/session-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PrimaryLayoutModule,
    LandingLayoutModule,
    LandingModule,
  ],
  bootstrap: [AppComponent],
  providers: [authInterceptorProviders, sessionInterceptorProviders],
})
export class AppModule {}

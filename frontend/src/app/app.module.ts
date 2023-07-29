import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryLayoutModule } from './layouts/primary-layout/primary-layout.module';
import { LandingModule } from './landing/landing.module';
import { LandingLayoutModule } from './layouts/landing-layout/landing-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimaryLayoutModule,
    LandingLayoutModule,
    LandingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

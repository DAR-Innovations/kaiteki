import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { provideCharts, withDefaultRegisterables } from 'ng2-charts'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { authInterceptorProviders } from './auth/services/auth-interceptor.service'
import { LandingModule } from './landing/landing.module'
import { LandingLayoutModule } from './shared/layouts/landing-layout/landing-layout.module'
import { PrimaryLayoutModule } from './shared/layouts/primary-layout/primary-layout.module'
import { SharedModule } from './shared/shared.module'

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
	providers: [authInterceptorProviders, provideCharts(withDefaultRegisterables())],
})
export class AppModule {}

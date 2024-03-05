import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgxWebrtcModule } from 'ngx-webrtc'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { authInterceptorProviders } from './auth/services/auth-interceptor.service'
import { LandingModule } from './landing/landing.module'
import { LandingLayoutModule } from './layouts/landing-layout/landing-layout.module'
import { PrimaryLayoutModule } from './layouts/primary-layout/primary-layout.module'
import { SharedModule } from './shared/shared.module'

registerLocaleData(navigator.language)

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgxWebrtcModule.forRoot({
			userIdentifier: 'id',
			debug: true,
		}),
		SharedModule,
		PrimaryLayoutModule,
		LandingLayoutModule,
		LandingModule,
	],
	bootstrap: [AppComponent],
	providers: [
		authInterceptorProviders,
		{ provide: LOCALE_ID, useValue: navigator.language },
	],
})
export class AppModule {}

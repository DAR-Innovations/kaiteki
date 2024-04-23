import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'
import { NgModule, inject } from '@angular/core'
import { BrowserModule, provideClientHydration } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import {
	Router,
	createUrlTreeFromSnapshot,
	provideRouter,
	withInMemoryScrolling,
	withViewTransitions,
} from '@angular/router'

import player from 'lottie-web'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { provideLottieOptions } from 'ngx-lottie'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { authInterceptorProviders } from './auth/services/auth-interceptor.service'
import { LandingModule } from './landing/landing.module'
import { routes } from './routes'
import { LandingLayoutModule } from './shared/layouts/landing-layout/landing-layout.module'
import { PrimaryLayoutModule } from './shared/layouts/primary-layout/primary-layout.module'
import { RxStompService, rxStompServiceFactory } from './shared/services/rx-stomp.service'
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
	providers: [
		authInterceptorProviders,
		provideCharts(withDefaultRegisterables()),
		{ provide: RxStompService, useFactory: rxStompServiceFactory },
		provideRouter(
			routes,
			withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
			withViewTransitions({
				onViewTransitionCreated: ({ transition, to }) => {
					const router = inject(Router)
					const toTree = createUrlTreeFromSnapshot(to, [])
					if (
						router.isActive(toTree, {
							paths: 'exact',
							matrixParams: 'exact',
							fragment: 'ignored',
							queryParams: 'ignored',
						})
					) {
						transition.skipTransition()
					}
				},
			}),
		),
		provideClientHydration(),
		provideHttpClient(withFetch()),
		provideAnimationsAsync(),
		provideLottieOptions({
			player: () => player,
		}),
	],
})
export class AppModule {}

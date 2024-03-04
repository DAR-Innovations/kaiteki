import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { inject as injectVercelAnalytics } from '@vercel/analytics'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
	enableProdMode()
	injectVercelAnalytics()
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.error(err))

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { inject as injectVercelAnalytics } from '@vercel/analytics';

if (environment.production) {
  enableProdMode();
  injectVercelAnalytics();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

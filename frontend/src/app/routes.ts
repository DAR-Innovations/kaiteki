import { Routes } from '@angular/router'

import { ErrorPageComponent } from './error-page/error-page.component'
import { LandingComponent } from './landing/landing.component'
import { LandingLayoutComponent } from './shared/layouts/landing-layout/landing-layout.component'
import { PrimaryLayoutComponent } from './shared/layouts/primary-layout/primary-layout.component'

export const routes: Routes = [
	{
		path: '',
		component: LandingLayoutComponent,
		children: [
			{
				path: '',
				component: LandingComponent,
			},
		],
	},
	{
		path: 'hub',
		component: PrimaryLayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'overview',
			},
			{
				path: 'teams/:teamId',
				loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule),
				title: 'Teams | Kaiteki',
			},
			{
				path: 'overview',
				loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
				title: 'Overview | Kaiteki',
			},
			{
				path: 'notes',
				loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule),
				title: 'Notes | Kaiteki',
			},
			{
				path: 'events',
				loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
				title: 'Events | Kaiteki',
			},
			{
				path: 'integrations',
				loadChildren: () =>
					import('./integrations/integrations.module').then(m => m.IntegrationsModule),
				title: 'Integrations | Kaiteki',
			},
			{
				path: 'kaizen',
				loadChildren: () => import('./kaizen/kaizen.module').then(m => m.KaizenModule),
				title: 'Kaizen | Kaiteki',
			},
		],
	},
	{
		path: '',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
		title: 'Auth | Kaiteki',
	},
	{ path: 'error', component: ErrorPageComponent, title: 'Error | Kaiteki' },
	{ path: '**', redirectTo: 'error' },
]

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PrimaryLayoutComponent } from './layouts/primary-layout/primary-layout.component';
import { LandingComponent } from './landing/landing.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';

const routes: Routes = [
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
        loadChildren: () =>
          import('./teams/teams.module').then((m) => m.TeamsModule),
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('./overview/overview.module').then((m) => m.OverviewModule),
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('./notes/notes.module').then((m) => m.NotesModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'integrations',
        loadChildren: () =>
          import('./integrations/integrations.module').then(
            (m) => m.IntegrationsModule
          ),
      },
      {
        path: 'kaizen',
        loadChildren: () =>
          import('./kaizen/kaizen.module').then((m) => m.KaizenModule),
      },
    ],
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

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
    path: '',
    component: PrimaryLayoutComponent,
    children: [
      {
        path: 'teams',
        loadChildren: () =>
          import('./teams/teams.module').then((m) => m.TeamsModule),
      },
    ],
  },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

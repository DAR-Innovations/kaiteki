import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationsListComponent } from './pages/integrations-list/integrations-list.component';
import { IntegrationsLayoutComponent } from './pages/integrations-layout/integrations-layout.component';

const routes: Routes = [
  {
    path: '',
    component: IntegrationsLayoutComponent,
    children: [
      { path: '', component: IntegrationsListComponent },
      {
        path: 'spotify',
        loadChildren: () =>
          import('./submodules/spotify/spotify.module').then(
            (m) => m.SpotifyModule
          ),
      },
      {
        path: 'github',
        loadChildren: () =>
          import('./submodules/github/github.module').then(
            (m) => m.GithubModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntegrationsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyDashboardComponent } from './pages/spotify-dashboard/spotify-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SpotifyDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpotifyRoutingModule {}

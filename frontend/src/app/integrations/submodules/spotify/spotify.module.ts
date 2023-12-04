import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpotifyRoutingModule } from './spotify-routing.module';
import { SpotifyDashboardComponent } from './pages/spotify-dashboard/spotify-dashboard.component';

@NgModule({
  declarations: [SpotifyDashboardComponent],
  imports: [CommonModule, SharedModule, SpotifyRoutingModule],
})
export class SpotifyModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpotifyRoutingModule } from './spotify-routing.module';
import { SpotifyDashboardComponent } from './pages/spotify-dashboard/spotify-dashboard.component';
import { SpotifyPlaylistComponent } from './pages/spotify-playlist/spotify-playlist.component';
import { PlaylistSongsComponent } from './components/playlist-songs/playlist-songs.component';
import { DashboardPlaylistItemComponent } from './pages/spotify-dashboard/components/dashboard-playlist-item/dashboard-playlist-item.component';
import { SpotifyPlayerComponent } from './components/spotify-player/spotify-player.component';

@NgModule({
  declarations: [
    SpotifyDashboardComponent,
    SpotifyPlaylistComponent,
    PlaylistSongsComponent,
    DashboardPlaylistItemComponent,
    SpotifyPlayerComponent,
  ],
  imports: [CommonModule, SharedModule, SpotifyRoutingModule],
})
export class SpotifyModule {}

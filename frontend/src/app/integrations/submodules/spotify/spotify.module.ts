import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { PlaylistSongsComponent } from './components/playlist-songs/playlist-songs.component'
import { SpotifyPlayerComponent } from './components/spotify-player/spotify-player.component'
import { SpotifyAuthComponent } from './pages/spotify-auth/spotify-auth.component'
import { DashboardPlaylistItemComponent } from './pages/spotify-dashboard/components/dashboard-playlist-item/dashboard-playlist-item.component'
import { SpotifyDashboardComponent } from './pages/spotify-dashboard/spotify-dashboard.component'
import { SpotifyPlaylistComponent } from './pages/spotify-playlist/spotify-playlist.component'
import { spotifySessionInterceptorProvider } from './services/spotify-session.service'
import { SpotifyRoutingModule } from './spotify-routing.module'

@NgModule({
	declarations: [
		SpotifyDashboardComponent,
		SpotifyPlaylistComponent,
		PlaylistSongsComponent,
		DashboardPlaylistItemComponent,
		SpotifyPlayerComponent,
		SpotifyAuthComponent,
	],
	imports: [CommonModule, SharedModule, SpotifyRoutingModule],
	exports: [SpotifyPlayerComponent],
	providers: [spotifySessionInterceptorProvider],
})
export class SpotifyModule {}

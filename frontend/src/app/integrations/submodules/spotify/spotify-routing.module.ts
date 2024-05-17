import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SpotifyAuthComponent } from './pages/spotify-auth/spotify-auth.component'
import { SpotifyDashboardComponent } from './pages/spotify-dashboard/spotify-dashboard.component'
import { SpotifyPlaylistComponent } from './pages/spotify-playlist/spotify-playlist.component'

const routes: Routes = [
	{
		path: '',
		component: SpotifyDashboardComponent,
		title: 'Spotify Dashboard | Kaiteki',
	},
	{
		path: 'auth',
		component: SpotifyAuthComponent,
		title: 'Spotify Auth | Kaiteki',
	},
	{
		path: 'playlist/:playlistId',
		component: SpotifyPlaylistComponent,
		title: 'Spotify Playlist | Kaiteki',
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SpotifyRoutingModule {}

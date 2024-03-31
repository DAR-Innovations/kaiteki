import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SpotifyAuthComponent } from './pages/spotify-auth/spotify-auth.component'
import { SpotifyDashboardComponent } from './pages/spotify-dashboard/spotify-dashboard.component'
import { SpotifyPlaylistComponent } from './pages/spotify-playlist/spotify-playlist.component'

const routes: Routes = [
	{
		path: '',
		component: SpotifyDashboardComponent,
	},
	{
		path: 'auth',
		component: SpotifyAuthComponent,
	},
	{
		path: 'playlist/:playlistId',
		component: SpotifyPlaylistComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SpotifyRoutingModule {}

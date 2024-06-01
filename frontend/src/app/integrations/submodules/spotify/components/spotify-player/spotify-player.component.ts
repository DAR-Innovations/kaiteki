import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'

import { ToastService } from 'src/app/shared/services/toast.service'

import { SpotifyArtistSimplified, SpotifyTrack } from '../../models/spotify.model'
import { SpotifyPlayerService } from '../../services/spotify-player.service'

@Component({
	selector: 'app-spotify-player',
	templateUrl: './spotify-player.component.html',
	styleUrls: ['./spotify-player.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyPlayerComponent implements OnInit {
	currentTrack: SpotifyTrack | null = null

	expand = true

	constructor(
		private spotifyPlayerService: SpotifyPlayerService,
		private toastService: ToastService,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.spotifyPlayerService.currentTrack$.subscribe(track => {
			this.currentTrack = track
			this.cd.detectChanges()
		})
	}

	toggleExpandPlayer() {
		this.expand = !this.expand
	}

	getArtistsNames(artists: SpotifyArtistSimplified[]) {
		return artists.map(a => a.name).join(', ')
	}
}

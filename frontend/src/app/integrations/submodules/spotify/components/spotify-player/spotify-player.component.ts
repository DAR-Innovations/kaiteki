import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'

import { catchError, finalize, take, tap, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { SpotifyCurrentlyPlayingContext } from '../../models/spotify-player.model'
import { SpotifyArtistSimplified, SpotifyTrack } from '../../models/spotify.model'
import { SpotifyPlayerService } from '../../services/spotify-player.service'

@Component({
	selector: 'app-spotify-player',
	templateUrl: './spotify-player.component.html',
	styleUrls: ['./spotify-player.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyPlayerComponent implements OnInit {
	isLoading = true

	track: SpotifyTrack | null = null
	player: SpotifyCurrentlyPlayingContext | null = null

	isPlaying = false
	progress = 0
	volume = 0
	expand = false

	constructor(
		private spotifyPlayerService: SpotifyPlayerService,
		private toastService: ToastService,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.loadCurrentState()
	}

	toggleExpandPlayer() {
		this.expand = !this.expand
	}

	private loadCurrentState() {
		this.spotifyPlayerService
			.getPlaybackState()
			.pipe(
				tap(() => {
					this.isLoading = true
				}),
				catchError(err => {
					this.toastService.error('Failed to get current playing spotify song')
					return throwError(() => err)
				}),
				finalize(() => {
					this.isLoading = false
				}),
				take(1),
			)
			.subscribe(player => {
				this.player = player
				this.track = player.item

				this.isPlaying = player.is_playing
				this.volume = player.device.volume_percent
				this.progress = player.progress_ms

				this.cd.markForCheck()
			})
	}

	handlePlayPause() {
		// this.spotifyService.getMyCurrentPlaybackState().subscribe((data) => {
		//   if (data.body.is_playing) {
		//     this.spotifyService.pause();
		//     this.isSongPlaying = false;
		//   } else {
		//     this.spotifyService.play();
		//     this.isSongPlaying = true;
		//   }
		// });
	}

	handleVolumeButtons() {
		this.spotifyPlayerService.setPlaybackVolume(this.volume === 0 ? 50 : 0)
	}

	getArtistsNames(artists: SpotifyArtistSimplified[]) {
		return artists.map(a => a.name).join(', ')
	}
}

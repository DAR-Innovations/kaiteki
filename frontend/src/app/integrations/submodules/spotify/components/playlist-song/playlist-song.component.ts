import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-playlist-song',
  templateUrl: './playlist-song.component.html',
  styleUrls: ['./playlist-song.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistSongComponent {
  // TODO: Change this any type to song interface
  @Input() song: any = null;
  @Input() order: number = 0;

  convertSecondsToMinuteString(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const remainingSeconds = durationSeconds % 60;
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${minutes}:${formattedSeconds}`;
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingRoomComponent {
  micActive = false;
  cameraActive = false;
  shareScreenActive = false;

  onToggleMic() {
    this.micActive = !this.micActive;
  }

  onToggleCamera() {
    this.cameraActive = !this.cameraActive;
  }

  onToggleScreenShare() {
    this.shareScreenActive = !this.shareScreenActive;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { MeetingsRoutingModule } from './meetings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { MeetingsSelectedDialogComponent } from './components/meetings-selected-dialog/meetings-selected-dialog.component';

@NgModule({
  declarations: [MeetingsComponent, MeetingRoomComponent, MeetingsSelectedDialogComponent],
  imports: [CommonModule, SharedModule, MeetingsRoutingModule],
})
export class MeetingsModule {}

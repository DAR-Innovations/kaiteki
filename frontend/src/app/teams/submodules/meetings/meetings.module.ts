import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { MeetingsRoutingModule } from './meetings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { MeetingsSelectedDialogComponent } from './components/meetings-selected-dialog/meetings-selected-dialog.component';
import { CreateMeetingDialogComponent } from './components/create-meeting-dialog/create-meeting-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MeetingsToolbarComponent } from './components/meetings-toolbar/meetings-toolbar.component';
import { MeetingListItemComponent } from './components/meeting-list-item/meeting-list-item.component';

@NgModule({
  declarations: [
    MeetingsComponent,
    MeetingRoomComponent,
    MeetingsSelectedDialogComponent,
    CreateMeetingDialogComponent,
    MeetingsToolbarComponent,
    MeetingListItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MeetingsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class MeetingsModule {}

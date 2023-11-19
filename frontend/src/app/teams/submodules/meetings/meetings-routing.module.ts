import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingsComponent,
  },
  {
    path: ':id',
    component: MeetingRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsRoutingModule {}

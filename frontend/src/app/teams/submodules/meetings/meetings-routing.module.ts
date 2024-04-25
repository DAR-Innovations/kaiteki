import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component'
import { MeetingsComponent } from './pages/meetings/meetings.component'

const routes: Routes = [
	{
		path: '',
		component: MeetingsComponent,
	},
	{
		path: ':meetingId',
		component: MeetingRoomComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MeetingsRoutingModule {}

import { CommonModule } from '@angular/common'
import { Injectable, NgModule } from '@angular/core'

import {
	CalendarDateFormatter,
	CalendarModule,
	CalendarNativeDateFormatter,
	DateAdapter,
	DateFormatterParams,
} from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'

import { SharedModule } from 'src/app/shared/shared.module'

import { CreateMeetingDialogComponent } from './components/dialogs/create-meeting-dialog/create-meeting-dialog.component'
import { MeetingsSelectedDialogComponent } from './components/dialogs/meetings-selected-dialog/meetings-selected-dialog.component'
import { MeetingsFilterComponent } from './components/meetings-filter/meetings-filter.component'
import { MeetingsToolbarComponent } from './components/meetings-toolbar/meetings-toolbar.component'
import { MeetingsCalendarViewComponent } from './components/views/meetings-calendar-view/meetings-calendar-view.component'
import { MeetingListItemComponent } from './components/views/meetings-list-view/components/meeting-list-item/meeting-list-item.component'
import { MeetingsListViewComponent } from './components/views/meetings-list-view/meetings-list-view.component'
import { MeetingsRoutingModule } from './meetings-routing.module'
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component'
import { MeetingsComponent } from './pages/meetings/meetings.component'

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {
	public override weekViewHour({ date, locale }: DateFormatterParams): string {
		return new Intl.DateTimeFormat('pt-BR', {
			hour: 'numeric',
			hour12: false,
			minute: 'numeric',
			hourCycle: 'h23',
		}).format(date)
	}
}

@NgModule({
	declarations: [
		MeetingsComponent,
		MeetingRoomComponent,
		MeetingsSelectedDialogComponent,
		CreateMeetingDialogComponent,
		MeetingsToolbarComponent,
		MeetingListItemComponent,
		MeetingsFilterComponent,
		MeetingsCalendarViewComponent,
		MeetingsListViewComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		MeetingsRoutingModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory,
		}),
	],
	providers: [
		{ provide: CalendarDateFormatter, useClass: CustomDateFormatter },
	],
})
export class MeetingsModule {}

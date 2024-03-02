import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { MeetingsRoutingModule } from './meetings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { MeetingsSelectedDialogComponent } from './components/dialogs/meetings-selected-dialog/meetings-selected-dialog.component';
import { CreateMeetingDialogComponent } from './components/dialogs/create-meeting-dialog/create-meeting-dialog.component';
import { MeetingsToolbarComponent } from './components/meetings-toolbar/meetings-toolbar.component';
import { MeetingListItemComponent } from './components/views/meetings-list-view/components/meeting-list-item/meeting-list-item.component';
import { MeetingsFilterComponent } from './components/meetings-filter/meetings-filter.component';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { MeetingsCalendarViewComponent } from './components/views/meetings-calendar-view/meetings-calendar-view.component';
import { MeetingsListViewComponent } from './components/views/meetings-list-view/meetings-list-view.component';

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: 'numeric',
      hour12: false,
      minute: 'numeric',
      hourCycle: 'h23',
    }).format(date);
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
    // provideMomentDatetimeAdapter({
    //   parse: {
    //     dateInput: 'YYYY-MM-DD',
    //     monthInput: 'MMMM',
    //     yearInput: 'YYYY',
    //     timeInput: 'HH:mm',
    //     datetimeInput: 'YYYY-MM-DD HH:mm',
    //   },
    //   display: {
    //     dateInput: 'YYYY-MM-DD',
    //     monthInput: 'MMMM',
    //     yearInput: 'YYYY',
    //     timeInput: 'HH:mm',
    //     datetimeInput: 'YYYY-MM-DD HH:mm',
    //     monthYearLabel: 'YYYY MMMM',
    //     dateA11yLabel: 'LL',
    //     monthYearA11yLabel: 'MMMM YYYY',
    //     popupHeaderDateLabel: 'MMM DD, ddd',
    //   },
    // }),
  ],
})
export class MeetingsModule {}

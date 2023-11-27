import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventsToolbarComponent } from './components/events-toolbar/events-toolbar.component';
import { EventsFilterComponent } from './components/events-filter/events-filter.component';
import { EventsMonthViewComponent } from './components/views/events-month-view/events-month-view.component';
import { EventsWeekViewComponent } from './components/views/events-week-view/events-week-view.component';
import { EventsDayViewComponent } from './components/views/events-day-view/events-day-view.component';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SelectedEventDialogComponent } from './components/dialogs/selected-event-dialog/selected-event-dialog.component';

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: 'numeric',
      hour12: false,
      minute: 'numeric',
      hourCycle: 'h23',
    }).format(date);
  }

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
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
    EventsListComponent,
    EventsToolbarComponent,
    EventsFilterComponent,
    EventsMonthViewComponent,
    EventsWeekViewComponent,
    EventsDayViewComponent,
    SelectedEventDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
  ],
})
export class EventsModule {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MeetingDTO,
  MeetingsFilter,
  MeetingsView,
} from '../../models/meetings.types';
import { of, Observable } from 'rxjs';
import { addDays, addHours, startOfDay, subDays, subHours } from 'date-fns';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsComponent {
  filter: MeetingsFilter = {};
  views = MeetingsView;

  meetings$: Observable<MeetingDTO[]> = of([
    {
      id: 1,
      title: 'Meeting with SentineOne',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      status: 'In proccess',
    },
    {
      id: 2,
      title: 'Standup for developers',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      start: subHours(startOfDay(new Date()), 4),
      end: addHours(new Date(), 0),
      status: 'Planned',
    },
    {
      id: 3,
      title: 'Standup for developers',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      start: subHours(startOfDay(new Date()), 4),
      status: 'Planned',
    },
    {
      id: 4,
      title: 'Meeting with SentineOne',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      start: subDays(startOfDay(new Date()), 2),
      status: 'In proccess',
    },
    {
      id: 5,
      title: 'Standup for developers',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      start: addDays(startOfDay(new Date()), 2),
      end: addDays(new Date(), 2),
      status: 'Planned',
    },
  ]);

  onFilter(filter: MeetingsFilter) {
    this.filter = filter;
  }
}

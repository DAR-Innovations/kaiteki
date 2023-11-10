import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsComponent {
  selectedMeeting: any = null;

  meetings: any[] = [
    {
      id: 1,
      title: 'Meeting with SentineOne',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      date: new Date(),
      status: 'In proccess',
    },
    {
      id: 2,
      title: 'Standup for developers',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      date: new Date(),
      status: 'Planned',
    },
    {
      id: 3,
      title: 'Standup for developers',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
      date: new Date(),
      status: 'Planned',
    },
  ];
}

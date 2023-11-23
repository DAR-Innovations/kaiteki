import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MeetingDTO } from '../../../models/meetings.types';

@Component({
  selector: 'app-meetings-list-view',
  templateUrl: './meetings-list-view.component.html',
  styleUrls: ['./meetings-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsListViewComponent {
  @Input() meetings: MeetingDTO[] = [];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-events-toolbar',
  templateUrl: './events-toolbar.component.html',
  styleUrls: ['./events-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsToolbarComponent {
  onCreateButtonClick(event: Event) {}
}

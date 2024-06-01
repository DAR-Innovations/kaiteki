import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrl: './notifications.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-selected-event-dialog',
	templateUrl: './selected-event-dialog.component.html',
	styleUrls: ['./selected-event-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedEventDialogComponent {}

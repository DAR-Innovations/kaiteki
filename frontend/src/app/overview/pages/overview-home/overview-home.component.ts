import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-overview-home',
	templateUrl: './overview-home.component.html',
	styleUrls: ['./overview-home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewHomeComponent {}

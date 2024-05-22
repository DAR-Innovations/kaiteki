import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-github-dashboard',
	templateUrl: './github-dashboard.component.html',
	styleUrl: './github-dashboard.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubDashboardComponent {}

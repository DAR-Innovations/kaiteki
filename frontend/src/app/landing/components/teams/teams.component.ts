import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent {
	imageSrc =
		'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

	features = [
		{
			title: 'Real-time Collaboration',
			body: 'Edit documents, assign tasks, and share updates simultaneously for a seamless team workflow',
			icon: 'wechat',
		},
		{
			title: 'Shared Workspaces',
			body: ' Organize project files, discussions, and tasks in one shared space for easy access and collaboration',
			icon: 'workspaces',
		},
		{
			title: 'Kanban Boards & Visual Workflows',
			body: 'Visualize project progress with Kanban boards, track task movement, and identify potential bottlenecks',
			icon: 'space_dashboard',
		},
	]
}

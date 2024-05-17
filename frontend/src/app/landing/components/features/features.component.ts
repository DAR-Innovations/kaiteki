import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-features',
	templateUrl: './features.component.html',
	styleUrls: ['./features.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
	features = [
		{
			title: 'Tasks',
			body: 'Keep track of tasks, deadlines, and progress in one central location.',
			icon: 'task_alt',
		},
		{
			title: 'Chatting',
			body: 'Collaborate with your team in real-time through built-in chat.',
			icon: 'chat',
		},
		{
			title: 'Meetings',
			body: 'Schedule meetings directly within the platform and invite team members.',
			icon: 'desktop_mac',
		},
		{
			title: 'Analytics',
			body: 'Track progress, identify bottlenecks, and make informed decisions with clear visualizations.',
			icon: 'auto_graph',
		},
		{
			title: 'Integrations',
			body: 'Integrate seamlessly with the apps you already use for a unified workflow.',
			icon: 'extension',
		},
		{
			title: 'AI assistant',
			body: 'Automate repetitive tasks, receive reminders, and get help with task management through AI.',
			icon: 'auto_awesome',
		},
	]
}

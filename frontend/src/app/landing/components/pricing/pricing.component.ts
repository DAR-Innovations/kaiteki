import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-pricing',
	templateUrl: './pricing.component.html',
	styleUrl: './pricing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
	plans = [
		{
			title: 'Free',
			price: 0,
			features: [
				'Team size 3',
				'File storage 5 GB',
				'Tasks',
				'Chats',
				'Posts',
				'Analytics',
				'Events',
			],
		},
		{
			title: 'Standard',
			price: 22.99,
			features: [
				'Team size 7',
				'File storage 15 GB',
				'Tasks',
				'Chats',
				'Meetings',
				'Posts',
				'Analytics',
				'AI features',
				'Events',
			],
			highlight: true,
		},
		{
			title: 'Pro',
			price: 49.99,
			features: [
				'Team size unlimited',
				'File storage 30 GB',
				'Tasks',
				'Chats',
				'Meetings',
				'Posts',
				'Analytics',
				'AI features',
				'Events',
				'Whiteboard',
			],
		},
	]
}

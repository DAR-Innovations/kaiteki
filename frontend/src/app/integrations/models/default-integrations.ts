export const DEFAULT_INTEGRATIONS = {
	github: {
		id: 1,
		name: 'GitHub',
		description:
			'Access your GitHub repositories with real-time monitoring of recent activities, pull requests and issues',
		connected: false,
		icon: 'github',
		onConnect: () => console.log('Connect GitHub'),
		onDisconnect: () => console.log('Disconnect GitHub'),
	},
	spotify: {
		id: 2,
		name: 'Spotify',
		description:
			'Digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world',
		connected: false,
		icon: 'spotify',
		onConnect: () => console.log('Connect Spotify'),
		onDisconnect: () => console.log('Disconnect Spotify'),
	},
	telegram: {
		id: 3,
		name: 'Telegram',
		description:
			'Monitor your tasks and scheduled meetings using integration with cloud-based instant messaging app Telegram',
		connected: false,
		icon: 'telegram',
		onConnect: () => console.log('Connect Telegram'),
		onDisconnect: () => console.log('Disconnect Telegram'),
	},
}

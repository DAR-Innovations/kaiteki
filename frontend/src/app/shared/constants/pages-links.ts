export interface Page {
	label: string
	link?: string
	subPages?: Page[]
	icon?: string
	linkElementId?: string
}

export type PageData = { [key: string]: Page }

export const LANDING_NAVIGATION_LINKS: PageData = {
	features: { label: 'Features', linkElementId: 'landing-features' },
	solutions: { label: 'Solutions', linkElementId: 'landing-solutions' },
	pricing: { label: 'Pricing', linkElementId: 'landing-pricing' },
	enterprise: { label: 'Blogs', link: '/blogs' },
}

export const LANDING_NAVBAR_LINKS: PageData = {
	...LANDING_NAVIGATION_LINKS,
	login: { label: 'Login', link: '/login' },
}

export const PRIMARY_SIDEBAR_LINKS: PageData = {
	overview: { label: 'Overview', link: 'overview', icon: 'dashboard' },
	notes: {
		label: 'Notes',
		link: 'notes',
		icon: 'notes',
	},
	events: {
		label: 'Events',
		link: 'events',
		icon: 'event',
	},
}

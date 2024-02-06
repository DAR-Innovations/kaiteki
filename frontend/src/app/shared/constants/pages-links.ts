export interface Page {
  label: string;
  link: string;
  subPages?: Page[];
  icon?: string;
}

export type PageData = { [key: string]: Page };

export const LANDING_NAVIGATION_LINKS: PageData = {
  features: { label: 'Features', link: '/features' },
  solutions: { label: 'Solutions', link: '/solutions' },
  pricing: { label: 'Pricing', link: '/pricing' },
  enterprise: { label: 'Enterprise', link: '/enterprise' },
};

export const LANDING_NAVBAR_LINKS: PageData = {
  ...LANDING_NAVIGATION_LINKS,
  sales: { label: 'Contact sales', link: '/contact-sales' },
};

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
  // TODO: CREATE AN LOGO FOR KAIZEN
  // kaizen: {
  //   label: 'Kaizen',
  //   link: 'kaizen',
  //   icon: 'accessible',
  // },
};

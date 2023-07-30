export interface Page {
  label: string;
  link: string;
  subPages?: Page[];
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

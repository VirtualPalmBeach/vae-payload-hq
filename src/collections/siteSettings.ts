import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

import brandingFields from '../fields/sections/branding';
import seoFields from '../fields/sections/seo';
import contactFields from '../fields/sections/contact';
import navigationFields from '../fields/sections/navigation';
import analyticsFields from '../fields/sections/analytics';
import performanceFields from '../fields/sections/performance';
import integrationsFields from '../fields/sections/integrations';

const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
  admin: {
    group: 'Settings',
    useAsTitle: 'siteTitle', // ✅ Must be top-level
    defaultColumns: ['siteTitle', 'siteKey', 'isDefaultSite'],
    description: 'Site-wide configuration including branding, SEO, contact, and integrations',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
    create: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  versions: {
    drafts: true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'siteTitle',
      label: 'Site Title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'A short name for this site (used in admin UI)',
      },
    },
    {
      name: 'isDefaultSite',
      label: 'Default Site',
      type: 'checkbox',
      admin: {
        description: 'Designates this as the default fallback site',
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: brandingFields,
        },
        {
          label: 'SEO',
          fields: seoFields,
        },
        {
          label: 'Contact & Social',
          fields: contactFields,
        },
        {
          label: 'Navigation',
          fields: navigationFields,
        },
        {
          label: 'Analytics & Scripts',
          fields: analyticsFields,
        },
        {
          label: 'Performance',
          fields: performanceFields,
        },
        {
          label: 'Integrations',
          fields: integrationsFields,
        },
      ],
    },
  ],
};

export default SiteSettings;

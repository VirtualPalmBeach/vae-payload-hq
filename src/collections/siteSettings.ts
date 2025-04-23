import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import brandingTab from '../fields/sections/branding';
import seoTab from '../fields/sections/seo';
import contactTab from '../fields/sections/contact';
import navigationTab from '../fields/sections/navigation';
import analyticsTab from '../fields/sections/analytics';
import performanceTab from '../fields/sections/performance';
import integrationsTab from '../fields/sections/integrations';

const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
  admin: {
    group: 'Settings',
    useAsTitle: 'siteTitle',
    defaultColumns: ['siteTitle', 'siteKey', 'isDefaultSite'],
    description: 'Site-wide configuration including branding, SEO, contact, and integrations',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => (user as any)?.role === 'admin',
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
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
          label: brandingTab.label,
          name: brandingTab.name,
          fields: brandingTab.fields,
        },
        {
          label: seoTab.label,
          name: seoTab.name,
          fields: seoTab.fields,
        },
        {
          label: contactTab.label,
          name: contactTab.name,
          fields: contactTab.fields,
        },
        {
          label: navigationTab.label,
          name: navigationTab.name,
          fields: navigationTab.fields,
        },
        {
          label: analyticsTab.label,
          name: analyticsTab.name,
          fields: analyticsTab.fields,
        },
        {
          label: performanceTab.label,
          name: performanceTab.name,
          fields: performanceTab.fields,
        },
        {
          label: integrationsTab.label,
          name: integrationsTab.name,
          fields: integrationsTab.fields,
        },
      ],
    },
  ],
};

export default SiteSettings;
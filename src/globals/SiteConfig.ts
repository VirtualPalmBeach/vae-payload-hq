import { GlobalConfig } from 'payload';

const SiteConfig: GlobalConfig = {
  slug: 'siteConfig',
  label: 'Site Configuration',
  fields: [
    {
      name: 'sites',
      label: 'Sites',
      type: 'array',
      fields: [
        {
          name: 'siteKey',
          label: 'Site Key',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          required: true,
        },
        {
          name: 'domain',
          label: 'Domain',
          type: 'text',
          required: true,
        },
        {
          name: 'displayName',
          label: 'Display Name',
          type: 'text',
          required: true,
        },
        {
          name: 'logoUrl',
          label: 'Logo URL',
          type: 'text',
          required: true,
        },
        {
          name: 'themeColor',
          label: 'Theme Color',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default SiteConfig;

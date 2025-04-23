import { CollectionConfig } from 'payload'

const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
  admin: {
    useAsTitle: 'siteTitle',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Site Title',
      type: 'text',
    },
    {
      name: 'siteSlug',
      label: 'Site Slug',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          name: 'general',
          fields: [
            {
              name: 'note',
              label: 'Placeholder Field',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default SiteSettings

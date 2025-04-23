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
      name: 'isDefaultSite',
      label: 'Default Site',
      type: 'checkbox',
    },
    {
      name: 'siteKey',
      label: 'Site Key',
      type: 'select',
      options: [
        { label: 'Selah Pools', value: 'selahPools' },
        { label: 'Selah Pro', value: 'selahPro' },
        { label: 'DFW Pool Builder', value: 'dfwPoolBuilder' },
        { label: 'Southlake Outdoor', value: 'southlakeOutdoor' },
        { label: 'Omega Pool Services', value: 'omegaPoolServices' },
      ],
      defaultValue: 'selahPro',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          name: 'branding',
          fields: [
            {
              name: 'brandingNote',
              label: 'Branding Placeholder',
              type: 'text',
              admin: {
                description: 'Minimal tab test.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: [
            {
              name: 'seoNote',
              label: 'SEO Placeholder',
              type: 'text',
              admin: {
                description: 'Minimal tab test.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default SiteSettings

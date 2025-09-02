import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { isAdmin } from '../access/helpers'

const FooterNavigation: CollectionConfig = {
  slug: 'footerNavigation',
  admin: {
    useAsTitle: 'title',
    group: 'Navigation',
    description: 'Configure footer navigation links and disclaimer text',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal title for this footer configuration',
      },
    },
    commonSiteKeyField,
    {
      name: 'links',
      label: 'Footer Links',
      type: 'array',
      fields: [
        { name: 'label', label: 'Link Label', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
        { name: 'openInNewTab', label: 'Open in New Tab', type: 'checkbox', required: false },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          required: true,
          options: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'],
        },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
    },
    {
      name: 'disclaimer',
      type: 'richText',
      label: 'Footer Disclaimer',
      required: false,
    },
  ],
}

export default FooterNavigation

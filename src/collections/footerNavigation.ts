import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const FooterNavigation: CollectionConfig = {
  slug: 'footerNavigation',
  admin: {
    useAsTitle: 'title',
    group: 'Navigation',
    description: 'Configure footer navigation links and disclaimer text',
  },
  access: {
    read: () => true,
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
      type: 'array',
      label: 'Footer Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Internal path (e.g., /about) or external URL',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
      ],
      admin: {
        description: 'Navigation links to display in the footer',
      },
    },
    {
      name: 'disclaimer',
      type: 'richText',
      label: 'Footer Disclaimer',
      admin: {
        description: 'Optional disclaimer or copyright text',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Full URL to social media profile',
          },
        },
      ],
    },
  ],
}

export default FooterNavigation

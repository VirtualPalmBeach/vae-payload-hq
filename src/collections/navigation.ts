import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'label',
    group: 'Navigation',
  },
  access: {
    read: () => true, // <-- ADD THIS
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'order', type: 'number' },
        {
          name: 'openInNewTab',
          label: 'Open in New Tab',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'subItems',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            { name: 'order', type: 'number' },
            {
              name: 'openInNewTab',
              label: 'Open in New Tab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'mobileBreakpoint',
      label: 'Mobile Breakpoint',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'Small (640px)', value: 'sm' },
        { label: 'Medium (768px)', value: 'md' },
        { label: 'Large (1024px)', value: 'lg' },
      ],
      admin: {
        description: 'Screen size at which to switch to mobile navigation',
      },
    },
  ],
}

export default Navigation

import type { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: true,
}

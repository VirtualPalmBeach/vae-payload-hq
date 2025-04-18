import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: { useAsTitle: 'label' },
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
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'linkedPage',
          label: 'Linked Page',
          type: 'relationship',
          relationTo: ['projects', 'blogPosts'],
        },
        {
          name: 'order',
          label: 'Order',
          type: 'number',
        },
        {
          name: 'subItems',
          label: 'Sub Items',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'Text',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
            {
              name: 'linkedPage',
              label: 'Linked Page',
              type: 'relationship',
              relationTo: ['projects', 'blogPosts'],
            },
            {
              name: 'order',
              label: 'Order',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
};

export default Navigation;

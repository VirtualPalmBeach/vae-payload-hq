import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: { useAsTitle: 'label' },
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
          name: 'subItems',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            { name: 'order', type: 'number' },
          ],
        },
      ],
    },
  ],
};

export default Navigation;

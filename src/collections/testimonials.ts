import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
  },
  access: {
    read: () => true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'quote',
      label: 'Testimonial Quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      label: 'Author Name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
    },
    {
      name: 'rating',
      label: 'Rating (1–5)',
      type: 'number',
      min: 1,
      max: 5,
    },
  ],
};

import { CollectionConfig } from 'payload/types';

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      name: 'introText',
      label: 'Intro Text',
      type: 'textarea',
      required: false,
    },
    {
      name: 'ctaText',
      label: 'CTA Text',
      type: 'text',
      required: false,
    },
    {
      name: 'ctaLink',
      label: 'CTA Link',
      type: 'text',
      required: false,
    }
  ],
};

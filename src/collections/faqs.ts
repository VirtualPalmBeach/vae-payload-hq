import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'question',
      label: 'Question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Answer',
      type: 'textarea',
    },
  ],
};

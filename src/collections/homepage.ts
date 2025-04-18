import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Homepage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'introText',
      label: 'Intro Text',
      type: 'textarea',
    },
    {
      name: 'ctaText',
      label: 'Call To Action Text',
      type: 'text',
    },
    {
      name: 'ctaLink',
      label: 'Call To Action Link',
      type: 'text',
    },
  ],
};

export default Homepage;

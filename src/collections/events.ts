import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title' },
  fields: [
    commonSiteKeyField,
    {
      name: 'title',
      label: 'Title',
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'eventDate',
      label: 'Event Date',
      type: 'date',
      required: true,
    },
    {
      name: 'planningWindowWeeks',
      label: 'Planning Window (weeks)',
      type: 'number',
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'text',
      admin: { description: 'Cloudinary URL' },
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
    },
  ],
};

export default Events;

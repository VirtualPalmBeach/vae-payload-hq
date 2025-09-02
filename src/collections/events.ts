import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { isAdmin } from '../access/helpers';

const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
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
    {
      name: 'projects',
      label: 'Projects',
      type: 'relationship',
      relationTo: ['projects'] as const,
      hasMany: true,
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: ['categories'] as const,
      hasMany: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: ['tags'] as const,
      hasMany: true,
    },
  ],
};

export default Events;

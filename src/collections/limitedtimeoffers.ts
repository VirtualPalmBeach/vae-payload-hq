import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { isAdmin } from '../access/helpers';

const LimitedTimeOffers: CollectionConfig = {
  slug: 'limitedtimeoffers',
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
      type: 'richText',
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      required: true,
    },
    {
      name: 'ctaText',
      label: 'CTA Text',
      type: 'text',
    },
    {
      name: 'ctaUrl',
      label: 'CTA URL',
      type: 'text',
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
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Active',    value: 'active'    },
        { label: 'Expired',   value: 'expired'   },
      ],
      required: true,
      defaultValue: 'scheduled',
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

export default LimitedTimeOffers;

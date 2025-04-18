import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const LimitedTimeOffers: CollectionConfig = {
  slug: 'limitedtimeoffers',
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
      name: 'location',
      label: 'Location',
      type: 'relationship',
      relationTo: 'locations',
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
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
  ],
};

export default LimitedTimeOffers;

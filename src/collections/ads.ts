import { CollectionConfig, CollectionSlug } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { isAdmin } from '../access/helpers';

const Ads: CollectionConfig = {
  slug: 'ads',
  admin: { useAsTitle: 'headline' },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'headline',
      label: 'Headline',
      type: 'text',
      required: true,
    },
    {
      name: 'copy',
      label: 'Copy',
      type: 'textarea',
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'text',
      required: false,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
    },
    {
      name: 'landingPageSlug',
      label: 'Landing Page Slug',
      type: 'text',
    },
    {
      name: 'landingPageContent',
      label: 'Landing Page Content',
      type: 'richText',
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

export default Ads;

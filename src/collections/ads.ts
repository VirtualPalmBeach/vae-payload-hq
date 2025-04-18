import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Ads: CollectionConfig = {
  slug: 'ads',
  admin: { useAsTitle: 'headline' },
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
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
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
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
    },
  ],
};

export default Ads;

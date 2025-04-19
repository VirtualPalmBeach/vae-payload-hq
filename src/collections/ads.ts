import { CollectionConfig, CollectionSlug } from 'payload';
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
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: ['tags'] as CollectionSlug[],
      hasMany: true,
    },
  ],
};

export default Ads;

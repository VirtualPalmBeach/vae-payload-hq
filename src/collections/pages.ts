import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { timestampedFields } from '../fields/timestampedFields';
import { optionalDisplayFields } from '../fields/optionalFields';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { 
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt']
  },
  access: {
    read: () => true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Page Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      label: 'SEO Settings',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'SEO Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'SEO Description',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'SEO Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'layout',
      label: 'Content Blocks',
      type: 'blocks',
      minRows: 1,
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero',
            plural: 'Heroes',
          },
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'subheading',
              label: 'Subheading',
              type: 'textarea',
            },
            {
              name: 'image',
              label: 'Background Image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          slug: 'content',
          labels: {
            singular: 'Content Block',
            plural: 'Content Blocks',
          },
          fields: [
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
            },
          ],
        },
      ],
    },
    ...optionalDisplayFields,
    ...timestampedFields,
  ],
};

export default Pages;
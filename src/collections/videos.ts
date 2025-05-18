import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { optionalDisplayFields } from '../fields/optionalFields';
import { timestampedFields } from '../fields/timestampedFields';

const Videos: CollectionConfig = {
  slug: 'videos',
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true,
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'cloudinaryPublicId',
      label: 'Cloudinary Public ID',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnailUrl',
      label: 'Thumbnail URL',
      type: 'text',
    },
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'select',
      options: [
        {
          label: 'Landscape',
          value: 'landscape',
        },
        {
          label: 'Portrait',
          value: 'portrait',
        },
        {
          label: 'Square',
          value: 'square',
        },
      ],
      defaultValue: 'landscape',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: { position: 'sidebar' },
    },
    ...optionalDisplayFields,
    ...timestampedFields,
  ],
};

export default Videos;

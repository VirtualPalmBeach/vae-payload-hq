import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Gallery: CollectionConfig = {
  slug: 'gallery',
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
      name: 'caption',
      label: 'Caption',
      type: 'text',
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'text',
      required: true,
    },
    {
      name: 'videoUrl',
      label: 'Video URL',
      type: 'text',
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      required: true,
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
    },
  ],
};

export default Gallery;

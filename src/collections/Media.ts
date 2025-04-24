import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { timestampedFields } from './fields/timestampedFields';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mediaType', 'tags', 'updatedAt'],
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
      admin: {
        description: 'Important for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
    },
    {
      name: 'mediaType',
      label: 'Media Type',
      type: 'select',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Document',
          value: 'document',
        },
        {
          label: 'Video',
          value: 'video',
        },
        {
          label: 'Audio',
          value: 'audio',
        },
      ],
      defaultValue: 'image',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'source',
      label: 'Source/Attribution',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Credit the creator or source if needed',
      },
    },
    {
      name: 'cloudinary',
      label: 'Cloudinary Data',
      type: 'group',
      fields: [
        {
          name: 'id',
          label: 'Cloudinary ID',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Cloudinary URL',
          type: 'text',
          required: true,
        },
        {
          name: 'secureUrl',
          label: 'Secure URL',
          type: 'text',
        },
        {
          name: 'format',
          label: 'Format',
          type: 'text',
        },
        {
          name: 'width',
          label: 'Width',
          type: 'number',
        },
        {
          name: 'height',
          label: 'Height',
          type: 'number',
        },
        {
          name: 'bytes',
          label: 'File Size (bytes)',
          type: 'number',
        },
        {
          name: 'resourceType',
          label: 'Resource Type',
          type: 'text',
        },
        {
          name: 'folder',
          label: 'Folder',
          type: 'text',
        },
      ],
    },
    ...timestampedFields,
  ],
};

export default Media;
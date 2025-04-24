import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { timestampedFields } from '../fields/timestampedFields';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mediaType', 'tags', 'uploadedAt'],
  },
  upload: {
    // Configure for Cloudinary integration
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // By specifying only width, height will scale proportionally
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf', 'video/mp4'],
  },
  hooks: {
    // This is where Cloudinary integration would be handled
    // Example of minimal local storage with Cloudinary priority
    afterChange: [
      // Placeholder for Cloudinary upload hook
      // Would handle pushing to Cloudinary and updating the document with CDN URLs
    ],
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
      name: 'cloudinaryData',
      label: 'Cloudinary Data',
      type: 'group',
      admin: {
        readOnly: true,
        description: 'Auto-populated from Cloudinary',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'cloudinaryId',
          label: 'Cloudinary ID',
          type: 'text',
        },
        {
          name: 'cloudinaryUrl',
          label: 'Cloudinary URL',
          type: 'text',
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
      ],
    },
    {
      name: 'uploadedAt',
      label: 'Uploaded At',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ operation, value }) => {
            if (operation === 'create') {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    ...timestampedFields,
  ],
};

export default Media;
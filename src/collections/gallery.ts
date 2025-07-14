import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery Page',
    plural: 'Gallery Pages',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Individual gallery media items and pages',
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
      admin: {
        description: 'URL-friendly identifier for this gallery page',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      name: 'cloudinaryTag',
      label: 'Cloudinary Tag',
      type: 'text',
      required: true,
      admin: {
        description:
          'Comma-separated tags for Cloudinary search (e.g., ANT2101,fireFeatures,Photo)',
      },
    },
    {
      name: 'heroVideoTag',
      label: 'Hero Video Tag',
      type: 'text',
      admin: {
        description: 'Optional Cloudinary tag for custom hero video. Overrides shared gallery hero when present.',
      },
    },
    {
      name: 'heroImageTag',
      label: 'Hero Image Tag',
      type: 'text',
      admin: {
        description: 'Optional Cloudinary tag for custom hero image fallback. Used when heroVideoTag is empty.',
      },
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      required: true,
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
    },
    {
      name: 'adminNotes',
      label: 'Admin Notes',
      type: 'textarea',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'mediaAspect',
      label: 'Media Aspect Ratio',
      type: 'select',
      defaultValue: 'square',
      admin: {
        description: 'Controls aspect ratio for gallery image pop-up',
      },
      options: [
        {
          label: 'Square (1:1)',
          value: 'square',
        },
        {
          label: 'Landscape (16:9)',
          value: 'landscape',
        },
        {
          label: 'Portrait (4:5)',
          value: 'portrait',
        },
        {
          label: 'Wide (21:9)',
          value: 'wide',
        },
      ],
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
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
}

export default Gallery

import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const Scenes: CollectionConfig = {
  slug: 'scenes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'cloudinaryEnvironment', 'status', 'featured', 'order'],
    group: 'Content',
  },
  fields: [
    // Site Configuration
    commonSiteKeyField,
    {
      name: 'cloudinaryEnvironment',
      label: 'Cloudinary Environment',
      type: 'select',
      required: true,
      options: [
        { label: 'Base', value: 'base' },
        { label: 'Staging', value: 'staging' },
        { label: 'Live', value: 'live' },
      ],
      defaultValue: 'base',
      admin: {
        position: 'sidebar',
        description: 'Select the Cloudinary environment for this scene',
      },
    },
    // Content Fields
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
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier for the Scenes page',
      },
    },
    {
      name: 'altText',
      label: 'Alt Text',
      type: 'text',
      required: true,
      admin: {
        description: 'Descriptive text for screen readers and SEO',
      },
    },
    {
      name: 'headline',
      label: 'Headline',
      type: 'richText',
      admin: {
        description: 'Headline for this Scenes page',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Brief description of this Scenes page',
      },
    },
    // Cloudinary Integration
    {
      name: 'cloudinaryTags',
      label: 'Cloudinary Tags',
      type: 'text',
      required: true,
      admin: {
        description:
          'Comma-separated tags for Cloudinary search (e.g., scene,portrait,featured)',
      },
    },
    {
      name: 'cloudinaryPublicId',
      label: 'Cloudinary Public ID',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-generated from Cloudinary tags search',
      },
    },
    {
      name: 'focalPoint',
      label: 'Focal Point',
      type: 'group',
      admin: {
        description: 'Coordinates for smart cropping (0-100 scale)',
      },
      fields: [
        {
          name: 'x',
          label: 'X Position',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 50,
        },
        {
          name: 'y',
          label: 'Y Position',
          type: 'number',
          min: 0,
          max: 100,
          defaultValue: 50,
        },
      ],
    },
    // Image Configuration
    {
      name: 'aspectRatio',
      label: 'Aspect Ratio',
      type: 'select',
      options: [
        { label: 'Portrait (9:16)', value: '9:16' },
        { label: 'Portrait (2:3)', value: '2:3' },
        { label: 'Portrait (3:4)', value: '3:4' },
      ],
      defaultValue: '9:16',
      admin: {
        description: 'Enforced aspect ratio for this scene',
      },
    },
    // Organization
    {
      name: 'tags',
      label: 'Gallery Tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Organize this Scenes with gallery tags',
      },
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Display prominently on gallery index',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description:
          'Display priority (higher numbers appear first; leave blank for default position)',
      },
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  access: {
    read: () => true,
  },
}

export default Scenes
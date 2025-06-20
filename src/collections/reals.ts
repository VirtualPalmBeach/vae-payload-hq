import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const Reals: CollectionConfig = {
  slug: 'reals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'order'],
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
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier for the Reals page',
      },
    },
    {
      name: 'headline',
      label: 'Headline',
      type: 'richText',
      admin: {
        description: 'Headline for this Reals page',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Brief description of this Reals page',
      },
    },
    {
      name: 'cloudinaryTags',
      label: 'Cloudinary Tags',
      type: 'text',
      required: true,
      admin: {
        description:
          'Comma-separated tags for Cloudinary search (e.g., ANT2101,IRL,Reals,Social,Video)',
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
      name: 'posterPublicId',
      label: 'Poster Public ID',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-generated poster frame ID',
      },
    },
    {
      name: 'thumbnails',
      label: 'Thumbnails',
      type: 'json',
      admin: {
        readOnly: true,
        description: 'Generated thumbnail URLs for responsive display',
      },
    },
    {
      name: 'regenerateThumbnails',
      label: 'Regenerate Thumbnails',
      type: 'checkbox',
      admin: {
        description: 'Check to regenerate thumbnails on next save',
      },
    },
    {
      name: 'tags',
      label: 'Gallery Tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Organize this Reals with gallery tags',
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

export default Reals

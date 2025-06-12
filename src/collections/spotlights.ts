import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const Spotlights: CollectionConfig = {
  slug: 'spotlights',
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
        description: 'URL-friendly identifier for this spotlight gallery',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Brief description of this spotlight gallery',
      },
    },
    {
      name: 'cloudinaryTags',
      label: 'Cloudinary Tags',
      type: 'text',
      required: true,
      admin: {
        description: 'Comma-separated tags for Cloudinary search (e.g., social,spotlight,featured)',
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
        description: 'Organize this spotlight with gallery tags',
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
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
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

export default Spotlights

import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const realsIndex: CollectionConfig = {
  slug: 'realsIndex',
  admin: {
    useAsTitle: 'title',
    description: 'Hero content for the Reals index page',
    defaultColumns: ['title', 'siteKey', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Site Configuration
    commonSiteKeyField,
    
    // Page Title
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      defaultValue: 'Reals Index',
      admin: {
        description: 'Internal title for this reals index configuration',
      },
    },
    
    // Hero Content Fields
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      maxLength: 200,
      defaultValue: 'Reals',
      admin: {
        description: 'Main heading for the reals page',
      },
    },
    {
      name: 'heroSubheading',
      label: 'Hero Subheading',
      type: 'richText',
      admin: {
        description: 'Short paragraph or rich text block beneath the hero heading',
      },
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary tags for the background hero image. Enter comma-separated tags for flexible search.',
        placeholder: 'e.g., selah-pro,reals,hero',
      },
    },
    
    // Publishing Status
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'published',
      admin: {
        position: 'sidebar',
      },
    },
    
    // Timestamps
    ...timestampedFields,
  ],
}

export default realsIndex
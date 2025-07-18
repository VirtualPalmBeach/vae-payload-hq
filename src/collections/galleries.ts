import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const Galleries: CollectionConfig = {
  slug: 'galleries',
  admin: {
    useAsTitle: 'title',
    description: 'Individual gallery pages',
    defaultColumns: ['title', 'category', 'galleryCode', 'published', 'updatedAt'],
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
    
    // Core Gallery Fields
    {
      name: 'title',
      label: 'Gallery Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the gallery',
      },
    },
    {
      name: 'galleryCode',
      label: 'Gallery Code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique gallery identifier - Format: ABC2301 (3 letters + 2 year digits + 2 sequence)',
        placeholder: 'GAL2401',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Gallery code is required'
        if (typeof value !== 'string') return 'Gallery code must be a string'
        const pattern = /^[A-Z]{3}\d{4}$/
        if (!pattern.test(value)) {
          return 'Gallery code must be 3 uppercase letters followed by 4 digits (e.g., GAL2401)'
        }
        return true
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (auto-generated from title)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Inspiration', value: 'inspiration' },
        { label: 'Project', value: 'project' },
        { label: 'Aesthetic', value: 'aesthetic' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Gallery category for organization',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Detailed gallery description',
      },
    },
    
    // Visual Content
    {
      name: 'cloudinaryHeroTag',
      label: 'Hero Image Tag',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary tag for the gallery hero image',
        placeholder: 'e.g., gallery-luxury-pool-hero',
      },
    },
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading for the gallery hero section',
      },
    },
    {
      name: 'heroSubheading',
      label: 'Hero Subheading',
      type: 'text',
      admin: {
        description: 'Subheading text for the gallery hero section',
      },
    },
    {
      name: 'heroRichText',
      label: 'Hero Rich Text',
      type: 'richText',
      admin: {
        description: 'Rich text content for the gallery hero section',
      },
    },
    {
      name: 'galleryTag',
      label: 'Gallery Tag',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary tag for dynamically fetching gallery images',
        placeholder: 'e.g., gallery-luxury-pool-2024',
      },
    },
    
    // Publishing Controls
    {
      name: 'published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Make this gallery visible on the website',
      },
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When to publish this gallery',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    
    // SEO Fields
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
          admin: {
            description: 'Override the default meta title',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Override the default meta description',
          },
        },
      ],
    },
    
    // Timestamps
    ...timestampedFields,
  ],
  indexes: [
    {
      fields: ['galleryCode', 'siteKey'],
      unique: true,
    },
    {
      fields: ['slug', 'siteKey'],
      unique: true,
    },
    {
      fields: ['category', 'publishDate'],
    },
    {
      fields: ['siteKey', 'published', 'category'],
    },
  ],
}

export default Galleries
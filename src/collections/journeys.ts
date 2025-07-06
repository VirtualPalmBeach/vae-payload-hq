import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const Journeys: CollectionConfig = {
  slug: 'journeys',
  admin: {
    useAsTitle: 'title',
    description: 'Story-based content for client journeys, spotlights, and insights',
    defaultColumns: ['title', 'category', 'featured', 'siteKey', 'published', 'updatedAt'],
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
    
    // Core Story Fields
    {
      name: 'title',
      label: 'Story Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the journey or story',
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
          ({ value, originalDoc, data }) => {
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
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief summary for card displays (max 200 chars)',
      },
    },
    {
      name: 'fullDescription',
      label: 'Full Story',
      type: 'richText',
      admin: {
        description: 'Complete story content for detail pages',
      },
    },
    
    // Categorization
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Client Story', value: 'client-story' },
        { label: 'Spotlight', value: 'spotlight' },
        { label: 'Insight', value: 'insight' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Story category for filtering and organization',
      },
    },
    {
      name: 'projectCode',
      label: 'Related Project Code',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional: Link to portfolio project (e.g., ROD2301)',
        placeholder: 'ABC2301',
      },
    },
    {
      name: 'featured',
      label: 'Featured Story',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display prominently in story grids',
      },
    },
    
    // Visual Content
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary tag for the main story image',
        placeholder: 'e.g., journey-client-pool-transformation',
      },
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        description: 'Story publication date',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    
    // Story Details
    {
      name: 'storyDetails',
      label: 'Story Details',
      type: 'group',
      fields: [
        {
          name: 'readingTime',
          label: 'Reading Time',
          type: 'text',
          admin: {
            description: 'Estimated reading time',
            placeholder: 'e.g., 5 min read',
          },
        },
        {
          name: 'author',
          label: 'Author',
          type: 'text',
          admin: {
            description: 'Story author or contributor',
          },
        },
        {
          name: 'location',
          label: 'Location',
          type: 'text',
          admin: {
            description: 'Geographic location if relevant',
            placeholder: 'e.g., Dallas, TX',
          },
        },
        {
          name: 'tags',
          label: 'Tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'Keywords for search and filtering',
          },
        },
      ],
    },
    
    // Gallery Images (optional)
    {
      name: 'galleryImages',
      label: 'Gallery Images',
      type: 'array',
      admin: {
        description: 'Additional images for the story',
      },
      fields: [
        {
          name: 'cloudinaryTag',
          label: 'Cloudinary Tag',
          type: 'text',
          required: true,
          admin: {
            description: 'Tag for gallery image',
          },
        },
        {
          name: 'caption',
          label: 'Image Caption',
          type: 'text',
          admin: {
            description: 'Optional caption for this image',
          },
        },
      ],
    },
    
    // Call to Action (optional)
    {
      name: 'callToAction',
      label: 'Call to Action',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'CTA Text',
          type: 'text',
          admin: {
            description: 'Button or link text',
            placeholder: 'e.g., View This Project',
          },
        },
        {
          name: 'link',
          label: 'CTA Link',
          type: 'text',
          admin: {
            description: 'URL for the call to action',
            placeholder: 'e.g., /portfolio/residential/project-name',
          },
        },
        {
          name: 'style',
          label: 'CTA Style',
          type: 'select',
          options: [
            { label: 'Primary Button', value: 'primary' },
            { label: 'Secondary Button', value: 'secondary' },
            { label: 'Text Link', value: 'link' },
          ],
          defaultValue: 'primary',
        },
      ],
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
        description: 'Make this story visible on the website',
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
      fields: ['slug', 'siteKey'],
      unique: true,
    },
    {
      fields: ['category', 'featured', 'publishedDate'],
    },
    {
      fields: ['siteKey', 'published', 'category'],
    },
    {
      fields: ['projectCode'],
    },
  ],
}

export default Journeys
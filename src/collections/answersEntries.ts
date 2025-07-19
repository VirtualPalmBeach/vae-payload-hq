import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const AnswersEntries: CollectionConfig = {
  slug: 'answersEntries',
  admin: {
    useAsTitle: 'title',
    description: 'Individual answer entries for FAQs, guides, and support content',
    defaultColumns: ['title', 'category', 'published', 'siteKey', 'updatedAt'],
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
    
    // Core Answer Fields
    {
      name: 'title',
      label: 'Answer Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the answer entry',
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
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'FAQ', value: 'faq' },
        { label: 'Guide', value: 'guide' },
        { label: 'Resource', value: 'resource' },
        { label: 'Support', value: 'support' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Answer category for filtering and organization',
      },
    },
    
    // Hero Content
    {
      name: 'heroHeadline',
      label: 'Hero Headline',
      type: 'text',
      required: false,
      maxLength: 200,
      admin: {
        description: 'Optional hero headline for featured answer pages',
      },
    },
    {
      name: 'heroSubhead',
      label: 'Hero Subheading',
      type: 'richText',
      admin: {
        description: 'Supporting hero content for answer detail pages',
      },
    },
    {
      name: 'heroImageTag',
      label: 'Hero Image Tag',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary tag for the hero background image',
        placeholder: 'e.g., answers-faq-hero',
      },
    },
    
    // Content Sections
    {
      name: 'contentSections',
      label: 'Content Sections',
      type: 'array',
      admin: {
        description: 'Flexible content sections for structuring the answer',
      },
      fields: [
        {
          name: 'sectionType',
          label: 'Section Type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text Content', value: 'text' },
            { label: 'Step-by-Step', value: 'steps' },
            { label: 'Video Tutorial', value: 'video' },
            { label: 'Related Links', value: 'links' },
            { label: 'Call to Action', value: 'cta' },
          ],
          admin: {
            description: 'Type of content section',
          },
        },
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional title for this section',
          },
        },
        {
          name: 'content',
          label: 'Section Content',
          type: 'richText',
          admin: {
            description: 'Main content for this section',
          },
        },
        {
          name: 'mediaTag',
          label: 'Media Tag',
          type: 'text',
          required: false,
          admin: {
            description: 'Cloudinary tag for section media (images/videos)',
            placeholder: 'e.g., answer-guide-step-1',
          },
        },
      ],
    },
    
    // Journey Integration (Optional)
    {
      name: 'linkedJourney',
      label: 'Linked Journey',
      type: 'relationship',
      relationTo: ['journeys'],
      hasMany: false,
      admin: {
        description: 'Optional: Link to a related client journey or case study',
      },
    },
    
    // Metadata & Organization
    {
      name: 'featured',
      label: 'Featured Answer',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display prominently in answer listings',
      },
    },
    {
      name: 'order',
      label: 'Sort Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Manual sort order within category (lower numbers first)',
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      admin: {
        description: 'Comma-separated tags for search and filtering',
        placeholder: 'e.g., installation, troubleshooting, warranty',
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
        description: 'Make this answer visible on the website',
      },
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When to publish this answer',
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
      fields: ['slug', 'siteKey'],
      unique: true,
    },
    {
      fields: ['category', 'featured', 'order'],
    },
    {
      fields: ['siteKey', 'published', 'category'],
    },
  ],
}

export default AnswersEntries
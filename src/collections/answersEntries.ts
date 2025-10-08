import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'
import { isAdmin, isAdminOrDesigner } from '../access/helpers'

const AnswersEntries: CollectionConfig = {
  slug: 'answersEntries',
  labels: {
    singular: 'Answers Page',
    plural: 'Answers Pages',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Individual answer entries for FAQs, guides, and support content',
    defaultColumns: ['title', 'category', 'published', 'siteKey', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: isAdminOrDesigner,
    update: isAdminOrDesigner,
    delete: isAdmin,
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
        { label: 'Reviews', value: 'reviews' },
        { label: 'Our Process', value: 'our-process' },
        { label: 'Design Philosophy', value: 'design-philosophy' },
        { label: 'Client Experience', value: 'client-experience' },
        { label: 'Craftsmanship', value: 'craftsmanship' },
        { label: 'Materials & Technology', value: 'materials-technology' },
        { label: 'Awards & Recognition', value: 'awards-recognition' },
        { label: 'Luxury Details', value: 'luxury-details' },
        { label: 'Design Inspiration', value: 'design-inspiration' },
        { label: 'Peace of Mind', value: 'peace-of-mind' },
        { label: 'Built to Last', value: 'built-to-last' },
        { label: 'Complete Project Delivery', value: 'complete-project-delivery' },
        { label: 'The Selah Standard', value: 'the-selah-standard' },
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

    // Content Blocks - Following journeys.ts pattern
    {
      name: 'contentBlocks',
      label: 'Content Blocks',
      type: 'blocks',
      admin: {
        description:
          'Build your answer with flexible content blocks. Mix text, quotes, and images to create comprehensive answers. Drag to reorder blocks.',
      },
      blocks: [
        // Rich Text Block
        {
          slug: 'richTextBlock',
          labels: {
            singular: 'Rich Text Block',
            plural: 'Rich Text Blocks',
          },
          fields: [
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              required: true,
              admin: {
                description: 'Main text content with formatting options',
              },
            },
          ],
        },

        // Quote Block
        {
          slug: 'quoteBlock',
          labels: {
            singular: 'Quote Block',
            plural: 'Quote Blocks',
          },
          fields: [
            {
              name: 'text',
              label: 'Quote Text',
              type: 'textarea',
              required: true,
              admin: {
                description: 'The quote or highlighted text',
              },
            },
            {
              name: 'author',
              label: 'Author',
              type: 'text',
              admin: {
                description: 'Optional: Person or source of the quote',
              },
            },
            {
              name: 'style',
              label: 'Quote Style',
              type: 'select',
              options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Large', value: 'large' },
                { label: 'Highlight', value: 'highlight' },
              ],
              defaultValue: 'standard',
              admin: {
                description: 'Visual style for the quote',
              },
            },
          ],
        },

        // Image Block
        {
          slug: 'imageBlock',
          labels: {
            singular: 'Image Block',
            plural: 'Image Blocks',
          },
          fields: [
            {
              name: 'cloudinaryTag',
              label: 'Cloudinary Tag',
              type: 'text',
              required: true,
              admin: {
                description: 'Cloudinary tag for the image',
                placeholder: 'e.g., answer-diagram-pool-maintenance',
              },
            },
            {
              name: 'altText',
              label: 'Alt Text',
              type: 'text',
              required: true,
              admin: {
                description: 'Descriptive text for accessibility and SEO',
                placeholder: 'e.g., Diagram showing pool filter maintenance steps',
              },
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
              admin: {
                description: 'Optional caption displayed below the image',
              },
            },
          ],
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

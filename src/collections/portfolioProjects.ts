import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const PortfolioProjects: CollectionConfig = {
  slug: 'portfolioProjects',
  admin: {
    useAsTitle: 'title',
    description: 'Individual portfolio projects for category grids and detail pages',
    defaultColumns: ['title', 'category', 'featured', 'siteKey', 'published', 'updatedAt'],
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

    // Core Project Fields
    {
      name: 'title',
      label: 'Project Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the portfolio project',
      },
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Universal project identifier - Format: ABC2301 (3 letters + 2 year digits + 2 sequence)',
        placeholder: 'ROD2301',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Project code is required'
        if (typeof value !== 'string') return 'Project code must be a string'
        const pattern = /^[A-Z]{3}\d{2}[A-Z0-9]\d$/
        if (!pattern.test(value)) {
          return 'Project code must be 3 uppercase letters, 2 digits, then an alphanumeric, then a final digit (e.g., ROD2301 or COL24F1)'
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
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Renovation', value: 'renovation' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Project category for grid filtering',
      },
    },
    {
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief summary displayed on category grid cards (max 200 chars)',
      },
    },
    {
      name: 'fullDescription',
      label: 'Full Description',
      type: 'richText',
      admin: {
        description: 'Detailed project description for the project detail page',
      },
    },

    // Visual Content
    {
      name: 'heroImage',
      label: 'Hero Image (Grid Display)',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary tag for the main project image shown in grids',
        placeholder: 'e.g., portfolio-residential-modern-pool',
      },
    },
    {
      name: 'projectImages',
      label: 'Project Gallery Images',
      type: 'array',
      minRows: 1,
      admin: {
        description: 'Additional images for the project detail page gallery',
      },
      fields: [
        {
          name: 'cloudinaryTag',
          label: 'Cloudinary Tag',
          type: 'text',
          required: true,
          admin: {
            description: 'Tag for gallery image',
            placeholder: 'e.g., portfolio-project-123-image-1',
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
        {
          name: 'aspectRatio',
          label: 'Aspect Ratio',
          type: 'select',
          options: [
            { label: 'Landscape (16:9)', value: '16:9' },
            { label: 'Portrait (9:16)', value: '9:16' },
            { label: 'Square (1:1)', value: '1:1' },
            { label: 'Wide (21:9)', value: '21:9' },
            { label: 'Standard (4:3)', value: '4:3' },
          ],
          defaultValue: '16:9',
          admin: {
            description: 'Preferred display aspect ratio',
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
        description: 'Optional: Link to a detailed project journey or case study',
      },
    },

    // Metadata & Organization
    {
      name: 'featured',
      label: 'Featured Project',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display prominently in category grids',
      },
    },
    {
      name: 'completionDate',
      label: 'Completion Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When the project was completed',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'clientName',
      label: 'Client Name',
      type: 'text',
      admin: {
        description: 'Optional: Client name for testimonials or attribution',
      },
    },
    {
      name: 'projectLocation',
      label: 'Project Location',
      type: 'text',
      admin: {
        description: 'Geographic location of the project',
        placeholder: 'e.g., Dallas, TX',
      },
    },

    // Project Details
    {
      name: 'projectDetails',
      label: 'Project Details',
      type: 'group',
      fields: [
        {
          name: 'budget',
          label: 'Budget Range',
          type: 'select',
          options: [
            { label: 'Under $50k', value: 'under-50k' },
            { label: '$50k - $100k', value: '50k-100k' },
            { label: '$100k - $250k', value: '100k-250k' },
            { label: '$250k - $500k', value: '250k-500k' },
            { label: 'Over $500k', value: 'over-500k' },
          ],
          admin: {
            description: 'Optional: Project budget range',
          },
        },
        {
          name: 'duration',
          label: 'Project Duration',
          type: 'text',
          admin: {
            description: 'How long the project took',
            placeholder: 'e.g., 6 months',
          },
        },
        {
          name: 'highlights',
          label: 'Project Highlights',
          type: 'array',
          fields: [
            {
              name: 'highlight',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'Key features or achievements',
          },
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
        description: 'Make this project visible on the website',
      },
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When to publish this project',
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
      fields: ['projectCode', 'siteKey'],
      unique: true,
    },
    {
      fields: ['slug', 'siteKey'],
      unique: true,
    },
    {
      fields: ['category', 'featured', 'completionDate'],
    },
    {
      fields: ['siteKey', 'published', 'category'],
    },
  ],
}

export default PortfolioProjects

import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const AnswersLanding: CollectionConfig = {
  slug: 'answersLanding',
  admin: {
    useAsTitle: 'title',
    description: 'Answers landing page configuration with dynamic sections',
    defaultColumns: ['title', 'siteKey', 'updatedAt'],
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
    
    // Hero Section Fields
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      maxLength: 200,
      defaultValue: 'Answers',
      admin: {
        description: 'Headline text over the hero image.',
      },
    },
    {
      name: 'heroSubheading',
      label: 'Hero Subheading',
      type: 'text',
      required: false,
      maxLength: 300,
      admin: {
        description: 'Optional subheading for additional context.',
      },
    },
    {
      name: 'heroRichText',
      label: 'Hero Rich Text',
      type: 'richText',
      admin: {
        description: 'Optional supporting text below the hero heading.',
      },
    },
    {
      name: 'heroImageTag',
      label: 'Hero Image Tag',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary tag for the hero background image.',
        placeholder: 'e.g., selah-pro,answers,hero',
      },
    },
    
    // Content Fields
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      defaultValue: 'Answers',
      admin: {
        description: 'Internal title for this answers landing page',
      },
    },
    
    // Answers Sections Array
    {
      name: 'sections',
      label: 'Answers Sections',
      type: 'array',
      admin: {
        description: 'Configure the answers sections displayed on the landing page',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'sectionKey',
          label: 'Section Key',
          type: 'select',
          required: true,
          options: [
            { label: 'FAQs', value: 'faqs' },
            { label: 'Guides', value: 'guides' },
            { label: 'Resources', value: 'resources' },
            { label: 'Support', value: 'support' },
          ],
          admin: {
            description: 'Internal identifier for this section',
          },
        },
        {
          name: 'title',
          label: 'Display Title',
          type: 'text',
          required: true,
          admin: {
            description: 'Public-facing title for this answers section',
          },
        },
        {
          name: 'description',
          label: 'Section Description',
          type: 'richText',
          admin: {
            description: 'Optional supporting copy for this answers section',
          },
        },
        {
          name: 'cloudinaryTag',
          label: 'Cloudinary Tag',
          type: 'text',
          required: true,
          admin: {
            description: 'Tag used to fetch images from Cloudinary for this section',
          },
        },
        {
          name: 'linkTo',
          label: 'Link To',
          type: 'text',
          required: true,
          admin: {
            description: 'Route path for this answers section (e.g., /answers/faqs)',
          },
        },
      ],
    },
    
    // Meta Fields
    {
      name: 'meta',
      label: 'Meta Information',
      type: 'group',
      admin: {
        description: 'SEO and social media metadata',
      },
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
          admin: {
            description: 'Override the default meta title for SEO',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Override the default meta description for SEO',
          },
        },
        {
          name: 'ogImageTag',
          label: 'Open Graph Image Tag',
          type: 'text',
          admin: {
            description: 'Cloudinary tag for the social media share image',
            placeholder: 'e.g., selah-pro,answers,og-image',
          },
        },
      ],
    },
    
    // Publishing & Timestamps
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
    ...timestampedFields,
  ],
}

export default AnswersLanding
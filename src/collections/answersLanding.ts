import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'
import { isAdmin, isAdminOrDesigner } from '../access/helpers'
import { sharedLayoutBlocks } from '../blocks/sharedBlocks'

const AnswersLanding: CollectionConfig = {
  slug: 'answersLanding',
  labels: {
    singular: 'Answers Landing',
    plural: 'Answers Landings',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Answers landing page configuration with dynamic sections',
    defaultColumns: ['title', 'siteKey', 'updatedAt'],
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

    // Content Blocks - Following journeys.ts pattern
    {
      name: 'contentBlocks',
      label: 'Content Blocks',
      type: 'blocks',
      admin: {
        description:
          'Build your answers page with flexible content blocks. Mix journey links, internal pages, and rich text content.',
      },
      blocks: [
        // Journeys Link Block
        {
          slug: 'journeysLinkBlock',
          labels: {
            singular: 'Journeys Link Block',
            plural: 'Journeys Link Blocks',
          },
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
              admin: {
                description: 'Display title for this journeys section',
              },
            },
            {
              name: 'description',
              label: 'Description',
              type: 'richText',
              admin: {
                description: 'Optional description text for this section',
              },
            },
            {
              name: 'cloudinaryTag',
              label: 'Cloudinary Tag',
              type: 'text',
              required: true,
              admin: {
                description: 'Tag used to fetch the featured image from Cloudinary',
              },
            },
            {
              name: 'journeysCategory',
              label: 'Journeys Category',
              type: 'select',
              required: true,
              options: [
                { label: 'Client Story', value: 'client-story' },
                { label: 'Spotlight', value: 'spotlight' },
                { label: 'Insight', value: 'insight' },
                { label: 'Testimonial', value: 'testimonial' },
                { label: 'Guided Tour', value: 'guided-tour' },
                { label: 'Elements', value: 'elements' },
                { label: 'Answers', value: 'answers' },
                { label: 'Technology', value: 'technology' },
                { label: 'Renderings', value: 'renderings' },
              ],
              admin: {
                description: 'Filter journeys by this category',
              },
            },
          ],
        },

        // Internal Page Block
        {
          slug: 'internalPageBlock',
          labels: {
            singular: 'Internal Page Block',
            plural: 'Internal Page Blocks',
          },
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
              admin: {
                description: 'Display title for this page link',
              },
            },
            {
              name: 'description',
              label: 'Description',
              type: 'richText',
              admin: {
                description: 'Optional description text for this page',
              },
            },
            {
              name: 'cloudinaryTag',
              label: 'Cloudinary Tag',
              type: 'text',
              required: true,
              admin: {
                description: 'Tag used to fetch the featured image from Cloudinary',
              },
            },
            {
              name: 'linkTo',
              label: 'Link To',
              type: 'text',
              required: true,
              admin: {
                description: 'Internal page path (e.g., /services/pool-construction)',
                placeholder: '/services/example-page',
              },
            },
          ],
        },

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
                description: 'Rich text content with formatting options',
              },
            },
          ],
        },
      ],
    },

    // New modular layout field
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      blocks: sharedLayoutBlocks,
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

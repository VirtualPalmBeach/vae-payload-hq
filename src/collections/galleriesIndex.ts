import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'
import { isAdmin } from '../access/helpers'

const GalleriesIndex: CollectionConfig = {
  slug: 'galleriesIndex',
  labels: {
    singular: 'Gallery Landing',
    plural: 'Galleries Landings',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'siteKey', 'published', 'updatedAt'],
    group: 'Content',
    description: 'Gallery index page configuration',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // Site Configuration
    commonSiteKeyField,

    // Core Fields
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title for the gallery index page',
      },
    },
    {
      name: 'introText',
      label: 'Introduction Text',
      type: 'richText',
      admin: {
        description: 'Rich text content for the gallery index page introduction',
      },
    },
    {
      name: 'cloudinaryHeroTag',
      label: 'Hero Image Tag',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary tag for the hero image',
        placeholder: 'e.g., gallery-hero-luxury',
      },
    },
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading for the gallery index hero section',
      },
    },
    {
      name: 'heroSubheading',
      label: 'Hero Subheading',
      type: 'text',
      admin: {
        description: 'Subheading text for the gallery index hero section',
      },
    },
    {
      name: 'heroRichText',
      label: 'Hero Rich Text',
      type: 'richText',
      admin: {
        description: 'Rich text content for the gallery index hero section',
      },
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'text',
      admin: {
        description: 'Cloudinary tag for hero image fallback',
        placeholder: 'e.g., gallery-hero-fallback',
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
        description: 'Make this page visible on the website',
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
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (data && (operation === 'create' || (operation === 'update' && data.siteKey))) {
          const { payload } = req
          const existingDocs = await payload.find({
            collection: 'galleriesIndex',
            where: {
              siteKey: { equals: data.siteKey },
              ...(data.id ? { id: { not_equals: data.id } } : {}),
            },
          })

          if (existingDocs.totalDocs > 0) {
            throw new Error(
              `A galleries index already exists for site ${data.siteKey}. Only one galleries index is allowed per site.`,
            )
          }
        }

        return data
      },
    ],
  },
  indexes: [
    {
      fields: ['siteKey'],
      unique: true, // One galleries index page per site
    },
  ],
}

export default GalleriesIndex

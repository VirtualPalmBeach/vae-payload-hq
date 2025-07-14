import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const Galleries: CollectionConfig = {
  slug: 'galleries',
  labels: {
    singular: 'Gallery Index',
    plural: 'Galleries Index',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Gallery collections with dynamic image sourcing',
    defaultColumns: ['title', 'slug', 'status'],
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
    {
      ...commonSiteKeyField,
      unique: true,
    },
    
    // Core Fields
    {
      name: 'title',
      label: 'Gallery Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for this gallery',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for this gallery (e.g., "featured-projects")',
      },
    },
    
    // Hero Section Fields - Index Hero Pattern v1
    {
      name: 'heroMedia',
      label: 'Hero Image',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      maxLength: 200,
      defaultValue: 'Gallery',
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
    
    // Gallery Images Array
    {
      name: 'images',
      label: 'Gallery Images',
      type: 'array',
      required: false,
      admin: {
        description: 'Images to display in this gallery with optional labels',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'media',
          label: 'Image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Select an image from the media library',
          },
        },
        {
          name: 'cardLabel',
          label: 'Card Label',
          type: 'text',
          required: false,
          maxLength: 100,
          admin: {
            description: 'Optional label displayed as overlay on the image card',
            placeholder: 'e.g., Featured Project, Award Winner',
          },
        },
      ],
    },
    
    // Legacy Image Source Configuration (Deprecated - for backward compatibility)
    {
      name: 'imageSource',
      label: 'Image Source (Legacy)',
      type: 'text',
      required: false,
      admin: {
        description: 'DEPRECATED - Use Gallery Images array instead. Cloudinary folder path for gallery images.',
        placeholder: 'e.g., gallery/features, gallery/materials',
        condition: (data) => !data.images || data.images.length === 0,
      },
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
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation === 'create' || (operation === 'update' && data.siteKey)) {
          const { payload } = req
          const existingDocs = await payload.find({
            collection: 'galleries',
            where: {
              siteKey: { equals: data.siteKey },
              ...(data.id ? { id: { not_equals: data.id } } : {}),
            },
          })
          
          if (existingDocs.totalDocs > 0) {
            throw new Error(`A gallery index already exists for site ${data.siteKey}. Only one gallery index is allowed per site.`)
          }
        }
        
        return data
      },
    ],
  },
}

export default Galleries
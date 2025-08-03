import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const journeysLanding: CollectionConfig = {
  slug: 'journeysLanding',
  labels: {
    singular: 'Journeys (Stories) Landing',
    plural: 'Journeys (Stories) Landings',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Journeys landing page configuration - Index Hero Pattern v1',
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
      defaultValue: 'Journeys',
      admin: {
        description: 'Internal title for this journeys landing page',
      },
    },

    // Hero Section Fields - Index Hero Pattern v1
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'text',
      required: false,
      admin: {
        description: 'Used as the background image for the hero section.',
        placeholder: 'e.g., selah-pro,journeys,hero',
      },
    },
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      maxLength: 200,
      defaultValue: 'Client Journeys',
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

    // Content Fields
    {
      name: 'headline',
      label: 'Headline',
      type: 'richText',
      admin: {
        description: 'Main headline displayed on the journeys landing page',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Supporting description text for the journeys landing page',
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

export default journeysLanding

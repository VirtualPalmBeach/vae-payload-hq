import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const PortfolioLanding: CollectionConfig = {
  slug: 'portfolioLanding',
  admin: {
    useAsTitle: 'title',
    description: 'Portfolio landing page configuration with dynamic sections',
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
    
    // Content Fields
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      defaultValue: 'Portfolio',
      admin: {
        description: 'Internal title for this portfolio landing page',
      },
    },
    {
      name: 'headline',
      label: 'Headline',
      type: 'richText',
      admin: {
        description: 'Main headline displayed on the portfolio landing page',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Supporting description text for the portfolio landing page',
      },
    },
    
    // Portfolio Sections Array
    {
      name: 'sections',
      label: 'Portfolio Sections',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      admin: {
        description: 'Configure the three portfolio sections (Commercial, Residential, Renovation),',
        initCollapsed: false,
      },
      defaultValue: [
        {
          sectionKey: 'commercial',
          title: 'Commercial',
          cloudinaryTag: 'commercial',
          linkTo: '/portfolio/commercial',
        },
        {
          sectionKey: 'residential',
          title: 'Residential',
          cloudinaryTag: 'residential',
          linkTo: '/portfolio/residential',
        },
        {
          sectionKey: 'renovation',
          title: 'Renovation',
          cloudinaryTag: 'renovation',
          linkTo: '/portfolio/renovation',
        },
      ],
      fields: [
        {
          name: 'sectionKey',
          label: 'Section Key',
          type: 'select',
          required: true,
          options: [
            { label: 'Commercial', value: 'commercial' },
            { label: 'Residential', value: 'residential' },
            { label: 'Renovation', value: 'renovation' },
          ],
          admin: {
            hidden: true,
            readOnly: true,
            description: 'Internal identifier for this section (locked after creation)',
          },
        },
        {
          name: 'title',
          label: 'Display Title',
          type: 'text',
          required: true,
          admin: {
            description: 'Public-facing title for this portfolio section',
          },
        },
        {
          name: 'description',
          label: 'Section Description',
          type: 'richText',
          admin: {
            description: 'Optional supporting copy for this portfolio section',
          },
        },
        {
          name: 'cloudinaryTag',
          label: 'Cloudinary Tag',
          type: 'text',
          required: true,
          admin: {
            description: 'Tag used to fetch images from Cloudinary for this section (e.g., commercial, residential)',
          },
        },
        {
          name: 'linkTo',
          label: 'Link To',
          type: 'text',
          required: true,
          admin: {
            description: 'Route path for this portfolio section (e.g., /portfolio/commercial)',
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
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Ensure section keys remain locked after creation
        if (operation === 'update' && data.sections) {
          // Preserve the original sectionKey values
          data.sections = data.sections.map((section: any, index: number) => {
            const keys = ['commercial', 'residential', 'renovation']
            return {
              ...section,
              sectionKey: keys[index] || section.sectionKey,
            }
          })
        }
        return data
      },
    ],
  },
}

export default PortfolioLanding
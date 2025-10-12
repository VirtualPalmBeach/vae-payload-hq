import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'
import { isAdmin } from '../access/helpers'
import { sharedLayoutBlocks } from '../blocks/sharedBlocks'

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
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // Site Configuration
    commonSiteKeyField,
    
    // Hero Section Fields - Index Hero Pattern v1
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'text',
      required: false,
      admin: {
        description: 'Used as the background image for the hero section.',
        placeholder: 'e.g., selah-pro,portfolio,hero',
      },
    },
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      maxLength: 200,
      defaultValue: 'Portfolio',
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
    
    // Subpage Hero Fields - Index Hero Pattern v1 for category pages
    // Residential Hero
    {
      name: 'residentialHero',
      label: 'Residential Page Hero',
      type: 'group',
      admin: {
        description: 'Hero content for the Residential portfolio page',
      },
      fields: [
        {
          name: 'title',
          label: 'Hero Title',
          type: 'text',
          required: false,
          maxLength: 200,
          defaultValue: 'Residential Portfolio',
          admin: {
            description: 'Headline text for the Residential portfolio page hero',
          },
        },
        {
          name: 'subhead',
          label: 'Hero Subheading',
          type: 'richText',
          admin: {
            description: 'Supporting rich text content below the hero title',
          },
        },
        {
          name: 'cloudinaryTag',
          label: 'Hero Image Tag',
          type: 'text',
          required: false,
          admin: {
            description: 'Cloudinary tag for the Residential hero background image',
            placeholder: 'e.g., selah-pro,portfolio,residential,hero',
          },
        },
      ],
    },
    
    // Renovation Hero
    {
      name: 'renovationHero',
      label: 'Renovation Page Hero',
      type: 'group',
      admin: {
        description: 'Hero content for the Renovation portfolio page',
      },
      fields: [
        {
          name: 'title',
          label: 'Hero Title',
          type: 'text',
          required: false,
          maxLength: 200,
          defaultValue: 'Renovation Portfolio',
          admin: {
            description: 'Headline text for the Renovation portfolio page hero',
          },
        },
        {
          name: 'subhead',
          label: 'Hero Subheading',
          type: 'richText',
          admin: {
            description: 'Supporting rich text content below the hero title',
          },
        },
        {
          name: 'cloudinaryTag',
          label: 'Hero Image Tag',
          type: 'text',
          required: false,
          admin: {
            description: 'Cloudinary tag for the Renovation hero background image',
            placeholder: 'e.g., selah-pro,portfolio,renovation,hero',
          },
        },
      ],
    },
    
    // Commercial Hero
    {
      name: 'commercialHero',
      label: 'Commercial Page Hero',
      type: 'group',
      admin: {
        description: 'Hero content for the Commercial portfolio page',
      },
      fields: [
        {
          name: 'title',
          label: 'Hero Title',
          type: 'text',
          required: false,
          maxLength: 200,
          defaultValue: 'Commercial Portfolio',
          admin: {
            description: 'Headline text for the Commercial portfolio page hero',
          },
        },
        {
          name: 'subhead',
          label: 'Hero Subheading',
          type: 'richText',
          admin: {
            description: 'Supporting rich text content below the hero title',
          },
        },
        {
          name: 'cloudinaryTag',
          label: 'Hero Image Tag',
          type: 'text',
          required: false,
          admin: {
            description: 'Cloudinary tag for the Commercial hero background image',
            placeholder: 'e.g., selah-pro,portfolio,commercial,hero',
          },
        },
      ],
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
    
    // Page Layout
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      blocks: sharedLayoutBlocks,
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
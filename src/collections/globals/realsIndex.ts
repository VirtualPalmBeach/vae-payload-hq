/**
 * Index Hero Pattern v1 - Template for scalable index page hero content
 * 
 * This pattern establishes a consistent structure for index page hero sections
 * across the application. Can be used as a template for:
 * - journeysIndex
 * - portfolioIndex
 * - servicesIndex
 * - And other future index pages requiring hero content
 * 
 * Pattern includes:
 * - Hero heading (text)
 * - Hero subheading (rich text)
 * - Hero image (Cloudinary tag)
 * - Site-specific configuration
 * - Unique index constraint per site
 */

import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from '../commonSiteKeyField'
import { timestampedFields } from '../../fields/timestampedFields'

const realsIndex: CollectionConfig = {
  slug: 'realsIndex',
  admin: {
    useAsTitle: 'heroHeading',
    defaultColumns: ['heroHeading', 'siteKey', 'updatedAt'],
    group: 'Content',
    description: 'Hero content for the Reals index page',
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
    
    // Hero Content Fields - following ContactPage exact pattern
    {
      name: 'heroHeading',
      label: 'Hero Heading',
      type: 'text',
      required: true,
      maxLength: 200,
      defaultValue: 'Reals',
      admin: {
        description: 'Main heading for the reals page',
      },
    },
    {
      name: 'heroSubheading',
      label: 'Hero Subheading',
      type: 'richText',
      admin: {
        description: 'Short paragraph or rich text block beneath the hero heading',
      },
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary tags for the background hero image. Enter comma-separated tags for flexible search.',
        placeholder: 'e.g., selah-pro,reals,hero',
      },
    },
    
    // Timestamps
    ...timestampedFields,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Ensure single document per site
        return data
      },
    ],
  },
  indexes: [
    {
      fields: ['siteKey'],
      unique: true, // One reals index page per site
    },
  ],
}

export default realsIndex
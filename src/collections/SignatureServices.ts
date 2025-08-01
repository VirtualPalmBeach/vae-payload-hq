import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const SignatureServices: CollectionConfig = {
  slug: 'signatureServices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'shortDescription', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    commonSiteKeyField,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              label: 'Service Title',
              type: 'text',
              required: true,
              maxLength: 200,
              admin: {
                description: 'The main title for this signature service',
              },
            },
            {
              name: 'shortDescription',
              label: 'Short Description',
              type: 'textarea',
              maxLength: 500,
              admin: {
                description: 'Brief overview of the service (for cards and listings)',
              },
            },
            {
              name: 'heroImage',
              label: 'Hero Image',
              type: 'text',
              required: true,
              validate: (value: string | null | undefined): string | true => {
                if (!value) return 'Hero image is required'
                return true
              },
              admin: {
                description: 'Cloudinary tag for the hero image',
              },
            },
            {
              name: 'videoPublicId',
              label: 'Video Public ID',
              type: 'text',
              admin: {
                description: 'Optional Cloudinary public ID for a showcase video',
              },
            },
            {
              name: 'detailBlocks',
              label: 'Detail Blocks',
              type: 'array',
              fields: [
                {
                  name: 'blockTitle',
                  label: 'Block Title',
                  type: 'text',
                  required: true,
                  maxLength: 150,
                },
                {
                  name: 'richTextContent',
                  label: 'Content',
                  type: 'richText',
                  required: true,
                },
                {
                  name: 'optionalImage',
                  label: 'Optional Image',
                  type: 'text',
                  admin: {
                    description: 'Cloudinary tag for optional block image',
                  },
                },
              ],
              admin: {
                description: 'Add detailed content blocks with optional images',
              },
            },
            {
              name: 'galleryImages',
              label: 'Gallery Images',
              type: 'array',
              fields: [
                {
                  name: 'cloudinaryTag',
                  label: 'Image Tag',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Cloudinary tag for gallery image',
                  },
                },
              ],
              admin: {
                description: 'Optional image gallery for this service',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta Title',
              type: 'text',
              maxLength: 60,
              admin: {
                description: 'SEO title (defaults to service title if empty)',
              },
            },
            {
              name: 'metaDescription',
              label: 'Meta Description',
              type: 'textarea',
              maxLength: 160,
              admin: {
                description: 'SEO description for search results',
              },
            },
            {
              name: 'structuredDataJSON',
              label: 'Structured Data JSON',
              type: 'json',
              admin: {
                description: 'Optional schema.org JSON-LD structured data',
              },
            },
            {
              name: 'serviceType',
              label: 'Service Type',
              type: 'text',
              admin: {
                description:
                  'Optional service type for schema.org alignment (e.g., "PoolConstruction", "PoolDesign")',
              },
            },
          ],
        },
        {
          label: 'Local Signals',
          fields: [
            {
              name: 'primaryLocation',
              label: 'Primary Location',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  label: 'Street Address',
                  type: 'text',
                  maxLength: 200,
                },
                {
                  name: 'city',
                  label: 'City',
                  type: 'text',
                  required: true,
                  maxLength: 100,
                },
                {
                  name: 'state',
                  label: 'State',
                  type: 'text',
                  required: true,
                  maxLength: 2,
                  admin: {
                    description: 'Two-letter state code (e.g., TX)',
                  },
                },
                {
                  name: 'zip',
                  label: 'ZIP Code',
                  type: 'text',
                  required: true,
                  maxLength: 10,
                },
              ],
              admin: {
                description: 'Primary service location for local SEO',
              },
            },
            {
              name: 'serviceAreaType',
              label: 'Service Area Type',
              type: 'select',
              options: [
                {
                  label: 'Radius-based',
                  value: 'radius',
                },
                {
                  label: 'Specific Regions',
                  value: 'regions',
                },
                {
                  label: 'Custom Coverage',
                  value: 'custom',
                },
              ],
              defaultValue: 'radius',
              admin: {
                description: 'How the service area is defined',
              },
            },
            {
              name: 'serviceRadius',
              label: 'Service Radius (miles)',
              type: 'number',
              min: 0,
              max: 500,
              admin: {
                condition: (data) => data?.serviceAreaType === 'radius',
                description: 'Service radius in miles from primary location',
              },
            },
            {
              name: 'serviceRegions',
              label: 'Service Regions',
              type: 'array',
              fields: [
                {
                  name: 'city',
                  label: 'City',
                  type: 'text',
                  required: true,
                  maxLength: 100,
                },
                {
                  name: 'state',
                  label: 'State',
                  type: 'text',
                  required: true,
                  maxLength: 2,
                  admin: {
                    description: 'Two-letter state code',
                  },
                },
              ],
              admin: {
                condition: (data) => data?.serviceAreaType === 'regions',
                description: 'Specific cities/regions served',
              },
            },
            {
              name: 'geoDescription',
              label: 'Geographic Coverage Description',
              type: 'textarea',
              admin: {
                description: 'Editorial description of the service coverage area for local SEO',
              },
            },
          ],
        },
      ],
    },
    ...timestampedFields,
  ],
  indexes: [
    {
      fields: ['siteKey', 'title'],
      unique: true,
    },
  ],
}

export default SignatureServices

import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { isAdmin } from '../access/helpers'

const SeoEntries: CollectionConfig = {
  slug: 'seoEntries',
  labels: {
    singular: 'SEO Entry',
    plural: 'SEO Entries',
  },
  admin: {
    useAsTitle: 'routeKey',
    group: 'SEO',
    defaultColumns: ['siteKey', 'routeKey', 'areaKey', 'status', 'updatedAt'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        // Trim and lowercase the three key fields
        if (data?.siteKey) {
          data.siteKey = String(data.siteKey).trim()
        }

        if (data?.routeKey) {
          // Trim, lowercase, and collapse duplicate slashes
          data.routeKey = String(data.routeKey).trim().toLowerCase().replace(/\/+/g, '/')

          // Reject empty strings
          if (data.routeKey === '') {
            throw new Error('routeKey cannot be empty')
          }
        }

        if (data?.areaKey !== undefined) {
          if (data.areaKey === null || data.areaKey === '') {
            data.areaKey = null // Normalize empty to null for optional field
          } else {
            data.areaKey = String(data.areaKey).trim().toLowerCase()

            // Reject empty strings for areaKey if provided
            if (data.areaKey === '') {
              data.areaKey = null
            }
          }
        }

        // Validate canonicalPathOverride
        if (data?.canonicalPathOverride) {
          const canonical = String(data.canonicalPathOverride).trim()

          // Must start with "/"
          if (!canonical.startsWith('/')) {
            throw new Error('canonicalPathOverride must start with "/"')
          }

          // No trailing slash except for root
          if (canonical !== '/' && canonical.endsWith('/')) {
            throw new Error('canonicalPathOverride cannot have trailing slash except for root')
          }

          // Reject if contains host or querystring
          if (canonical.includes('://') || canonical.includes('?') || canonical.includes('#')) {
            throw new Error('canonicalPathOverride cannot contain host, querystring, or fragment')
          }

          data.canonicalPathOverride = canonical
        }

        return data
      },
    ],
  },
  fields: [
    // ============================================
    // Identity and Uniqueness
    // ============================================
    commonSiteKeyField,
    {
      name: 'routeKey',
      label: 'Route Key',
      type: 'text',
      required: true,
      admin: {
        description: 'The route path to override SEO for (e.g., /services/pool-design)',
      },
    },
    {
      name: 'areaKey',
      label: 'Area Key',
      type: 'text',
      admin: {
        description: 'Optional area-specific override (e.g., dallas, fort-worth)',
      },
    },

    // ============================================
    // Core SEO Fields
    // ============================================
    {
      type: 'group',
      name: 'seo',
      label: 'SEO Overrides',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          maxLength: 70,
          admin: {
            description: 'Page title for search results (max 70 chars)',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          maxLength: 300,
          admin: {
            description: 'Meta description for search results (max 300 chars)',
          },
        },
        {
          name: 'canonicalPathOverride',
          label: 'Canonical Path Override',
          type: 'text',
          admin: {
            description:
              'Override canonical URL path (must start with /, no trailing slash except root)',
          },
        },
        {
          name: 'noindex',
          label: 'No Index',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from indexing this page',
          },
        },
        {
          name: 'nofollow',
          label: 'No Follow',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from following links on this page',
          },
        },
        {
          name: 'breadcrumbsLabel',
          label: 'Breadcrumbs Label',
          type: 'text',
          admin: {
            description: 'Override label for this page in breadcrumbs',
          },
        },
      ],
    },

    // ============================================
    // Social Media Overrides
    // ============================================
    {
      type: 'group',
      name: 'social',
      label: 'Social Media',
      fields: [
        {
          name: 'ogImageRef',
          label: 'Open Graph Image',
          type: 'text',
          admin: {
            description: 'Cloudinary public_id for social share image',
          },
        },
        {
          name: 'ogTitle',
          label: 'Open Graph Title',
          type: 'text',
          maxLength: 70,
          admin: {
            description: 'Title for social media shares',
          },
        },
        {
          name: 'ogDescription',
          label: 'Open Graph Description',
          type: 'textarea',
          maxLength: 200,
          admin: {
            description: 'Description for social media shares',
          },
        },
        {
          name: 'twitterTitle',
          label: 'Twitter Title',
          type: 'text',
          maxLength: 70,
          admin: {
            description: 'Title specifically for Twitter/X shares',
          },
        },
        {
          name: 'twitterDescription',
          label: 'Twitter Description',
          type: 'textarea',
          maxLength: 200,
          admin: {
            description: 'Description specifically for Twitter/X shares',
          },
        },
      ],
    },

    // ============================================
    // JSON-LD Blocks (Narrow Union)
    // ============================================
    {
      type: 'group',
      name: 'jsonLd',
      label: 'Structured Data (JSON-LD)',
      fields: [
        // WebPage block
        {
          name: 'webPage',
          label: 'WebPage Schema',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Include WebPage structured data',
          },
        },

        // BreadcrumbList block
        {
          name: 'breadcrumbList',
          label: 'BreadcrumbList Schema',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Include BreadcrumbList structured data',
          },
        },

        // Article block
        {
          name: 'article',
          label: 'Article Schema',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.article?.headline,
          },
          fields: [
            {
              name: 'headline',
              label: 'Headline',
              type: 'text',
              required: true,
              admin: {
                description: 'Article headline (required for Article schema)',
              },
            },
            {
              name: 'datePublished',
              label: 'Date Published',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'dateModified',
              label: 'Date Modified',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'authorName',
              label: 'Author Name',
              type: 'text',
            },
            {
              name: 'contentLocationRef',
              label: 'Content Location',
              type: 'relationship',
              relationTo: 'locations',
              admin: {
                description: 'Reference to location for this article',
              },
            },
          ],
        },

        // VideoObject block
        {
          name: 'videoObject',
          label: 'VideoObject Schema',
          type: 'group',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.videoObject?.name && siblingData?.videoObject?.contentURL,
          },
          fields: [
            {
              name: 'name',
              label: 'Video Name',
              type: 'text',
              required: true,
              admin: {
                description: 'Video title (required for VideoObject schema)',
              },
            },
            {
              name: 'description',
              label: 'Video Description',
              type: 'textarea',
              maxLength: 300,
            },
            {
              name: 'uploadDate',
              label: 'Upload Date',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'duration',
              label: 'Duration',
              type: 'text',
              admin: {
                description: 'ISO 8601 duration (e.g., PT4M30S for 4 minutes 30 seconds)',
                placeholder: 'PT4M30S',
              },
            },
            {
              name: 'thumbnailURL',
              label: 'Thumbnail URL',
              type: 'text',
              admin: {
                description: 'Full URL to video thumbnail',
              },
            },
            {
              name: 'contentURL',
              label: 'Content URL',
              type: 'text',
              required: true,
              admin: {
                description: 'Full URL to video file (required for VideoObject schema)',
              },
            },
          ],
        },

        // Service block
        {
          name: 'service',
          label: 'Service Schema',
          type: 'group',
          fields: [
            {
              name: 'name',
              label: 'Service Name',
              type: 'text',
              admin: {
                description: 'Service name (defaults to "Pool Design & Build" if omitted)',
              },
            },
            {
              name: 'description',
              label: 'Service Description',
              type: 'textarea',
              maxLength: 300,
            },
            {
              name: 'areaServedRefs',
              label: 'Service Areas',
              type: 'relationship',
              relationTo: 'serviceAreas', // Will be added next
              hasMany: true,
              admin: {
                description: 'Reference to service areas (to be implemented)',
              },
            },
          ],
        },
      ],
    },

    // ============================================
    // Workflow and Status
    // ============================================
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Review', value: 'review' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  indexes: [
    {
      fields: ['siteKey', 'routeKey', 'areaKey'],
      unique: true,
    },
  ],
}

export default SeoEntries

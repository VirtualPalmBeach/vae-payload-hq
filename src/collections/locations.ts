import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { isAdmin } from '../access/helpers'

const Locations: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: 'Location',
    plural: 'Locations',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SEO',
    defaultColumns: ['name', 'city', 'state', 'postalCode', 'updatedAt'],
  },
  versions: {
    drafts: false,
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
        // Trim all string fields
        if (data?.name) {
          data.name = String(data.name).trim()
        }

        if (data?.city) {
          data.city = String(data.city).trim()
          // Basic validation - just ensure it's not empty
          if (data.city === '') {
            throw new Error('City cannot be empty')
          }
        }

        if (data?.state) {
          data.state = String(data.state).trim().toUpperCase()
          // Basic validation - just ensure it's 2 characters
          if (data.state.length !== 2) {
            throw new Error('State must be 2 characters')
          }
        }

        if (data?.postalCode) {
          data.postalCode = String(data.postalCode).trim()
          // Basic validation - just ensure it's 5 characters
          if (data.postalCode.length !== 5) {
            throw new Error('Postal code must be 5 characters')
          }
        }

        // Optional fields
        if (data?.county) {
          data.county = String(data.county).trim()
        }

        if (data?.region) {
          data.region = String(data.region).trim()
        }

        // Generate or validate slug
        if (data?.slug) {
          // Ensure slug is lowercase and hyphenated
          data.slug = String(data.slug)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        } else if (data?.city && data?.state && !data.slug) {
          // Auto-generate slug from city and state
          data.slug = `${data.city}-${data.state}`
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        }

        // Validate coordinates if present
        if (data?.lat !== undefined && data?.lat !== null) {
          const lat = Number(data.lat)
          if (isNaN(lat) || lat < -90 || lat > 90) {
            throw new Error('Latitude must be between -90 and 90')
          }
          data.lat = lat
        }

        if (data?.lng !== undefined && data?.lng !== null) {
          const lng = Number(data.lng)
          if (isNaN(lng) || lng < -180 || lng > 180) {
            throw new Error('Longitude must be between -180 and 180')
          }
          data.lng = lng
        }

        // Handle legacy coordinates group (backward compatibility)
        if (data?.coordinates) {
          if (data.coordinates.latitude !== undefined && data.lat === undefined) {
            const lat = Number(data.coordinates.latitude)
            if (!isNaN(lat) && lat >= -90 && lat <= 90) {
              data.lat = lat
            }
          }
          if (data.coordinates.longitude !== undefined && data.lng === undefined) {
            const lng = Number(data.coordinates.longitude)
            if (!isNaN(lng) && lng >= -180 && lng <= 180) {
              data.lng = lng
            }
          }
          // Remove old coordinates group after migration
          delete data.coordinates
        }

        return data
      },
    ],
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display label for this location (e.g., "Argyle")',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (auto-generated from city-state if empty)',
        position: 'sidebar',
      },
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
      admin: {
        description: 'City name (letters, spaces, periods, apostrophes, hyphens only)',
      },
      // Simplified validation - just ensure it's not empty
      validate: (value: string | string[] | null | undefined) => {
        const val = Array.isArray(value) ? value[0] : value
        if (!val || String(val).trim() === '') {
          return 'City is required'
        }
        return true
      },
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      required: true,
      maxLength: 2,
      admin: {
        description: '2-letter US state code (e.g., TX, CA)',
      },
      // Simplified validation - just ensure it's 2 characters
      validate: (value: string | string[] | null | undefined) => {
        const val = Array.isArray(value) ? value[0] : value
        if (!val || String(val).trim().length !== 2) {
          return 'State must be 2 characters'
        }
        return true
      },
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      required: true,
      maxLength: 5,
      admin: {
        description: '5-digit US ZIP code',
      },
      // Simplified validation - just ensure it's 5 characters
      validate: (value: string | string[] | null | undefined) => {
        const val = Array.isArray(value) ? value[0] : value
        if (!val || String(val).trim().length !== 5) {
          return 'Postal code must be 5 characters'
        }
        return true
      },
    },
    {
      name: 'county',
      label: 'County',
      type: 'text',
      required: false,
      admin: {
        description: 'County name (optional)',
        position: 'sidebar',
      },
    },
    {
      name: 'region',
      label: 'Region',
      type: 'text',
      required: false,
      admin: {
        description: 'Marketing region grouping (optional)',
        position: 'sidebar',
      },
    },
    {
      name: 'lat',
      label: 'Latitude',
      type: 'number',
      required: false,
      min: -90,
      max: 90,
      admin: {
        description: 'Latitude coordinate (-90 to 90)',
      },
    },
    {
      name: 'lng',
      label: 'Longitude',
      type: 'number',
      required: false,
      min: -180,
      max: 180,
      admin: {
        description: 'Longitude coordinate (-180 to 180)',
      },
    },
    // Legacy fields for backward compatibility (hidden from admin)
    {
      name: 'coordinates',
      label: 'Coordinates (Legacy)',
      type: 'group',
      admin: {
        hidden: true, // Hide from admin UI
      },
      fields: [
        {
          name: 'latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          type: 'number',
        },
      ],
    },
    {
      name: 'zipCodes',
      label: 'ZIP Codes (Legacy)',
      type: 'array',
      admin: {
        hidden: true, // Hide from admin UI
      },
      fields: [
        {
          name: 'zip',
          type: 'text',
        },
      ],
    },
    // Optional metadata fields
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Optional description of this location',
      },
    },
    {
      name: 'areaId',
      label: 'Area ID',
      type: 'text',
      required: false,
      admin: {
        description: 'Area identifier for this location',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'text',
      admin: {
        description: 'Cloudinary public_id for location image',
      },
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
      admin: {
        description: 'Internal project code reference',
      },
    },
    {
      name: 'serviceRadiusMeters',
      label: 'Service Radius (meters)',
      type: 'number',
      admin: {
        description: 'Service area radius in meters',
      },
    },
  ],
  indexes: [
    {
      fields: ['slug'],
      unique: true,
    },
    {
      fields: ['city', 'state'],
    },
    {
      fields: ['postalCode'],
    },
  ],
}

export default Locations

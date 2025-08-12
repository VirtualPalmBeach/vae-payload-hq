import { CollectionConfig } from 'payload'

const ServiceAreas: CollectionConfig = {
  slug: 'serviceAreas',
  labels: {
    singular: 'Service Area',
    plural: 'Service Areas',
  },
  admin: {
    useAsTitle: 'label',
    group: 'SEO',
    defaultColumns: ['label', 'slug', 'locations', 'updatedAt'],
  },
  versions: {
    drafts: false,
    maxPerDoc: 10,
  },
  access: {
    read: () => true, // Public read
    create: ({ req: { user } }) => Boolean(user), // Admin only
    update: ({ req: { user } }) => Boolean(user), // Admin only
    delete: ({ req: { user } }) => Boolean(user), // Admin only
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        // Trim and process label
        if (data?.label) {
          data.label = String(data.label).trim()
        }

        // Generate or process slug
        if (data?.slug) {
          // Trim, lowercase, and convert spaces to hyphens
          data.slug = String(data.slug)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric except hyphens
            .replace(/-+/g, '-') // Collapse multiple hyphens
            .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
        } else if (data?.label && !data.slug) {
          // Generate slug from label if empty
          data.slug = String(data.label)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        }

        // Validate slug is not empty
        if (data?.slug === '') {
          throw new Error('Slug cannot be empty')
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
      admin: {
        description: 'Public name for this service area',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (auto-generated from label if empty)',
        position: 'sidebar',
      },
    },
    {
      name: 'locations',
      label: 'Locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      required: true,
      admin: {
        description: 'List of locations included in this service area',
      },
    },
    {
      name: 'serviceAreaTier',
      label: 'Service Area Tier',
      type: 'select',
      required: false,
      admin: {
        description: 'Lowest number is highest value Tier',
      },
      options: [
        {
          label: 'Tier 1 (Highest)',
          value: 'tier1',
        },
        {
          label: 'Tier 2',
          value: 'tier2',
        },
        {
          label: 'Tier 3',
          value: 'tier3',
        },
        {
          label: 'Tier 4',
          value: 'tier4',
        },
        {
          label: 'Tier 5',
          value: 'tier5',
        },
        {
          label: 'Tier 6',
          value: 'tier6',
        },
        {
          label: 'Tier 7 (Lowest)',
          value: 'tier7',
        },
      ],
    },
    {
      name: 'market',
      label: 'Market',
      type: 'select',
      required: false,
      admin: {
        description: 'Market (regional airport code)',
      },
      options: [
        {
          label: 'DFW',
          value: 'DFW',
        },
        {
          label: 'PBI',
          value: 'PBI',
        },
        {
          label: 'AUS',
          value: 'AUS',
        },
        {
          label: 'ECP',
          value: 'ECP',
        },
      ],
    },
  ],
  indexes: [
    {
      fields: ['slug'],
      unique: true,
    },
  ],
}

export default ServiceAreas

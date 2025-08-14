import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    useAsTitle: 'email',
  },

  // expanded config enables API‑key support
  auth: {
    useAPIKey: true, // ← new flag activates key generation UI
    // tokenExpiration: '7d', // optional: keep existing settings here
  },

  fields: [
    // "email" field added automatically by Payload
    // Additional custom fields may be declared below
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'SEO Service', value: 'seoService' },
      ],
      defaultValue: 'admin',
      required: true,
      admin: {
        description: 'User role determines access permissions',
      },
    },
  ],
}

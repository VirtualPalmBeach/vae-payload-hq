import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/helpers'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    useAsTitle: 'email',
  },

  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
        { label: 'Designer', value: 'designer' },
      ],
      defaultValue: 'editor',
      required: true,
      admin: {
        description: 'User role determines access permissions',
      },
    },
  ],
}

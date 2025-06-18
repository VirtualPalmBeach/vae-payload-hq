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
    // “email” field added automatically by Payload
    // Additional custom fields may be declared below
  ],
}

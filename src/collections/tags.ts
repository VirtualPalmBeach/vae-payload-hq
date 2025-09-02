import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { isAdmin } from '../access/helpers'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'parentTag' },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'parentTag',
      label: 'Parent Tag',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Project code or Spotlight category (e.g. Social, Features, Materials)',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Enter URL-friendly slug',
      },
    },
    {
      name: 'childTags',
      label: 'Child Tags',
      type: 'text',
      admin: {
        description: 'Spotlight category (e.g. Single Project, Social, Features, Materials)',
      },
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: { position: 'sidebar' },
    },
  ],
}

export default Tags

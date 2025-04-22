import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'label' },
  fields: [
    commonSiteKeyField,
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'color',
      label: 'Color',
      type: 'text',
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'text',
      label: 'Cloudinary URL',
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
      required: false,
    },
  ],
}

export default Tags

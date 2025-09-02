import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { isAdmin } from '../access/helpers';

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'group',
      fields: [
        { name: 'street',      label: 'Street',      type: 'text' },
        { name: 'city',        label: 'City',        type: 'text' },
        { name: 'state',       label: 'State',       type: 'text' },
        { name: 'zip',         label: 'Zip',         type: 'text' },
        { name: 'county',      label: 'County',      type: 'text' },
        { name: 'subdivision', label: 'Subdivision', type: 'text' },
        {
          name: 'coordinates',
          label: 'Coordinates',
          type: 'group',
          fields: [
            {
              name: 'latitude',
              label: 'Latitude',
              type: 'number',
              required: true,
            },
            {
              name: 'longitude',
              label: 'Longitude',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'text',
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: ['categories'] as const,
      hasMany: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: ['tags'] as const,
      hasMany: true,
    },
  ],
};

export default Projects;
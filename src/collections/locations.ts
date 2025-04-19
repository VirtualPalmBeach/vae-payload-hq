import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Locations: CollectionConfig = {
  slug: 'locations',
  admin: { useAsTitle: 'name' },
  fields: [
    commonSiteKeyField,
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'region',
      label: 'Region',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
    },
    {
      name: 'county',
      label: 'County',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      required: true,
    },
    {
      name: 'zipCodes',
      label: 'Zip Codes',
      type: 'array',
      fields: [
        {
          name: 'zip',
          label: 'Zip Code',
          type: 'text',
        },
      ],
    },
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
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'text',
      admin: { description: 'Cloudinary URL' },
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
    },
    {
      name: 'serviceRadiusMeters',
      label: 'Service Radius (meters)',
      type: 'number',
    },
  ],
};

export default Locations;

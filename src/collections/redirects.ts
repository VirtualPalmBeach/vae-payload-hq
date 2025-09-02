import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/helpers';
import { commonSiteKeyField } from './commonSiteKeyField';
import { timestampedFields } from '../fields/timestampedFields';
import { optionalDisplayFields } from '../fields/optionalFields';

const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'target', 'statusCode'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'slug',
      label: 'Source Path',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'The path that will be redirected (e.g., /old-page)',
      },
    },
    {
      name: 'target',
      label: 'Target Path',
      type: 'text',
      required: true,
      admin: {
        description: 'The destination path (e.g., /new-page)',
      },
    },
    {
      name: 'statusCode',
      label: 'Status Code',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        {
          label: '301 - Permanent Redirect',
          value: '301',
        },
        {
          label: '302 - Temporary Redirect',
          value: '302',
        },
      ],
    },
    ...optionalDisplayFields,
    ...timestampedFields,
  ],
};

export default Redirects;
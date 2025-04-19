import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const Team: CollectionConfig = {
  slug: 'team',
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
      name: 'role',
      label: 'Role',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'richText',
    },
    {
      name: 'headshotUrl',
      label: 'Headshot URL',
      type: 'text',
      admin: { description: 'Cloudinary image URL' },
    },
    {
      name: 'yearsOfExperience',
      label: 'Years of Experience',
      type: 'number',
    },
    {
      name: 'certifications',
      label: 'Certifications',
      type: 'array',
      fields: [
        {
          name: 'certification',
          label: 'Certification',
          type: 'text',
        },
      ],
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
    },
  ],
};

export default Team;

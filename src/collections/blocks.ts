import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { timestampedFields } from '../fields/timestampedFields';
import { optionalDisplayFields } from '../fields/optionalFields';

const Blocks: CollectionConfig = {
  slug: 'blocks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'title',
      label: 'Block Title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      label: 'Block Type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Hero',
          value: 'hero',
        },
        {
          label: 'Call to Action',
          value: 'cta',
        },
        {
          label: 'Content Section',
          value: 'content',
        },
        {
          label: 'Feature Grid',
          value: 'featureGrid',
        },
        {
          label: 'Testimonial Section',
          value: 'testimonials',
        },
      ],
    },
    {
      name: 'content',
      label: 'Block Content',
      type: 'group',
      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
          admin: {
            condition: (data) => ['hero', 'cta', 'content', 'featureGrid'].includes(data?.type),
          },
        },
        {
          name: 'subheading',
          label: 'Subheading',
          type: 'textarea',
          admin: {
            condition: (data) => ['hero', 'cta', 'content'].includes(data?.type),
          },
        },
        {
          name: 'richText',
          label: 'Rich Text Content',
          type: 'richText',
          admin: {
            condition: (data) => ['content', 'cta'].includes(data?.type),
          },
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data) => ['hero', 'content', 'featureGrid'].includes(data?.type),
          },
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'select',
          options: [
            {
              label: 'White',
              value: 'white',
            },
            {
              label: 'Light Gray',
              value: 'lightGray',
            },
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
          ],
          admin: {
            condition: (data) => data?.type,
          },
        },
        {
          name: 'ctaButton',
          label: 'Call to Action Button',
          type: 'group',
          admin: {
            condition: (data) => ['hero', 'cta'].includes(data?.type),
          },
          fields: [
            {
              name: 'label',
              label: 'Button Label',
              type: 'text',
            },
            {
              name: 'link',
              label: 'Button Link',
              type: 'text',
            },
            {
              name: 'style',
              label: 'Button Style',
              type: 'select',
              options: [
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Secondary',
                  value: 'secondary',
                },
                {
                  label: 'Text Only',
                  value: 'text',
                },
              ],
            },
          ],
        },
        {
          name: 'features',
          label: 'Features',
          type: 'array',
          admin: {
            condition: (data) => data?.type === 'featureGrid',
          },
          fields: [
            {
              name: 'title',
              label: 'Feature Title',
              type: 'text',
            },
            {
              name: 'description',
              label: 'Feature Description',
              type: 'textarea',
            },
            {
              name: 'icon',
              label: 'Feature Icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'testimonials',
          label: 'Testimonials',
          type: 'relationship',
          relationTo: 'testimonials',
          hasMany: true,
          admin: {
            condition: (data) => data?.type === 'testimonials',
          },
        },
      ],
    },
    {
      name: 'isGlobal',
      label: 'Is Global Block',
      type: 'checkbox',
      defaultValue: false,
    },
    ...optionalDisplayFields,
    ...timestampedFields,
  ],
};

export default Blocks;
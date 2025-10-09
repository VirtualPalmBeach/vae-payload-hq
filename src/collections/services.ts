import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { timestampedFields } from '../fields/timestampedFields';
import { optionalDisplayFields } from '../fields/optionalFields';
import { CallToActionBandBlock } from '../blocks/CallToActionBandBlock';
import { FeatureShowcaseBlock } from '../blocks/FeatureShowcaseBlock';
import { ImageTextSplitBlock } from '../blocks/ImageTextSplitBlock';
import { ProofPointsBlock } from '../blocks/ProofPointsBlock';
import { RatingBandBlock } from '../blocks/RatingBandBlock';
import { TestimonialsGatewayBlock } from '../blocks/TestimonialsGatewayBlock';
import { VideoTestimonialBlock } from '../blocks/VideoTestimonialBlock';

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'summary', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'title',
      label: 'Service Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Service Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      label: 'Summary',
      type: 'textarea',
      admin: {
        description: 'Brief description of the service (displayed in lists and previews)',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Service Content',
      type: 'richText',
    },
    {
      name: 'features',
      label: 'Key Features',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Feature Title',
          type: 'text',
          required: true,
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
      name: 'pricing',
      label: 'Pricing Information',
      type: 'group',
      fields: [
        {
          name: 'priceType',
          label: 'Price Type',
          type: 'select',
          options: [
            {
              label: 'Fixed Price',
              value: 'fixed',
            },
            {
              label: 'Starting From',
              value: 'starting',
            },
            {
              label: 'Contact for Pricing',
              value: 'contact',
            },
          ],
          defaultValue: 'contact',
        },
        {
          name: 'price',
          label: 'Price',
          type: 'text',
          admin: {
            condition: (data) => ['fixed', 'starting'].includes(data?.priceType),
          },
        },
        {
          name: 'pricePeriod',
          label: 'Price Period',
          type: 'select',
          options: [
            {
              label: 'One-time',
              value: 'onetime',
            },
            {
              label: 'Per Hour',
              value: 'hour',
            },
            {
              label: 'Per Day',
              value: 'day',
            },
            {
              label: 'Per Month',
              value: 'month',
            },
            {
              label: 'Per Year',
              value: 'year',
            },
          ],
          admin: {
            condition: (data) => ['fixed', 'starting'].includes(data?.priceType),
          },
        },
      ],
    },
    {
      name: 'relatedServices',
      label: 'Related Services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      blocks: [
        CallToActionBandBlock,
        FeatureShowcaseBlock,
        ImageTextSplitBlock,
        ProofPointsBlock,
        RatingBandBlock,
        TestimonialsGatewayBlock,
        VideoTestimonialBlock,
      ],
    },
    {
      name: 'seo',
      label: 'SEO Settings',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'SEO Title',
          type: 'text',
          admin: {
            description: 'If left blank, the service title will be used',
          },
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Recommended length: 120-155 characters',
          },
        },
        {
          name: 'image',
          label: 'Social Share Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    ...optionalDisplayFields,
    ...timestampedFields,
  ],
};

export default Services;
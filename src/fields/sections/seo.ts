import { Field } from 'payload/types';
import { validateUrl } from '../shared/validate';
import { imageDimensionRequirements } from '../shared/imageDimensions';

const analyticsFields = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO Settings',
    fields: [
      {
        name: 'defaultMetaTitle',
        label: 'Default Meta Title',
        type: 'text',
        admin: {
          description: 'Used when a page does not define its own meta title.',
        },
      },
      {
        name: 'defaultMetaDescription',
        label: 'Default Meta Description',
        type: 'textarea',
        admin: {
          description: 'Recommended: 150–160 characters.',
        },
      },
      {
        name: 'ogTitle',
        label: 'Open Graph Title',
        type: 'text',
      },
      {
        name: 'ogDescription',
        label: 'Open Graph Description',
        type: 'textarea',
      },
      {
        name: 'ogImageUrl',
        label: 'Open Graph Image',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: `Recommended: ${imageDimensionRequirements.social.width}x${imageDimensionRequirements.social.height}px (${imageDimensionRequirements.social.aspectRatio})`,
        },
      },
      {
        name: 'robotsIndexingEnabled',
        label: 'Allow Indexing',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'titleTemplate',
        label: 'Title Template',
        type: 'text',
        defaultValue: '%s | Site Name',
        admin: {
          description: '`%s` will be replaced by the page title.',
        },
      },
      {
        name: 'canonicalUrl',
        label: 'Canonical URL',
        type: 'text',
        validate: (value) =>
          validateUrl(value, {
            https: false, // relaxed for dev environments
          }),
      },
      {
        name: 'structuredDataEnabled',
        label: 'Enable Structured Data',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'structuredDataType',
        label: 'Structured Data Type',
        type: 'select',
        options: [
          'Organization',
          'LocalBusiness',
          'Product',
          'WebSite',
          'Person',
          'Event',
          'Article',
          'Course',
        ],
        admin: {
          condition: (_, siblingData) => siblingData?.structuredDataEnabled,
        },
      },
      {
        name: 'twitterCardType',
        label: 'Twitter Card Type',
        type: 'select',
        defaultValue: 'summary_large_image',
        options: [
          { label: 'Summary', value: 'summary' },
          { label: 'Summary Large Image', value: 'summary_large_image' },
          { label: 'App', value: 'app' },
          { label: 'Player', value: 'player' },
        ],
      },
      {
        name: 'twitterUsername',
        label: 'Twitter Username',
        type: 'text',
        admin: {
          description: 'Include the @ symbol.',
        },
      },
      {
        name: 'facebookAppId',
        label: 'Facebook App ID',
        type: 'text',
      },
      {
        name: 'aggregateRating',
        label: 'Aggregate Rating',
        type: 'group',
        admin: {
          condition: (_, siblingData) => siblingData?.structuredDataEnabled,
        },
        fields: [
          { name: 'ratingValue', label: 'Rating', type: 'number', min: 0, max: 5, admin: { step: 0.1 } },
          { name: 'reviewCount', label: 'Review Count', type: 'number', min: 0 },
          { name: 'bestRating', label: 'Best Rating', type: 'number', defaultValue: 5 },
          { name: 'worstRating', label: 'Worst Rating', type: 'number', defaultValue: 1 },
        ],
      },
    ],
  },
];

export default seoFields;

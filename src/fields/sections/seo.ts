import { validateUrl } from '../shared/validate'
import { imageDimensionRequirements } from '../shared/imageDimensions'

const seoTab = {
  label: 'SEO',
  name: 'seo',
  fields: [
    {
      name: 'defaultMetaTitle',
      label: 'Default Meta Title',
      type: 'text',
    },
    {
      name: 'defaultMetaDescription',
      label: 'Default Meta Description',
      type: 'textarea',
    },
    {
      name: 'ogImageUrl',
      label: 'Open Graph Image URL',
      type: 'text',
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
      name: 'canonicalUrl',
      label: 'Canonical URL',
      type: 'text',
      validate: (value: string) => validateUrl(value, { https: false }),
    },
    {
      name: 'titleTemplate',
      label: 'Title Template',
      type: 'text',
      defaultValue: '%s | Site Name',
    },
    {
      name: 'twitterUsername',
      label: 'Twitter Username',
      type: 'text',
    },
    {
      name: 'facebookAppId',
      label: 'Facebook App ID',
      type: 'text',
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
    },
  ],
}

export default seoTab

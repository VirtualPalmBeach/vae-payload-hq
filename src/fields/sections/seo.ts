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
      name: 'titleTemplate',
      label: 'Title Template',
      type: 'text',
      defaultValue: '%s | Site Name',
    },
    {
      name: 'canonicalUrl',
      label: 'Canonical URL',
      type: 'text',
    },
  ],
}

export default seoTab

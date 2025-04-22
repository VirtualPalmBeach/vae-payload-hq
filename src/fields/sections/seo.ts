import { validateUrl } from '../shared/validate'
import { imageDimensionRequirements } from '../shared/imageDimensions'

const seoFields = [
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
    validate: (value) =>
      validateUrl(value, {
        https: false,
      }),
  },
]

export default {
  label: 'SEO',
  name: 'seo',
  fields: seoFields,
}

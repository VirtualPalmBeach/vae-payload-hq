import { validateUrl } from '../shared/validate'
import { imageDimensionRequirements } from '../shared/imageDimensions'

const brandingFields = [
  {
    name: 'logoUrl',
    label: 'Logo URL',
    type: 'text',
    admin: {
      description: `Recommended: ${imageDimensionRequirements.logo.width}x${imageDimensionRequirements.logo.height}px (${imageDimensionRequirements.logo.aspectRatio})`,
    },
  },
  {
    name: 'logoAltText',
    label: 'Logo Alt Text',
    type: 'text',
  },
  {
    name: 'logoWidth',
    label: 'Logo Width (px)',
    type: 'number',
  },
  {
    name: 'logoHeight',
    label: 'Logo Height (px)',
    type: 'number',
  },
  {
    name: 'logoAltUrl',
    label: 'Alternative Logo URL',
    type: 'text',
  },
  {
    name: 'faviconUrl',
    label: 'Favicon URL',
    type: 'text',
  },
  {
    name: 'appleTouchIcon',
    label: 'Apple Touch Icon URL',
    type: 'text',
  },
  {
    name: 'defaultBannerImageUrl',
    label: 'Default Banner Image URL',
    type: 'text',
    admin: {
      description: `Recommended: ${imageDimensionRequirements.banner.width}x${imageDimensionRequirements.banner.height}px (${imageDimensionRequirements.banner.aspectRatio})`,
    },
  },
  {
    name: 'mobileBannerImageUrl',
    label: 'Mobile Banner Image URL',
    type: 'text',
  },
  {
    name: 'tabletBannerImageUrl',
    label: 'Tablet Banner Image URL',
    type: 'text',
  },
  {
    name: 'backgroundPatternUrl',
    label: 'Background Pattern URL',
    type: 'text',
  },
  {
    name: 'socialShareImageUrl',
    label: 'Social Share Image URL',
    type: 'text',
    admin: {
      description: `Recommended: ${imageDimensionRequirements.social.width}x${imageDimensionRequirements.social.height}px (${imageDimensionRequirements.social.aspectRatio})`,
    },
  },
  {
    name: 'heroImageUrl',
    label: 'Hero Image URL',
    type: 'text',
  },
  {
    name: 'brandVideoUrl',
    label: 'Brand Video URL',
    type: 'text',
  },
  {
    name: 'mediaTheme',
    label: 'Media Theme',
    type: 'text',
  },
  {
    name: 'fontStyle',
    label: 'Font Style',
    type: 'select',
    defaultValue: 'sans',
    options: [
      { label: 'Serif', value: 'serif' },
      { label: 'Sans', value: 'sans' },
      { label: 'Display', value: 'display' },
      { label: 'Monospace', value: 'monospace' },
      { label: 'Handwriting', value: 'handwriting' },
    ],
  },
  {
    name: 'customFonts',
    label: 'Custom Fonts',
    type: 'array',
    fields: [
      { name: 'fontName', label: 'Font Name', type: 'text', required: true },
      {
        name: 'fontUrl',
        label: 'Font URL',
        type: 'text',
        required: true,
        validate: validateUrl,
      },
      {
        name: 'fontWeight',
        label: 'Font Weight',
        type: 'select',
        options: [
          { label: 'Regular (400)', value: '400' },
          { label: 'Light (300)', value: '300' },
          { label: 'Medium (500)', value: '500' },
          { label: 'Bold (700)', value: '700' },
          { label: 'Extra Bold (800)', value: '800' },
        ],
      },
      {
        name: 'fontStyle',
        label: 'Font Style',
        type: 'select',
        options: [
          { label: 'Normal', value: 'normal' },
          { label: 'Italic', value: 'italic' },
        ],
      },
      {
        name: 'usage',
        label: 'Usage',
        type: 'select',
        options: [
          { label: 'Headings', value: 'headings' },
          { label: 'Body', value: 'body' },
          { label: 'UI Elements', value: 'ui' },
          { label: 'All', value: 'all' },
        ],
      },
    ],
  },
]

export default {
  label: 'Branding',
  name: 'branding',
  fields: brandingFields,
}

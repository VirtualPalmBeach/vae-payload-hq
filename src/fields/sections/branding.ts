import { validateUrl } from '../shared/validate';
import { imageDimensionRequirements } from '../shared/imageDimensions';

const brandingFields = [
  {
    name: 'mediaBranding',
    type: 'group',
    label: 'Media & Branding',
    fields: [
      {
        name: 'logoInfo',
        type: 'group',
        label: 'Logo Information',
        fields: [
          {
            name: 'logoUrl',
            label: 'Logo',
            type: 'upload',
            relationTo: 'media',
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
        ],
      },
      {
        name: 'logoAltUrl',
        label: 'Alternative Logo',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'favicon',
        type: 'group',
        label: 'Favicon',
        fields: [
          {
            name: 'faviconUrl',
            label: 'Favicon',
            type: 'upload',
            relationTo: 'media',
          },
          {
            name: 'appleTouchIcon',
            label: 'Apple Touch Icon',
            type: 'upload',
            relationTo: 'media',
          },
        ],
      },
      {
        name: 'responsiveImages',
        type: 'group',
        label: 'Responsive Images',
        fields: [
          {
            name: 'defaultBannerImageUrl',
            label: 'Default Banner Image',
            type: 'upload',
            relationTo: 'media',
            admin: {
              description: `Recommended: ${imageDimensionRequirements.banner.width}x${imageDimensionRequirements.banner.height}px (${imageDimensionRequirements.banner.aspectRatio})`,
            },
          },
          {
            name: 'mobileBannerImageUrl',
            label: 'Mobile Banner Image',
            type: 'upload',
            relationTo: 'media',
          },
          {
            name: 'tabletBannerImageUrl',
            label: 'Tablet Banner Image',
            type: 'upload',
            relationTo: 'media',
          },
        ],
      },
      {
        name: 'backgroundPatternUrl',
        label: 'Background Pattern',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'socialShareImageUrl',
        label: 'Social Share Image',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: `Recommended: ${imageDimensionRequirements.social.width}x${imageDimensionRequirements.social.height}px (${imageDimensionRequirements.social.aspectRatio})`,
        },
      },
      {
        name: 'heroImageUrl',
        label: 'Hero Image',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'brandVideoUrl',
        label: 'Brand Video',
        type: 'upload',
        relationTo: 'media',
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
          { name: 'fontUrl', label: 'Font URL', type: 'text', required: true, validate: validateUrl },
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
    ],
  },
];

export default {
  label: 'Branding',
  fields: brandingFields,
};
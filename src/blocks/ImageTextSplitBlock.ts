import { Block } from 'payload'

export const ImageTextSplitBlock: Block = {
  slug: 'imageTextSplit',
  labels: {
    singular: 'Image + Text Split',
    plural: 'Image + Text Splits',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Section headline',
      },
    },
    {
      name: 'body',
      label: 'Body Content',
      type: 'richText',
      required: false,
      admin: {
        description: 'Rich text content using Lexical editor',
      },
    },
    {
      name: 'assetPublicId',
      type: 'text',
      label: 'Asset Public ID',
      required: false,
      admin: {
        description: 'Cloudinary public_id (e.g., selah-pro/stock/luxury-pool-hero)',
      },
    },
    {
      name: 'isAnimated',
      type: 'checkbox',
      label: 'Animated Asset',
      defaultValue: false,
      admin: {
        description: 'Check if this is an animated GIF or video. Only needed if file extension doesn\'t indicate animation.',
      },
    },
    {
      name: 'legacyImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'DEPRECATED: Use assetPublicId field instead',
        condition: (data) => !data.assetPublicId,
      },
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      required: true,
      defaultValue: 'imageLeft',
      options: [
        { label: 'Image Left', value: 'imageLeft' },
        { label: 'Image Right', value: 'imageRight' },
      ],
      admin: {
        description: 'Position of image relative to text content',
      },
    },
    {
      name: 'ctaText',
      label: 'CTA Button Text',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional call-to-action button label',
        placeholder: 'Learn More',
      },
    },
    {
      name: 'ctaLink',
      label: 'CTA Button Link',
      type: 'text',
      required: false,
      admin: {
        description: 'URL or path for the CTA button',
        placeholder: '/contact',
      },
    },
  ],
}

export default ImageTextSplitBlock

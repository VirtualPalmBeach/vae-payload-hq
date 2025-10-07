import { Block } from 'payload'

export const FeatureShowcaseBlock: Block = {
  slug: 'featureShowcase',
  labels: {
    singular: 'Feature Showcase',
    plural: 'Feature Showcases',
  },
  fields: [
    // Section-level fields
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: false,
    },
    {
      name: 'introText',
      type: 'richText',
      label: 'Introduction Text',
      required: false,
    },
    // Features array (min 3, max 6)
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 3,
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          required: true,
        },
        {
          name: 'body',
          type: 'richText',
          label: 'Feature Description',
          required: true,
        },
        {
          name: 'mediaType',
          type: 'select',
          label: 'Media Type',
          required: false,
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Icon', value: 'icon' },
            { label: 'Image', value: 'image' },
          ],
        },
        {
          name: 'iconPublicId',
          type: 'text',
          label: 'Icon Public ID',
          required: false,
          admin: {
            description: 'Cloudinary public_id path for PNG icon (e.g., feature-icons/checkmark.png)',
            placeholder: 'feature-icons/checkmark.png',
            condition: (data: any, siblingData: any) => siblingData?.mediaType === 'icon',
          },
        },
        {
          name: 'imagePublicId',
          type: 'text',
          label: 'Image Public ID',
          required: false,
          admin: {
            description: 'Cloudinary public_id (e.g., selah-pro/features/feature-1)',
            condition: (data: any, siblingData: any) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'isAnimated',
          type: 'checkbox',
          label: 'Animated Asset',
          defaultValue: false,
          admin: {
            description: 'Check if this is an animated GIF or video. Only needed if file extension doesn\'t indicate animation.',
            condition: (data: any, siblingData: any) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'CTA Text',
          required: false,
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'CTA Link',
          required: false,
          admin: {
            condition: (data: any, siblingData: any) => Boolean(siblingData?.ctaText),
          },
        },
      ],
    },
  ],
}

export default FeatureShowcaseBlock

import { Block } from 'payload'

export const CallToActionBandBlock: Block = {
  slug: 'callToActionBand',
  labels: {
    singular: 'Call to Action Band',
    plural: 'Call to Action Bands',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      maxLength: 80,
      admin: {
        description: 'Action message - direct and outcome-focused (max 80 characters)',
        placeholder: 'Ready to Transform Your Space?',
      },
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'text',
      required: false,
      maxLength: 160,
      admin: {
        description: 'Optional supporting line (max 160 characters)',
        placeholder: 'Schedule a free consultation to discuss your project',
      },
    },
    {
      name: 'primaryCta',
      label: 'Primary Action',
      type: 'group',
      admin: {
        description: 'Main call-to-action button',
      },
      fields: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Get Your Free Quote',
          },
        },
        {
          name: 'link',
          label: 'Button Link',
          type: 'text',
          required: true,
          admin: {
            placeholder: '/contact',
          },
        },
      ],
    },
    {
      name: 'secondaryCta',
      label: 'Secondary Action (Optional)',
      type: 'group',
      admin: {
        description: 'Optional lighter-weight alternative action',
      },
      fields: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
          required: false,
          admin: {
            placeholder: 'View Our Work',
          },
        },
        {
          name: 'link',
          label: 'Button Link',
          type: 'text',
          required: false,
          admin: {
            placeholder: '/portfolio',
          },
        },
      ],
    },
    {
      name: 'backgroundType',
      label: 'Background Type',
      type: 'select',
      required: true,
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Image', value: 'image' },
      ],
      admin: {
        description: 'Background style for the band',
      },
    },
    {
      name: 'customBackgroundColor',
      label: 'Custom Background Color (Optional)',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional hex color override (e.g., #1a2b3c). Overrides light/dark preset.',
        placeholder: '#1a2b3c',
        condition: (data: any, siblingData: any) =>
          siblingData?.backgroundType === 'light' || siblingData?.backgroundType === 'dark',
      },
    },
    {
      name: 'backgroundImagePublicId',
      label: 'Background Image Public ID',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary public_id for background image',
        placeholder: 'landing-pages/cta-background.jpg',
        condition: (data: any, siblingData: any) => siblingData?.backgroundType === 'image',
      },
    },
  ],
}

export default CallToActionBandBlock

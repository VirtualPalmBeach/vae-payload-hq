import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      admin: {
        description: 'Main hero headline - displays prominently over background',
      },
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'textarea',
      admin: {
        description: 'Supporting text below the headline',
      },
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero background image (21:9 aspect recommended)',
      },
    },
    {
      name: 'videoUrl',
      label: 'Video Background URL',
      type: 'text',
      admin: {
        description: 'Cloudinary video player embed URL (overrides background image if provided)',
        placeholder: 'https://player.cloudinary.com/embed/...',
      },
    },
    {
      name: 'cta',
      label: 'Inline Call to Action',
      type: 'group',
      admin: {
        description: 'Optional CTA button displayed within the hero',
      },
      fields: [
        {
          name: 'ctaText',
          label: 'CTA Text',
          type: 'text',
          admin: {
            placeholder: 'Get Started',
          },
        },
        {
          name: 'ctaLink',
          label: 'CTA Link',
          type: 'text',
          admin: {
            placeholder: '/contact',
          },
        },
        {
          name: 'ctaStyle',
          label: 'CTA Style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
  ],
}

export default HeroBlock

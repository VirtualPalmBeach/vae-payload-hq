import { Block } from 'payload'

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      admin: {
        description: 'Main CTA headline',
      },
    },
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
      admin: {
        description: 'Supporting description text',
      },
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      admin: {
        description: 'Primary button label',
        placeholder: 'Get Started',
      },
    },
    {
      name: 'buttonLink',
      label: 'Button Link',
      type: 'text',
      admin: {
        description: 'URL or path for primary button (e.g., /contact or https://example.com)',
        placeholder: '/contact',
      },
    },
    {
      name: 'buttonStyle',
      label: 'Button Style',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
      ],
      defaultValue: 'primary',
      admin: {
        description: 'Visual style variant for the button',
      },
    },
    {
      name: 'secondaryButton',
      label: 'Secondary Button (Optional)',
      type: 'group',
      admin: {
        description: 'Add an optional second CTA button',
      },
      fields: [
        {
          name: 'secondaryButtonText',
          label: 'Secondary Button Text',
          type: 'text',
          admin: {
            placeholder: 'Learn More',
          },
        },
        {
          name: 'secondaryButtonLink',
          label: 'Secondary Button Link',
          type: 'text',
          admin: {
            placeholder: '/about',
          },
        },
        {
          name: 'secondaryButtonStyle',
          label: 'Secondary Button Style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'secondary',
        },
      ],
    },
  ],
}

export default CallToActionBlock

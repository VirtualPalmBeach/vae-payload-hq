import { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    // Section-level content
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: true,
      maxLength: 120,
      admin: {
        description: 'Section title shown above the FAQs.',
      },
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
      required: false,
      maxLength: 240,
      admin: {
        description: 'Optional intro sentence below the headline.',
      },
    },

    // FAQ Items array
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      maxRows: 12,
      required: true,
      admin: {
        description: 'FAQ question and answer pairs (maximum 12 items)',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
          maxLength: 120,
          admin: {
            description: 'The collapsible button label.',
          },
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
          required: true,
          admin: {
            description: 'Answer body; supports basic formatting and links.',
          },
        },
        {
          name: 'iconTag',
          type: 'text',
          label: 'Icon Tag',
          required: false,
          admin: {
            description: 'Optional Cloudinary public ID or tag for a per-item icon. Leave blank for no icon.',
          },
        },
      ],
    },

    // Layout configuration
    {
      name: 'layoutStyle',
      type: 'select',
      label: 'Layout Style',
      required: false,
      defaultValue: 'twoColumn',
      options: [
        { label: 'Single Column', value: 'singleColumn' },
        { label: 'Two Column', value: 'twoColumn' },
        { label: 'Centered', value: 'centered' },
      ],
      admin: {
        description: 'Controls FAQ grid layout.',
      },
    },

    // Background configuration
    {
      name: 'backgroundStyle',
      type: 'select',
      label: 'Background Style',
      required: false,
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Image', value: 'image' },
      ],
      admin: {
        description: 'Background treatment for the section.',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      required: false,
      admin: {
        description: 'Optional background color token or hex (e.g., #0B1220 or bg-stone-50).',
        condition: (data: any, siblingData: any) => {
          const style = siblingData?.backgroundStyle || data?.backgroundStyle
          return style === 'light' || style === 'dark'
        },
      },
    },
    {
      name: 'backgroundImageTag',
      type: 'text',
      label: 'Background Image ID',
      required: false,
      admin: {
        description: 'Cloudinary public ID for section background image.',
        condition: (data: any, siblingData: any) => {
          const style = siblingData?.backgroundStyle || data?.backgroundStyle
          return style === 'image'
        },
      },
    },

    // Motion & Animation
    {
      name: 'enableParallax',
      type: 'checkbox',
      label: 'Enable Parallax',
      defaultValue: false,
      admin: {
        description: 'Enable subtle parallax on background image.',
        condition: (data: any, siblingData: any) => {
          const style = siblingData?.backgroundStyle || data?.backgroundStyle
          return style === 'image'
        },
      },
    },
    {
      name: 'animation',
      type: 'checkbox',
      label: 'Animation',
      defaultValue: true,
      admin: {
        description: 'Entrance animation for the section and items.',
      },
    },

    // Admin metadata
    {
      name: 'id',
      type: 'text',
      label: 'Block ID',
      required: false,
      admin: {
        description: 'Optional anchor ID for in-page linking.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      required: false,
      admin: {
        description: 'Editor-only notes; never rendered.',
      },
    },
  ],
}

export default FAQBlock

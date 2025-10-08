import { Block } from 'payload'

export const ProofPointsBlock: Block = {
  slug: 'proofPoints',
  labels: {
    singular: 'Proof Points',
    plural: 'Proof Points',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Text',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional lead-in text (e.g., "Trusted by Families Across America")',
        placeholder: 'Trusted by Families Across America',
      },
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Strong statement about credibility (e.g., "Results That Speak for Themselves")',
        placeholder: 'Results That Speak for Themselves',
      },
    },
    {
      name: 'items',
      label: 'Proof Point Items',
      type: 'array',
      minRows: 3,
      maxRows: 6,
      required: true,
      admin: {
        description: 'Add 3-6 credibility metrics',
      },
      fields: [
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          required: true,
          admin: {
            description: 'Concise statistic (e.g., "250+", "4.9★", "15 Years")',
            placeholder: '250+',
          },
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          admin: {
            description: 'Short descriptor (e.g., "Projects Delivered")',
            placeholder: 'Projects Delivered',
          },
        },
        {
          name: 'footnote',
          label: 'Footnote',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional clarifier (e.g., "BBB A+ Since 2018")',
            placeholder: 'BBB A+ Since 2018',
          },
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional source or case study URL',
            placeholder: '/case-studies/residential',
          },
        },
      ],
    },
  ],
}

export default ProofPointsBlock

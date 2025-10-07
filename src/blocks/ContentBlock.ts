import { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  labels: {
    singular: 'Content Block',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      admin: {
        description: 'Rich text content using Lexical editor',
      },
    },
    {
      name: 'layout',
      label: 'Content Width',
      type: 'select',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Wide', value: 'wide' },
        { label: 'Narrow', value: 'narrow' },
        { label: 'Prose (Optimal Reading)', value: 'prose' },
      ],
      defaultValue: 'prose',
      admin: {
        description: 'Control the maximum width of the content container',
      },
    },
    {
      name: 'alignment',
      label: 'Text Alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
      admin: {
        description: 'Horizontal alignment of text content',
      },
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      options: [
        { label: 'None (Transparent)', value: 'none' },
        { label: 'Light Gray', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Accent Blue', value: 'accent' },
      ],
      defaultValue: 'none',
      admin: {
        description: 'Background color for the content section',
      },
    },
  ],
}

export default ContentBlock

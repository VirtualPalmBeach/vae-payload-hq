import { Block } from 'payload';

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'textarea',
    },
    {
      name: 'form',
      label: 'Select Form',
      type: 'relationship',
      relationTo: 'contactForm',
      required: true,
      admin: {
        description: 'Select the contact form configuration to display'
      }
    },
    {
      name: 'displayOptions',
      label: 'Display Options',
      type: 'group',
      fields: [
        {
          name: 'layoutMode',
          label: 'Layout Mode',
          type: 'select',
          defaultValue: 'inline',
          options: [
            { label: 'Inline', value: 'inline' },
            { label: 'Fullscreen on Mobile', value: 'fullscreen-on-mobile' }
          ],
          admin: {
            description: 'Choose how the form displays on different screen sizes'
          }
        },
        {
          name: 'customCtaText',
          label: 'Custom CTA Text',
          type: 'text',
          admin: {
            description: 'Override the default submit button text'
          }
        }
      ]
    }
  ],
};

export default ContactFormBlock;
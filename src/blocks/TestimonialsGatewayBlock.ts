import { Block } from 'payload'

export const TestimonialsGatewayBlock: Block = {
  slug: 'testimonialsGateway',
  labels: {
    singular: 'Testimonials Gateway',
    plural: 'Testimonials Gateways',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional heading or intro text for testimonials section',
        placeholder: 'What Our Clients Say',
      },
    },
    {
      name: 'displayMode',
      label: 'Display Mode',
      type: 'select',
      required: true,
      defaultValue: 'auto',
      options: [
        { label: 'Manual Selection', value: 'manual' },
        { label: 'Auto Query', value: 'auto' },
      ],
      admin: {
        description: 'Manual: hand-pick testimonials. Auto: query active testimonials by filters.',
      },
    },
    {
      name: 'testimonials',
      label: 'Selected Testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: false,
      admin: {
        description: 'Hand-pick specific testimonials for display',
        condition: (data: any, siblingData: any) => siblingData?.displayMode === 'manual',
      },
    },
    {
      name: 'limit',
      label: 'Testimonial Limit',
      type: 'number',
      required: false,
      defaultValue: 1,
      min: 1,
      max: 12,
      admin: {
        description: 'Maximum number of testimonials to display (default: 1)',
        condition: (data: any, siblingData: any) => siblingData?.displayMode === 'auto',
      },
    },
    {
      name: 'layoutVariant',
      label: 'Layout Variant',
      type: 'select',
      required: true,
      defaultValue: 'single',
      options: [
        { label: 'Carousel', value: 'carousel' },
        { label: 'Grid', value: 'grid' },
        { label: 'Single', value: 'single' },
      ],
      admin: {
        description: 'Display style for testimonials',
      },
    },
    {
      name: 'showRatings',
      label: 'Show Ratings',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Display star ratings when available',
      },
    },
    {
      name: 'rotationInterval',
      label: 'Rotation Interval (seconds)',
      type: 'number',
      required: false,
      defaultValue: 9,
      min: 3,
      max: 30,
      admin: {
        description: 'Auto-advance interval for carousel (default: 9 seconds)',
        condition: (data: any, siblingData: any) => siblingData?.layoutVariant === 'carousel',
      },
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
        description: 'Background style for testimonials section',
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
        placeholder: 'testimonials/background.jpg',
        condition: (data: any, siblingData: any) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'isAnimated',
      label: 'Enable Animation',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable fade-in animations on scroll reveal',
      },
    },
  ],
}

export default TestimonialsGatewayBlock

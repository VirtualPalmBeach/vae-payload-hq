import { Block } from 'payload'

export const VideoTestimonialBlock: Block = {
  slug: 'videoTestimonial',
  labels: {
    singular: 'Video Testimonial',
    plural: 'Video Testimonials',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional section heading',
        placeholder: 'Client Story',
      },
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional supporting text',
        placeholder: 'Hear directly from our clients',
      },
    },
    {
      name: 'videoPublicId',
      label: 'Video Public ID',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary public_id for the testimonial video (e.g., testimonials/client-story-001)',
        placeholder: 'testimonials/client-story-001',
      },
    },
    {
      name: 'posterPublicId',
      label: 'Poster Image Public ID',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional custom poster/thumbnail image public_id',
        placeholder: 'testimonials/poster-001',
      },
    },
    {
      name: 'quote',
      label: 'Quote',
      type: 'textarea',
      required: false,
      maxLength: 300,
      admin: {
        description: 'Optional pull quote or summary text (max 300 characters)',
        placeholder: 'The team exceeded our expectations...',
      },
    },
    {
      name: 'authorName',
      label: 'Author Name',
      type: 'text',
      required: false,
      admin: {
        description: 'Name of the person giving the testimonial',
        placeholder: 'Sarah Mitchell',
      },
    },
    {
      name: 'authorTitle',
      label: 'Author Title',
      type: 'text',
      required: false,
      admin: {
        description: 'Job title, role, or location (e.g., "Homeowner, Dallas TX")',
        placeholder: 'Homeowner, Dallas TX',
      },
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional project reference code for linking to portfolio',
        placeholder: 'ABC1234',
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
        description: 'Background style for the video section',
      },
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional custom background color (hex code)',
        placeholder: '#f5f5f5',
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
        placeholder: 'backgrounds/testimonial-bg.jpg',
        condition: (data: any, siblingData: any) => siblingData?.backgroundType === 'image',
      },
    },
  ],
}

export default VideoTestimonialBlock

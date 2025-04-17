export const Homepage = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'introText',
      label: 'Intro Text',
      type: 'textarea',
      required: false,
    },
    {
      name: 'ctaText',
      label: 'Call to Action Text',
      type: 'text',
      required: false,
    },
    {
      name: 'ctaLink',
      label: 'Call to Action Link',
      type: 'text',
      required: false,
    }
  ],
};

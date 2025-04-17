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
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
        },
        {
          name: 'url',
          label: 'Button Link',
          type: 'text',
        }
      ]
    }
  ],
};

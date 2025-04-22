const brandingTab: Tab = {
  label: 'Branding',
  name: 'branding',
  fields: [
    {
      name: 'logoUrl',
      label: 'Logo URL',
      type: 'text',
      validate: validateUrl,
      admin: {
        description: `Recommended: ${imageDimensionRequirements.logo.width}x${imageDimensionRequirements.logo.height}px (${imageDimensionRequirements.logo.aspectRatio})`,
      },
    },
    {
      name: 'faviconUrl',
      label: 'Favicon URL',
      type: 'text',
      validate: validateUrl,
    },
    {
      name: 'brandColor',
      label: 'Primary Brand Color',
      type: 'text',
    },
    {
      name: 'socialShareImageUrl',
      label: 'Social Share Image URL',
      type: 'text',
      validate: validateUrl,
      admin: {
        description: `Recommended: ${imageDimensionRequirements.social.width}x${imageDimensionRequirements.social.height}px (${imageDimensionRequirements.social.aspectRatio})`,
      },
    },
    {
      name: 'heroImageUrl',
      label: 'Hero Image URL',
      type: 'text',
      validate: validateUrl,
    },
    {
      name: 'fontStyle',
      label: 'Font Style',
      type: 'select',
      defaultValue: 'sans',
      options: [
        { label: 'Serif', value: 'serif' },
        { label: 'Sans', value: 'sans' },
        { label: 'Display', value: 'display' },
        { label: 'Monospace', value: 'monospace' },
        { label: 'Handwriting', value: 'handwriting' },
      ],
    },
    {
      name: 'customFonts',
      label: 'Custom Fonts',
      type: 'array',
      fields: [
        {
          name: 'fontName',
          label: 'Font Name',
          type: 'text',
          required: true,
        },
        {
          name: 'fontUrl',
          label: 'Font URL',
          type: 'text',
          required: true,
          validate: validateUrl,
        },
        {
          name: 'fontWeight',
          label: 'Font Weight',
          type: 'select',
          options: [
            { label: 'Regular (400)', value: '400' },
            { label: 'Light (300)', value: '300' },
            { label: 'Medium (500)', value: '500' },
            { label: 'Bold (700)', value: '700' },
            { label: 'Extra Bold (800)', value: '800' },
          ],
        },
        {
          name: 'fontStyle',
          label: 'Font Style',
          type: 'select',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Italic', value: 'italic' },
          ],
        },
        {
          name: 'usage',
          label: 'Usage',
          type: 'select',
          options: [
            { label: 'Headings', value: 'headings' },
            { label: 'Body', value: 'body' },
            { label: 'UI Elements', value: 'ui' },
            { label: 'All', value: 'all' },
          ],
        },
      ],
    },
  ],
};

export default brandingTab;

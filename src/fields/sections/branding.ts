import { Tab } from 'payload/types';

const brandingTab: Tab = {
  label: 'Branding',
  name: 'branding',
  fields: [
    {
      name: 'logoUrl',
      label: 'Logo URL',
      type: 'text',
    },
    {
      name: 'faviconUrl',
      label: 'Favicon URL',
      type: 'text',
    },
    {
      name: 'brandColor',
      label: 'Primary Brand Color',
      type: 'text',
    },
  ]
};

export default brandingTab;
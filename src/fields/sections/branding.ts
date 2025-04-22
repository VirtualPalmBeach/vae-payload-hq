const brandingFields = [
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

export default {
  label: 'Branding',
  name: 'branding',
  fields: brandingFields,
}

const navigationTab = {
  label: 'Navigation',
  name: 'navigation',
  fields: [
    {
      name: 'stickyEnabled',
      label: 'Sticky Navigation',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'primaryNav',
      label: 'Primary Navigation',
      type: 'array',
      fields: [
        { name: 'label', label: 'Label', type: 'text', required: true },
        { name: 'href', label: 'Href', type: 'text', required: true },
      ],
    },
    {
      name: 'footerNav',
      label: 'Footer Navigation',
      type: 'array',
      fields: [
        { name: 'label', label: 'Label', type: 'text', required: true },
        { name: 'href', label: 'Href', type: 'text', required: true },
      ],
    },
    {
      name: 'ctaLabel',
      label: 'CTA Button Label',
      type: 'text',
    },
    {
      name: 'ctaHref',
      label: 'CTA Button URL',
      type: 'text',
    },
    {
      name: 'mobileNavVariant',
      label: 'Mobile Navigation Style',
      type: 'select',
      defaultValue: 'drawer',
      options: [
        { label: 'Drawer', value: 'drawer' },
        { label: 'Dropdown', value: 'dropdown' },
        { label: 'Full', value: 'full' },
      ],
    },
  ],
}

export default navigationTab

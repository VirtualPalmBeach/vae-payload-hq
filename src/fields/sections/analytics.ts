const analyticsTab = {
  label: 'Analytics',
  name: 'analytics',
  fields: [
    {
      name: 'gtmContainerId',
      label: 'Google Tag Manager Container ID',
      type: 'text',
    },
    {
      name: 'gtagId',
      label: 'Google Analytics 4 Measurement ID',
      type: 'text',
    },
    {
      name: 'facebookPixelId',
      label: 'Facebook Pixel ID',
      type: 'text',
    },
    {
      name: 'headerScripts',
      label: 'Header Scripts',
      type: 'textarea',
    },
    {
      name: 'footerScripts',
      label: 'Footer Scripts',
      type: 'textarea',
    },
    {
      name: 'cookieConsentEnabled',
      label: 'Enable Cookie Consent Banner',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default analyticsTab

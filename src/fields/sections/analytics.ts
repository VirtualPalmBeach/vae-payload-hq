import { sanitizeScript } from '../shared/sanitize'

const analyticsTab = {
  label: 'Analytics & Scripts',
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
      label: 'Custom Header Scripts',
      type: 'textarea',
      admin: {
        description: 'Paste JS snippets only (no <script> tags). These will be sanitized.',
      },
    },
    {
      name: 'footerScripts',
      label: 'Custom Footer Scripts',
      type: 'textarea',
      admin: {
        description: 'Paste JS snippets only (no <script> tags). These will be sanitized.',
      },
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

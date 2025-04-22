import { Field } from 'payload/types';
import { sanitizeScript } from 'payload/dist/types';

const analyticsFields: Field[] = [
  {
    name: 'analytics',
    type: 'group',
    label: 'Analytics & Tracking',
    fields: [
      {
        name: 'googleAnalyticsId',
        label: 'Google Analytics ID',
        type: 'text',
        admin: {
          description: 'e.g. G-XXXXXXXX',
        },
      },
      {
        name: 'googleTagManagerId',
        label: 'Google Tag Manager ID',
        type: 'text',
        admin: {
          description: 'e.g. GTM-XXXXXXX',
        },
      },
      {
        name: 'facebookPixelId',
        label: 'Facebook Pixel ID',
        type: 'text',
      },
      {
        name: 'linkedinInsightTag',
        label: 'LinkedIn Insight Tag',
        type: 'text',
      },
      {
        name: 'hubspotTrackingId',
        label: 'HubSpot Tracking ID',
        type: 'text',
      },
      {
        name: 'headerScripts',
        label: 'Header Scripts (Sanitized)',
        type: 'code',
        admin: {
          language: 'html',
          description: 'Custom HTML/JS to inject into <head>. Will be sanitized.',
        },
      },
      {
        name: 'footerScripts',
        label: 'Footer Scripts (Sanitized)',
        type: 'code',
        admin: {
          language: 'html',
          description: 'Custom HTML/JS to inject before </body>. Will be sanitized.',
        },
      },
      {
        name: 'cookieConsentEnabled',
        label: 'Enable Cookie Consent',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'cookieConsentType',
        label: 'Cookie Consent Type',
        type: 'select',
        options: [
          { label: 'Opt-In', value: 'opt-in' },
          { label: 'Opt-Out', value: 'opt-out' },
          { label: 'Info Only', value: 'info' },
        ],
        defaultValue: 'opt-in',
        admin: {
          condition: (_, siblingData) => siblingData?.cookieConsentEnabled === true,
        },
      },
    ],
  },
];

export default analyticsFields;

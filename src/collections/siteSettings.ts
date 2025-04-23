import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
  admin: {
    group: 'Settings',
    useAsTitle: 'siteTitle',
    defaultColumns: ['siteTitle', 'siteKey', 'isDefaultSite'],
    description: 'Site-wide configuration including branding, SEO, contact, and integrations',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => (user as any)?.role === 'admin',
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
  versions: {
    drafts: true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'siteTitle',
      label: 'Site Title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'A short name for this site (used in admin UI)',
      },
    },
    {
      name: 'isDefaultSite',
      label: 'Default Site',
      type: 'checkbox',
      admin: {
        description: 'Designates this as the default fallback site',
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          name: 'branding',
          fields: [
            {
              name: 'logoUrl',
              label: 'Logo URL',
              type: 'text',
              admin: {
                description: 'Recommended dimensions: 250x80px (3.125:1)',
              },
            },
            // Add other branding fields as needed
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: [
            {
              name: 'metaTitle',
              label: 'Default Meta Title',
              type: 'text',
            },
            {
              name: 'metaDescription',
              label: 'Default Meta Description',
              type: 'textarea',
            },
            {
              name: 'ogImage',
              label: 'Default Social Image',
              type: 'text',
            },
            // Add other SEO fields as needed
          ],
        },
        {
          label: 'Contact',
          name: 'contact',
          fields: [
            {
              name: 'phoneNumber',
              label: 'Phone Number',
              type: 'text',
            },
            {
              name: 'emailAddress',
              label: 'Email Address',
              type: 'email',
              validate: validateEmail,
            },
            {
              name: 'contactFormUrl',
              label: 'Contact Form URL',
              type: 'text',
              validate: validateUrl,
            },
            {
              name: 'facebookUrl',
              label: 'Facebook URL',
              type: 'text',
              validate: validateUrl,
            },
            {
              name: 'instagramUrl',
              label: 'Instagram URL',
              type: 'text',
              validate: validateUrl,
            },
            {
              name: 'mapLink',
              label: 'Map Link',
              type: 'text',
              validate: validateUrl,
            },
            {
              name: 'contactCtaText',
              label: 'CTA Text',
              type: 'text',
            },
          ],
        },
        {
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
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  label: 'Href',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'footerNav',
              label: 'Footer Navigation',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  label: 'Href',
                  type: 'text',
                  required: true,
                },
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
                {
                  label: 'Drawer',
                  value: 'drawer',
                },
                {
                  label: 'Dropdown',
                  value: 'dropdown',
                },
                {
                  label: 'Full',
                  value: 'full',
                },
              ],
            },
          ],
        },
        {
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
              label: 'Custom Header Scripts',
              type: 'textarea',
              admin: {
                description: 'Paste JS snippets only (no <script> tags)',
              },
            },
            {
              name: 'footerScripts',
              label: 'Custom Footer Scripts',
              type: 'textarea',
              admin: {
                description: 'Paste JS snippets only (no <script> tags)',
              },
            },
            {
              name: 'cookieConsentEnabled',
              label: 'Enable Cookie Consent Banner',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Performance',
          name: 'performance',
          fields: [
            {
              name: 'lazyLoadMedia',
              label: 'Enable Lazy Loading for Media',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'imageCompressionEnabled',
              label: 'Enable Image Compression',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'cacheControl',
              label: 'Cache-Control Header',
              type: 'text',
            },
            {
              name: 'cdnBaseUrl',
              label: 'CDN Base URL',
              type: 'text',
            },
          ],
        },
        {
          label: 'Integrations',
          name: 'integrations',
          fields: [
            {
              name: 'integrationsPlaceholder',
              label: 'Integrations',
              type: 'text',
              admin: {
                description: 'Add your integration fields here',
              },
            },
            // Add integration fields as needed
          ],
        },
      ],
    },
  ],
};

export default SiteSettings;
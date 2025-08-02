import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
  admin: {
    useAsTitle: 'siteTitle',
    description: 'Site-wide configuration including branding, SEO, contact, and integrations',
    group: 'Content'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'siteTitle',
      label: 'Site Title',
      type: 'text',
      required: true,
      admin: {
        description: 'A short name for this site (used in admin UI)',
      },
    },
    {
      name: 'isDefaultSite',
      label: 'Default Site',
      type: 'checkbox',
      admin: {
        description: 'Designates this as the default fallback site',
      },
    },
    {
      name: 'siteUrl',
      label: 'Site URL',
      type: 'text',
      required: true,
      admin: {
        description: 'The full URL of this site (e.g., https://example.com)',
      },
    },
    {
      name: 'timezone',
      label: 'Timezone',
      type: 'select',
      required: true,
      defaultValue: 'America/Chicago',
      options: [
        { label: 'Eastern Time (America/New_York)', value: 'America/New_York' },
        { label: 'Central Time (America/Chicago)', value: 'America/Chicago' },
        { label: 'Mountain Time (America/Denver)', value: 'America/Denver' },
        { label: 'Pacific Time (America/Los_Angeles)', value: 'America/Los_Angeles' },
        { label: 'Arizona Time (America/Phoenix)', value: 'America/Phoenix' },
      ],
      admin: {
        description: 'Timezone for this site',
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
            {
              name: 'robotsTxt',
              label: 'Robots.txt Content',
              type: 'textarea',
              admin: {
                description: 'Content for the robots.txt file',
              },
            },
            {
              name: 'googleSiteVerification',
              label: 'Google Site Verification Code',
              type: 'text',
              admin: {
                description: 'Google verification meta tag content value',
              },
            },
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
            },
            {
              name: 'contactFormUrl',
              label: 'Contact Form URL',
              type: 'text',
            },
            {
              name: 'socialLinks',
              label: 'Social Media Links',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  label: 'Platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' }
                  ]
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true
                },
                {
                  name: 'icon',
                  label: 'Custom Icon Class',
                  type: 'text',
                  admin: {
                    description: 'Optional: CSS class for custom icon'
                  }
                }
              ]
            },
            {
              name: 'mapLink',
              label: 'Map Link',
              type: 'text',
            },
          ],
        },
        {
          label: 'Global CTAs',
          name: 'globalCtas',
          fields: [
            {
              name: 'headerCta',
              label: 'Header CTA',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  label: 'Button Text',
                  type: 'text'
                },
                {
                  name: 'url',
                  label: 'Button URL',
                  type: 'text'
                },
                {
                  name: 'style',
                  label: 'Button Style',
                  type: 'select',
                  defaultValue: 'primary',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Outline', value: 'outline' }
                  ]
                }
              ]
            },
            {
              name: 'footerCta',
              label: 'Footer CTA',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  label: 'CTA Heading',
                  type: 'text'
                },
                {
                  name: 'text',
                  label: 'Button Text',
                  type: 'text'
                },
                {
                  name: 'url',
                  label: 'Button URL',
                  type: 'text'
                }
              ]
            }
          ]
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
          ],
        },
      ],
    },
  ],
};

export default SiteSettings;
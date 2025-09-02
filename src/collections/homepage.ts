import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { isAdmin } from '../access/helpers'
import { timestampedFields } from '../fields/timestampedFields'
import { optionalDisplayFields } from '../fields/optionalFields'

const Homepage: CollectionConfig = {
  slug: 'homepage',
  labels: {
    singular: 'Home Page',
    plural: 'Home Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'conversionGoal', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Page Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'body',
      label: 'Body Content',
      type: 'blocks',
      minRows: 1,
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero',
            plural: 'Heroes',
          },
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'subheading',
              label: 'Subheading',
              type: 'textarea',
            },
            {
              name: 'backgroundImage',
              label: 'Background Image',
              type: 'relationship',
              relationTo: 'media',
            },
          ],
        },
        {
          slug: 'content',
          labels: {
            singular: 'Content Block',
            plural: 'Content Blocks',
          },
          fields: [
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
            },
          ],
        },
        {
          slug: 'callToAction',
          labels: {
            singular: 'Call to Action',
            plural: 'Calls to Action',
          },
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'text',
            },
            {
              name: 'text',
              label: 'Text',
              type: 'textarea',
            },
            {
              name: 'buttonText',
              label: 'Button Text',
              type: 'text',
            },
            {
              name: 'buttonLink',
              label: 'Button Link',
              type: 'text',
            },
            {
              name: 'buttonStyle',
              label: 'Button Style',
              type: 'select',
              options: [
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Secondary',
                  value: 'secondary',
                },
                {
                  label: 'Outline',
                  value: 'outline',
                },
              ],
              defaultValue: 'primary',
            },
          ],
        },
      ],
    },
    {
      name: 'callToAction',
      label: 'Primary Call To Action',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'CTA Text',
          type: 'text',
        },
        {
          name: 'link',
          label: 'CTA Link',
          type: 'text',
        },
        {
          name: 'style',
          label: 'CTA Style',
          type: 'select',
          options: [
            {
              label: 'Button',
              value: 'button',
            },
            {
              label: 'Text Link',
              value: 'text',
            },
            {
              label: 'Banner',
              value: 'banner',
            },
          ],
          defaultValue: 'button',
        },
      ],
    },
    {
      name: 'conversionGoal',
      label: 'Conversion Goal',
      type: 'select',
      options: [
        {
          label: 'Lead Generation',
          value: 'lead',
        },
        {
          label: 'Sales',
          value: 'sales',
        },
        {
          label: 'Newsletter Signup',
          value: 'newsletter',
        },
        {
          label: 'Event Registration',
          value: 'event',
        },
        {
          label: 'Download',
          value: 'download',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'abTestIdentifier',
      label: 'A/B Test Identifier',
      type: 'text',
      admin: {
        description: 'Used to identify this page in A/B testing',
        position: 'sidebar',
      },
    },
    {
      name: 'conversionTracking',
      label: 'Conversion Tracking',
      type: 'group',
      admin: {
        description: 'Settings for analytics and conversion tracking',
      },
      fields: [
        {
          name: 'goalID',
          label: 'Goal ID',
          type: 'text',
        },
        {
          name: 'eventCategory',
          label: 'Event Category',
          type: 'text',
        },
        {
          name: 'eventAction',
          label: 'Event Action',
          type: 'text',
        },
      ],
    },
    {
      name: 'targetAudience',
      label: 'Target Audience',
      type: 'select',
      options: [
        {
          label: 'New Visitors',
          value: 'new',
        },
        {
          label: 'Returning Visitors',
          value: 'returning',
        },
        {
          label: 'Email Subscribers',
          value: 'subscribers',
        },
        {
          label: 'Social Media Followers',
          value: 'social',
        },
        {
          label: 'All',
          value: 'all',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'campaignAssociation',
      label: 'Campaign',
      type: 'text',
      admin: {
        description: 'Associated marketing campaign identifier',
        position: 'sidebar',
      },
    },
    {
      name: 'structuredData',
      label: 'Structured Data',
      type: 'code',
      admin: {
        language: 'json',
        description: 'JSON-LD for enhanced SEO',
      },
    },
    {
      name: 'pageSettings',
      label: 'Page Settings',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'noIndex',
          label: 'No Index',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'hideNavigation',
          label: 'Hide Navigation',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'hideFooter',
          label: 'Hide Footer',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'seo',
      label: 'SEO Settings',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'SEO Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'SEO Description',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'Social Share Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'canonicalUrl',
          label: 'Canonical URL',
          type: 'text',
        },
      ],
    },
    ...optionalDisplayFields,
    ...timestampedFields,
  ],
}

export default Homepage

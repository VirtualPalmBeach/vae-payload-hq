import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'
import { isAdmin } from '../access/helpers'

const ContactPage: CollectionConfig = {
  slug: 'contactPage',
  admin: {
    useAsTitle: 'heroHeading',
    defaultColumns: ['heroHeading', 'siteKey', 'updatedAt'],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            {
              name: 'heroHeading',
              label: 'Hero Heading',
              type: 'text',
              required: true,
              maxLength: 200,
              admin: {
                description: 'Main heading for the contact page (e.g., "Let\'s Build Something Beautiful")',
              },
            },
            {
              name: 'heroSubheading',
              label: 'Hero Subheading',
              type: 'richText',
              admin: {
                description: 'Short paragraph or rich text block beneath the hero heading',
              },
            },
            {
              name: 'heroImage',
              label: 'Hero Image',
              type: 'text',
              required: true,
              validate: (value: string | null | undefined): string | true => {
                if (!value) return 'Hero image is required'
                return true
              },
              admin: {
                description: 'Cloudinary tags for the background hero image. Enter comma-separated tags for flexible search.',
                placeholder: 'e.g., selah-pro,contact,hero',
                condition: (data, siblingData, { user }) => {
                  return true
                },
              },
            },
            {
              name: 'contactDetails',
              label: 'Contact Details',
              type: 'group',
              fields: [
                {
                  name: 'phoneNumber',
                  label: 'Phone Number',
                  type: 'text',
                  maxLength: 50,
                  admin: {
                    description: 'Primary contact phone number',
                  },
                },
                {
                  name: 'emailAddress',
                  label: 'Email Address',
                  type: 'email',
                  admin: {
                    description: 'Primary contact email address',
                  },
                },
                {
                  name: 'address',
                  label: 'Address',
                  type: 'group',
                  fields: [
                    {
                      name: 'street',
                      label: 'Street Address',
                      type: 'text',
                      maxLength: 200,
                    },
                    {
                      name: 'city',
                      label: 'City',
                      type: 'text',
                      maxLength: 100,
                    },
                    {
                      name: 'state',
                      label: 'State',
                      type: 'text',
                      maxLength: 2,
                      admin: {
                        description: 'Two-letter state code (e.g., TX)',
                      },
                    },
                    {
                      name: 'zip',
                      label: 'ZIP Code',
                      type: 'text',
                      maxLength: 10,
                    },
                  ],
                },
                {
                  name: 'mapEmbedCode',
                  label: 'Map Embed Code',
                  type: 'textarea',
                  admin: {
                    description: 'Google Maps iframe embed code. Get this from Google Maps > Share > Embed a map. Paste the full iframe code here.',
                    placeholder: '<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
                  },
                },
              ],
            },
            {
              name: 'trustIndicators',
              label: 'Trust Indicators',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
                  required: true,
                  maxLength: 100,
                },
                {
                  name: 'description',
                  label: 'Description',
                  type: 'textarea',
                  required: true,
                  maxLength: 300,
                },
                {
                  name: 'optionalIconOrImage',
                  label: 'Optional Icon or Image',
                  type: 'text',
                  admin: {
                    description: 'Cloudinary tags for icon or image. Recommended dimensions: 64x64px for icons.',
                    placeholder: 'e.g., selah-pro,icon,trust',
                  },
                },
              ],
              admin: {
                description: 'Array of grouped content blocks for trust indicators',
              },
            },
            {
              name: 'formHeading',
              label: 'Form Heading',
              type: 'text',
              maxLength: 200,
              admin: {
                description: 'Text prompt that appears just above the embedded form',
              },
            },
            {
              name: 'contactFormConfiguration',
              label: 'Contact Form Configuration',
              type: 'group',
              fields: [
                {
                  name: 'formType',
                  label: 'Form Type',
                  type: 'select',
                  defaultValue: 'legacy',
                  required: true,
                  options: [
                    { label: 'Legacy Embed', value: 'legacy' },
                    { label: 'Multi-Step Form', value: 'multiStep' },
                  ],
                  admin: {
                    description: 'Choose between legacy embed forms or new multi-step forms',
                  },
                },
                {
                  name: 'legacyFormConfig',
                  label: 'Legacy Form Configuration',
                  type: 'group',
                  admin: {
                    condition: (data) => data?.contactFormConfiguration?.formType === 'legacy',
                  },
                  fields: [
                    {
                      name: 'formEmbedCode',
                      label: 'Form Embed Code',
                      type: 'code',
                      admin: {
                        language: 'html',
                        description: 'Legacy HubSpot embed. Deprecated - consider using Multi-Step Forms instead.',
                      },
                    },
                    {
                      name: 'useFormEmbed',
                      label: 'Use Form Embed',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        description: 'Legacy form embed toggle. Deprecated - this field will be removed in future versions.',
                      },
                    },
                    {
                      name: 'formFallbackEnabled',
                      label: 'Enable Form Fallback',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: {
                        description: 'Legacy fallback. Deprecated - multi-step forms handle errors automatically.',
                      },
                    },
                    {
                      name: 'formFallbackMessage',
                      label: 'Form Fallback Message',
                      type: 'richText',
                      admin: {
                        description: 'Legacy fallback message. Deprecated - use Multi-Step Forms for better error handling.',
                        condition: (data) => data?.contactFormConfiguration?.legacyFormConfig?.formFallbackEnabled === true,
                      },
                    },
                  ],
                },
                {
                  name: 'selectedForm',
                  label: 'Select Multi-Step Form',
                  type: 'relationship',
                  relationTo: 'contactForm',
                  required: true,
                  admin: {
                    condition: (data) => data?.contactFormConfiguration?.formType === 'multiStep',
                    description: 'Choose which multi-step form to display on this page',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO / Structured Data',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta Title',
              type: 'text',
              maxLength: 60,
              admin: {
                description: 'SEO title (defaults to hero heading if empty)',
              },
            },
            {
              name: 'metaDescription',
              label: 'Meta Description',
              type: 'textarea',
              maxLength: 160,
              admin: {
                description: 'SEO description for search results',
              },
            },
            {
              name: 'structuredDataJSON',
              label: 'Structured Data JSON',
              type: 'json',
              validate: (value: string | null | undefined): string | true => {
                if (!value) return true // Optional field
                try {
                  JSON.parse(value)
                  return true
                } catch (error) {
                  return 'Invalid JSON format. Please check your syntax.'
                }
              },
              admin: {
                description: 'Optional manual override for schema.org JSON-LD structured data. Must be valid JSON.',
              },
            },
          ],
        },
        {
          label: 'Display Flags',
          fields: [
            {
              name: 'showMap',
              label: 'Show Map',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Toggle to display the map on the contact page',
              },
            },
            {
              name: 'highlightPhoneNumber',
              label: 'Highlight Phone Number',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Allows frontend to emphasize phone on mobile',
              },
            },
          ],
        },
      ],
    },
    ...timestampedFields,
  ],
  indexes: [
    {
      fields: ['siteKey'],
    },
  ],
}

export default ContactPage
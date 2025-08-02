import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

const ContactForm: CollectionConfig = {
  slug: 'contactForm',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'read', 'createdAt'],
  },
  fields: [
    // Preserved fields
    commonSiteKeyField,

    // Form Metadata
    {
      name: 'title',
      label: 'Form Title (Internal)',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for this form configuration',
      },
    },
    {
      name: 'description',
      label: 'Form Description',
      type: 'textarea',
      admin: {
        description: 'Optional internal description of form purpose',
      },
    },

    // Multi-Step Form Structure
    {
      name: 'steps',
      label: 'Form Steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'stepTitle',
          label: 'Step Title',
          type: 'text',
          required: true,
        },
        {
          name: 'stepDescription',
          label: 'Step Description',
          type: 'textarea',
        },
        {
          name: 'fields',
          label: 'Step Fields',
          type: 'array',
          required: true,
          minRows: 1,
          fields: [
            {
              name: 'label',
              label: 'Field Label',
              type: 'text',
              required: true,
            },
            {
              name: 'fieldKey',
              label: 'Field Key',
              type: 'text',
              required: true,
              admin: {
                description: 'Unique identifier for this field (no spaces)',
              },
            },
            {
              name: 'fieldType',
              label: 'Field Type',
              type: 'select',
              required: true,
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Select', value: 'select' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Radio', value: 'radio' },
                { label: 'Postal Code', value: 'postalCode' },
              ],
            },
            {
              name: 'placeholder',
              label: 'Placeholder Text',
              type: 'text',
            },
            {
              name: 'required',
              label: 'Required Field',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'validationPattern',
              label: 'Validation Pattern (Regex)',
              type: 'text',
              admin: {
                description: 'Optional regex pattern for validation',
              },
            },
            {
              name: 'options',
              label: 'Options',
              type: 'array',
              admin: {
                condition: (data, siblingData) =>
                  ['select', 'radio'].includes(siblingData?.fieldType),
              },
              fields: [
                {
                  name: 'label',
                  label: 'Option Label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  label: 'Option Value',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'branchingRules',
          label: 'Branching Rules',
          type: 'array',
          admin: {
            description: 'Define conditional navigation to other steps',
          },
          fields: [
            {
              name: 'fieldKey',
              label: 'Field Key',
              type: 'text',
              required: true,
              admin: {
                description: 'The field to check for conditions',
              },
            },
            {
              name: 'condition',
              label: 'Condition',
              type: 'select',
              required: true,
              options: [
                { label: 'Equals', value: 'equals' },
                { label: 'Not Equals', value: 'notEquals' },
                { label: 'Contains', value: 'contains' },
                { label: 'Greater Than', value: 'greaterThan' },
                { label: 'Less Than', value: 'lessThan' },
              ],
            },
            {
              name: 'value',
              label: 'Value',
              type: 'text',
              required: true,
            },
            {
              name: 'nextStep',
              label: 'Next Step Index',
              type: 'number',
              required: true,
              admin: {
                description: 'Zero-based index of the step to navigate to',
              },
            },
          ],
        },
      ],
    },

    // Confirmation State
    {
      name: 'confirmationState',
      label: 'Confirmation Settings',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Confirmation Title',
          type: 'text',
          defaultValue: 'Thank you for your submission!',
        },
        {
          name: 'message',
          label: 'Confirmation Message',
          type: 'textarea',
          defaultValue: 'We have received your submission and will get back to you soon.',
        },
        {
          name: 'ctaButtonLabel',
          label: 'CTA Button Label',
          type: 'text',
          defaultValue: 'Return to Home',
        },
        {
          name: 'ctaUrl',
          label: 'CTA URL',
          type: 'text',
          defaultValue: '/',
        },
      ],
    },

    // Admin & Notifications
    {
      name: 'adminNotifications',
      label: 'Admin & Notifications',
      type: 'group',
      fields: [
        {
          name: 'priority',
          label: 'Form Priority',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Low', value: 'low' },
            { label: 'Normal', value: 'normal' },
            { label: 'High', value: 'high' },
          ],
        },
        {
          name: 'read',
          label: 'Read Status',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Mark as read/unread',
          },
        },
        {
          name: 'sendNotificationEmail',
          label: 'Send Notification Email',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'notificationRecipients',
          label: 'Notification Recipients',
          type: 'array',
          fields: [
            {
              name: 'email',
              label: 'Email Address',
              type: 'email',
              required: true,
            },
          ],
        },
        {
          name: 'emailSubjectTemplate',
          label: 'Email Subject Template',
          type: 'text',
          admin: {
            description: 'Optional custom subject line. Use {{fieldKey}} for dynamic values',
          },
        },
      ],
    },

    // Integrations
    {
      name: 'integrations',
      label: 'External Integrations',
      type: 'group',
      fields: [
        {
          name: 'enableExternalRouting',
          label: 'Enable External Routing',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'integrationType',
          label: 'Integration Type',
          type: 'select',
          admin: {
            condition: (data) => data?.integrations?.enableExternalRouting,
          },
          options: [
            { label: 'Formbricks', value: 'formbricks' },
            { label: 'n8n', value: 'n8n' },
            { label: 'Zapier', value: 'zapier' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'endpointIdentifier',
          label: 'Endpoint/Identifier',
          type: 'text',
          admin: {
            condition: (data) => data?.integrations?.enableExternalRouting,
            description: 'Webhook URL or integration identifier',
          },
        },
        {
          name: 'payloadTemplate',
          label: 'Payload Template',
          type: 'textarea',
          admin: {
            condition: (data) => data?.integrations?.enableExternalRouting,
            description: 'JSON template for the payload. Use {{fieldKey}} for dynamic values',
          },
        },
      ],
    },

    // Preserved tracking fields
    {
      name: 'internalNotes',
      label: 'Internal Notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sourcePage',
      label: 'Source Page',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'referrer',
      label: 'Referrer',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'submittedAt',
      label: 'Submitted At',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.submittedAt = new Date()
        }
        return data
      },
    ],
  },
}

export default ContactForm

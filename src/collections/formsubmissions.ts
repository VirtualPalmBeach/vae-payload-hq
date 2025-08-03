import { CollectionConfig } from 'payload'

const FormSubmissions: CollectionConfig = {
  slug: 'formsubmissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'formId', 'sourceSite', 'submittedAt'],
    group: 'Forms',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Main submission fields
    {
      name: 'formId',
      label: 'Contact Form',
      type: 'relationship',
      relationTo: 'contactForm',
      admin: {
        description: 'The contact form configuration this submission belongs to',
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
    },

    // Meta fields - sidebar positioned
    {
      name: 'sourceSite',
      label: 'Source Site',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'The site this submission originated from',
      },
    },
    {
      name: 'sourcePage',
      label: 'Source Page',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'The page URL this submission originated from',
      },
    },
    {
      name: 'referrer',
      label: 'Referrer',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'The referring URL if available',
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
    {
      name: 'adminNotes',
      label: 'Admin Notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes about this submission',
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

export default FormSubmissions

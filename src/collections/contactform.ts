import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

import { commonSiteKeyField } from './commonSiteKeyField';

const ContactForm: CollectionConfig = {
  slug: 'contactForm',
  admin: { useAsTitle: 'email' },
  fields: [
    commonSiteKeyField,
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sourcePage',
      label: 'Source Page',
      type: 'text',
    },
    {
      name: 'referrer',
      label: 'Referrer',
      type: 'text',
    },
    {
      name: 'internalNotes',
      label: 'Internal Notes',
      type: 'textarea',
    },
    {
      name: 'submittedAt',
      label: 'Submitted At',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default ContactForm;

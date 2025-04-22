import { validateEmail, validateUrl } from '../shared/validate';

const contactFields = [
  {
    name: 'contact',
    type: 'group',
    label: 'Contact Information',
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
        validate: (value) => validateUrl(value, { https: false }),
      },
      {
        name: 'hoursOfOperation',
        label: 'Hours of Operation',
        type: 'array',
        fields: [
          { name: 'day', type: 'text' },
          { name: 'open', type: 'text' },
          { name: 'close', type: 'text' },
        ],
      },
      {
        name: 'address',
        label: 'Address',
        type: 'group',
        fields: [
          { name: 'street', type: 'text' },
          { name: 'city', type: 'text' },
          { name: 'state', type: 'text' },
          { name: 'zip', type: 'text' },
          { name: 'country', type: 'text' },
        ],
      },
    ],
  },
  {
    name: 'social',
    type: 'group',
    label: 'Social Links',
    fields: [
      {
        name: 'facebookUrl',
        label: 'Facebook URL',
        type: 'text',
        validate: (value) => validateUrl(value, { https: true }),
      },
      {
        name: 'instagramUrl',
        label: 'Instagram URL',
        type: 'text',
        validate: (value) => validateUrl(value, { https: true }),
      },
      {
        name: 'mapLink',
        label: 'Map Link',
        type: 'text',
        validate: (value) => validateUrl(value, { https: false }),
      },
      {
        name: 'contactCtaText',
        label: 'CTA Text',
        type: 'text',
      },
    ],
  },
];

export default contactFields;

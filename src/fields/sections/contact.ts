import { validateEmail, validateUrl } from '../shared/validate'

const contactFields = [
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
]

export default {
  label: 'Contact',
  name: 'contact',
  fields: contactFields,
}

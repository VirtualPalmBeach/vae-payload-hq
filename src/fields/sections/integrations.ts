import { Field } from 'payload/types';
import { validateUrl } from '../shared/validate';

const integrationsFields = [
  {
    name: 'apiIntegrations',
    label: 'API Integrations',
    type: 'group',
    fields: [
      {
        name: 'emailProvider',
        label: 'Email Provider',
        type: 'group',
        fields: [
          {
            name: 'provider',
            label: 'Provider',
            type: 'select',
            defaultValue: 'none',
            options: [
              'none',
              'sendgrid',
              'microsoft',
            ],
          },
          {
            name: 'apiKey',
            label: 'API Key',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.provider !== 'none',
            },
          },
          {
            name: 'listId',
            label: 'Audience/List ID',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.provider !== 'none',
            },
          },
        ],
      },
      {
        name: 'paymentGateway',
        label: 'Payment Gateway',
        type: 'group',
        fields: [
          {
            name: 'provider',
            label: 'Provider',
            type: 'select',
            defaultValue: 'none',
            options: [
              'none',
              'stripe',
              'paypal',
              'square',
            ],
          },
          {
            name: 'publicKey',
            label: 'Public Key',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.provider !== 'none',
            },
          },
          {
            name: 'secretKey',
            label: 'Secret Key',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.provider !== 'none',
            },
          },
        ],
      },
      {
        name: 'integrationPlatform',
        label: 'CRM or Messaging Integration',
        type: 'group',
        fields: [
          {
            name: 'provider',
            label: 'Provider',
            type: 'select',
            defaultValue: 'none',
            options: [
              'none',
              'mautic',
              'erxes',
              'teams',
              'slack',
            ],
          },
          {
            name: 'apiKey',
            label: 'API Key',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.provider !== 'none',
            },
          },
        ],
      },
      {
        name: 'customApiEndpoints',
        label: 'Custom API Endpoints',
        type: 'array',
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'url', type: 'text', required: true, validate: (value) => validateUrl(value) },
          {
            name: 'method',
            type: 'select',
            defaultValue: 'GET',
            options: ['GET', 'POST', 'PUT', 'DELETE'],
          },
          { name: 'apiKey', type: 'text' },
        ],
      },
    ],
  },
];

export default integrationsFields;

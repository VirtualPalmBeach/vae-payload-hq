const integrationsTab = {
  label: 'integrations',
  name: 'integrations',
  fields: [
    {
      name: 'emailProvider',
      label: 'Email Provider',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'SendGrid', value: 'sendgrid' },
        { label: 'Mautic', value: 'mautic' },
        { label: 'Erxes', value: 'erxes' },
        { label: 'Microsoft 365', value: 'microsoft' },
      ],
    },
    {
      name: 'emailApiKey',
      label: 'Email API Key',
      type: 'text',
    },
    {
      name: 'crmProvider',
      label: 'CRM Provider',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Mautic', value: 'mautic' },
        { label: 'Erxes', value: 'erxes' },
        { label: 'Custom (n8n)', value: 'n8n' },
      ],
    },
    {
      name: 'crmApiKey',
      label: 'CRM API Key',
      type: 'text',
    },
    {
      name: 'n8nWebhookUrl',
      label: 'n8n Webhook URL',
      type: 'text',
    },
    {
      name: 'customApiEndpoint',
      label: 'Custom API Endpoint',
      type: 'text',
    },
  ],
}

export default integrationsTab

import { Field } from 'payload/types';

const navigationFields: Field[] = [
  {
    name: 'navigation',
    type: 'group',
    label: 'Navigation Settings',
    fields: [
      {
        name: 'primaryNav',
        label: 'Primary Navigation',
        type: 'array',
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'href', type: 'text', required: true },
          {
            name: 'isExternal',
            type: 'checkbox',
            label: 'Open in New Tab',
            defaultValue: false,
          },
          {
            name: 'children',
            label: 'Child Links',
            type: 'array',
            fields: [
              { name: 'label', type: 'text', required: true },
              { name: 'href', type: 'text', required: true },
              {
                name: 'isExternal',
                type: 'checkbox',
                label: 'Open in New Tab',
                defaultValue: false,
              },
            ],
          },
        ],
      },
      {
        name: 'footerNav',
        label: 'Footer Navigation',
        type: 'array',
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'href', type: 'text', required: true },
          {
            name: 'isExternal',
            type: 'checkbox',
            label: 'Open in New Tab',
            defaultValue: false,
          },
        ],
      },
      {
        name: 'stickyEnabled',
        label: 'Sticky Navigation',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'ctaButton',
        label: 'Call-to-Action Button',
        type: 'group',
        fields: [
          { name: 'label', type: 'text' },
          { name: 'href', type: 'text' },
          {
            name: 'style',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Ghost', value: 'ghost' },
            ],
          },
        ],
      },
      {
        name: 'mobileNavVariant',
        label: 'Mobile Nav Style',
        type: 'select',
        defaultValue: 'drawer',
        options: [
          { label: 'Drawer', value: 'drawer' },
          { label: 'Dropdown', value: 'dropdown' },
          { label: 'Full', value: 'full' },
        ],
      },
    ],
  },
];

export default navigationFields;

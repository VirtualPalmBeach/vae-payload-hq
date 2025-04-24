import { Field } from 'payload';

export const visibilityField: Field = {
  name: 'visibility',
  label: 'Visibility',
  type: 'select',
  defaultValue: 'public',
  admin: {
    position: 'sidebar',
  },
  options: [
    {
      label: 'Public',
      value: 'public',
    },
    {
      label: 'Hidden',
      value: 'hidden',
    },
    {
      label: 'Draft',
      value: 'draft',
    },
  ],
};

export const featuredField: Field = {
  name: 'isFeatured',
  label: 'Featured',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    position: 'sidebar',
    description: 'Display in featured sections',
  },
};

export const sortOrderField: Field = {
  name: 'sortOrder',
  label: 'Sort Order',
  type: 'number',
  defaultValue: 0,
  admin: {
    position: 'sidebar',
    description: 'Lower numbers display first',
  },
};

// Export a combined array for convenience
export const optionalDisplayFields: Field[] = [
  visibilityField,
  featuredField,
  sortOrderField,
];
import { Field } from 'payload/types';

export const timestampedFields: Field[] = [
  {
    name: 'createdAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      date: {
        pickerAppearance: 'dayAndTime',
      },
      readOnly: true,
    },
    hooks: {
      beforeChange: [
        ({ operation, value }) => {
          if (operation === 'create') {
            return new Date();
          }
          return value;
        },
      ],
    },
  },
  {
    name: 'updatedAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      date: {
        pickerAppearance: 'dayAndTime',
      },
      readOnly: true,
    },
    hooks: {
      beforeChange: [
        () => new Date(),
      ],
    },
  },
];
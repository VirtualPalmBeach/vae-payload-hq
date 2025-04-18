import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

export const BlogPosts: CollectionConfig = {
  slug: 'blogPosts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'title',
      label: 'Post Title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      label: 'Body Content',
      type: 'richText',
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
    }
  ],
};

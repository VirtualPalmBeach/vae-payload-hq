import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

export const BlogPosts: CollectionConfig = {
  slug: 'blogPosts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Allow public reading of blog posts
    // create, update, delete remain restricted to authenticated users
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
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true, // optional but recommended for lookups
      admin: { position: 'sidebar' },
    },
    {
      name: 'body',
      label: 'Body Content',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      label: 'Featured Image (Cloudinary URL)',
      type: 'text',
      required: false,
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
    },
    {
      name: 'projects',
      label: 'Projects',
      type: 'relationship',
      relationTo: ['projects'] as const,
      hasMany: true,
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: ['categories'] as const,
      hasMany: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: ['tags'] as const,
      hasMany: true,
    },
  ],
}

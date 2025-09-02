import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { isAdmin, isAdminOrDesigner } from '../access/helpers'

const Reals: CollectionConfig = {
  slug: 'reals',
  labels: {
    singular: 'Reals Page',
    plural: 'Reals Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'order'],
    group: 'Content',
  },
  fields: [
    commonSiteKeyField,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cockpit',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              required: true,
              admin: {
                position: 'sidebar',
                description: 'URL-friendly identifier for the Reals page (auto-generated if left blank)',
              },
            },
            {
              name: 'cloudinaryTags',
              label: 'Cloudinary Tags',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Comma-separated tags for Cloudinary search (e.g., ANT2101,IRL,Reals,Social,Video)',
              },
            },
            {
              name: 'videoUrl',
              label: 'Video URL',
              type: 'text',
              access: {
                create: () => false,
                update: () => false,
              },
              admin: {
                readOnly: true,
                description: 'Direct video link from n8n automation - click to open in new tab',
              },
            },
            {
              name: 'featured',
              label: 'Featured',
              type: 'checkbox',
              admin: {
                position: 'sidebar',
                description: 'Display prominently on gallery index',
              },
            },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
              ],
              defaultValue: 'draft',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'publishDate',
              label: 'Publish Date',
              type: 'date',
              defaultValue: () => new Date(),
              admin: {
                position: 'sidebar',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'order',
              label: 'Order',
              type: 'number',
              admin: {
                position: 'sidebar',
                description:
                  'Display priority (higher numbers appear first; leave blank for default position)',
              },
            },
            {
              name: 'loopStartTime',
              label: 'Loop Start Time (sec)',
              type: 'number',
              min: 0,
              max: 25,
              defaultValue: 0.5,
              admin: {
                description:
                  '0–3s recommended. Start time (in seconds) for animated thumbnail loop. Supports decimals (e.g., 2.5).',
                step: 0.1,
              },
            },
          ],
        },
        {
          label: 'Advanced',
          fields: [
            {
              name: 'headline',
              label: 'Headline',
              type: 'richText',
              admin: {
                description: 'Headline for this Reals page',
              },
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              admin: {
                description: 'Brief description of this Reals page',
              },
            },
            {
              name: 'cloudinaryPublicId',
              label: 'Cloudinary Public ID',
              type: 'text',
              access: {
                create: () => false,
                update: () => false,
              },
              admin: {
                readOnly: true,
                description: 'Auto-generated from Cloudinary tags search',
              },
            },
            {
              name: 'posterPublicId',
              label: 'Poster Public ID',
              type: 'text',
              access: {
                create: () => false,
                update: () => false,
              },
              admin: {
                readOnly: true,
                description: 'Auto-generated poster frame ID',
              },
            },
            {
              name: 'thumbnails',
              label: 'Thumbnails',
              type: 'json',
              access: {
                create: () => false,
                update: () => false,
              },
              admin: {
                readOnly: true,
                description: 'Generated thumbnail URLs for responsive display',
              },
            },
            {
              name: 'regenerateThumbnails',
              label: 'Regenerate Thumbnails',
              type: 'checkbox',
              admin: {
                description: 'Check to regenerate thumbnails on next save',
              },
            },
            {
              name: 'tags',
              label: 'Gallery Tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
              admin: {
                position: 'sidebar',
                description: 'Organize this Reals with gallery tags',
              },
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: isAdminOrDesigner,
    update: isAdminOrDesigner,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (data && !data.slug && data.title) {
          const baseSlug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .substring(0, 80);
          
          // Check for slug collisions
          let finalSlug = baseSlug;
          let counter = 2;
          
          const { payload } = req;
          
          while (true) {
            const existing = await payload.find({
              collection: 'reals',
              where: {
                slug: { equals: finalSlug },
                ...(data.id ? { id: { not_equals: data.id } } : {}),
              },
              limit: 1,
            });
            
            if (existing.docs.length === 0) {
              break;
            }
            
            finalSlug = `${baseSlug}-${counter}`;
            counter++;
          }
          
          data.slug = finalSlug;
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc }) => {
        const url = process.env.N8N_VIDEO_URL_WEBHOOK
        if (!url) return

        const ignore = new Set([
          'id','createdAt','updatedAt','_status','versions','_verified','_verificationToken',
          'videoUrl','cloudinaryPublicId','posterPublicId','thumbnails'  // Prevent N8N loops
        ])
        const changed = Object.keys(doc).filter(k => doc[k] !== previousDoc?.[k] && !ignore.has(k))
        if (changed.length === 0) return

        try {
          await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: doc.id, slug: doc.slug, changed }),
          })
        } catch {}
      }
    ],
  },
}

export default Reals

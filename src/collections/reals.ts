import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'

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
              admin: {
                readOnly: true,
                description: 'Auto-generated from Cloudinary tags search',
              },
            },
            {
              name: 'posterPublicId',
              label: 'Poster Public ID',
              type: 'text',
              admin: {
                readOnly: true,
                description: 'Auto-generated poster frame ID',
              },
            },
            {
              name: 'thumbnails',
              label: 'Thumbnails',
              type: 'json',
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
    create: () => true,
    update: () => true,
    delete: () => true,
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
        // Skip if N8N webhook URL not configured
        if (!process.env.N8N_VIDEO_URL_WEBHOOK) {
          return;
        }

        const automationFields = new Set(['videoUrl', 'cloudinaryPublicId', 'posterPublicId', 'thumbnails']);
        const metaKeys = new Set(['updatedAt', 'createdAt', 'id', 'versions', '_status']);
        
        // Find changed keys
        const changedKeys = Object.keys(doc).filter(key => doc[key] !== previousDoc?.[key]);
        
        // Skip if only automation + meta fields changed
        const significantChanges = changedKeys.filter(key => 
          !automationFields.has(key) && !metaKeys.has(key)
        );
        
        if (significantChanges.length === 0) {
          return;
        }
        
        // Trigger N8N webhook
        try {
          await fetch(process.env.N8N_VIDEO_URL_WEBHOOK, {
            method: 'POST',
            body: JSON.stringify({ id: doc.id }),
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(5000)
          });
        } catch {
          // Swallow errors - save must succeed
        }
      }
    ],
  },
}

export default Reals

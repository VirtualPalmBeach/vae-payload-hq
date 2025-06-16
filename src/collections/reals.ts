import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { v2 as cloudinary } from 'cloudinary'

const Reals: CollectionConfig = {
  slug: 'reals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'order'],
  },
  fields: [
    commonSiteKeyField,
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
        description: 'URL-friendly identifier for this spotlight gallery',
      },
    },
    {
      name: 'headline',
      label: 'Headline',
      type: 'richText',
      admin: {
        description: 'Headline for this spotlight gallery',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'Brief description of this spotlight gallery',
      },
    },
    {
      name: 'cloudinaryTags',
      label: 'Cloudinary Tags',
      type: 'text',
      required: true,
      admin: {
        description: 'Comma-separated tags for Cloudinary search (e.g., social,spotlight,featured)',
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
        description: 'Organize this spotlight with gallery tags',
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
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Skip if this is triggered by our own hook to prevent loops
        if (req.context?.skipPoster) return doc

        // Only process on create/update operations
        if (operation === 'create' || operation === 'update') {
          try {
            // Force fresh Cloudinary configuration on each hook execution
            cloudinary.config({
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
              secure: true, // Ensure HTTPS in production
            })
            // Verify configuration loaded
            console.log(
              'Cloudinary config - Cloud name:',
              process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
            )
            console.log('Cloudinary configured for:', doc.title)

            // Tag-to-publicId resolution via Cloudinary Search API
            if (doc.cloudinaryTags) {
              const tags = doc.cloudinaryTags.split(',').map((tag: string) => tag.trim())
              console.log('Searching for tags:', tags)

              // Require ALL tags to match (comprehensive filtering)
              const expression = tags.map((tag: string) => `tags:${tag}`).join(' AND ')
              console.log('Search expression (AND logic):', expression)

              const searchResult = await cloudinary.search
                .expression(`${expression} AND resource_type:video`)
                .sort_by('created_at', 'desc')
                .max_results(1)
                .execute()

              if (searchResult.resources && searchResult.resources.length > 0) {
                const video = searchResult.resources[0]
                console.log('Found video:', video.public_id)

                // Generate eager transforms for responsive thumbnails
                const transformSizes = [
                  { width: 480, name: 'small' },
                  { width: 768, name: 'medium' },
                  { width: 1280, name: 'large' },
                ]

                const thumbnails: { [key: string]: string } = {}

                for (const size of transformSizes) {
                  thumbnails[size.name] = cloudinary.url(video.public_id, {
                    resource_type: 'video',
                    start_offset: '1.5',
                    crop: 'fill',
                    aspect_ratio: '9:16',
                    width: size.width,
                    quality: 'auto',
                    fetch_format: 'auto',
                  })
                }

                console.log('Generated thumbnails:', thumbnails)

                // Update document with Cloudinary results (with retry for cloud concurrency)
                let updateAttempts = 0
                const maxAttempts = 3

                while (updateAttempts < maxAttempts) {
                  try {
                    const updatedDoc = await req.payload.update({
                      collection: 'reals',
                      id: doc.id,
                      data: {
                        cloudinaryPublicId: video.public_id,
                        posterPublicId: video.public_id,
                        thumbnails: thumbnails,
                        regenerateThumbnails: false,
                      },
                      context: { skipPoster: true },
                    })

                    console.log('Document updated with Cloudinary data')
                    return updatedDoc
                  } catch (updateError: unknown) {
                    updateAttempts++

                    // Type-safe error code checking
                    const isWriteConflict =
                      updateError &&
                      typeof updateError === 'object' &&
                      'code' in updateError &&
                      updateError.code === 112

                    if (isWriteConflict && updateAttempts < maxAttempts) {
                      console.log(`Write conflict, retrying... (${updateAttempts}/${maxAttempts})`)
                      await new Promise((resolve) => setTimeout(resolve, 100 * updateAttempts))
                    } else {
                      throw updateError
                    }
                  }
                }
              } else {
                console.log('No videos found for tags:', tags)
              }
            }
          } catch (error) {
            console.error('Cloudinary hook error:', error)
          }
        }

        return doc
      },
    ],
  },
  access: {
    read: () => true,
  },
}

export default Reals

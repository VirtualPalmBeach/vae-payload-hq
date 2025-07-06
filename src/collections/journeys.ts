import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const Journeys: CollectionConfig = {
  slug: 'journeys',
  admin: {
    useAsTitle: 'title',
    description: 'Story-based content for client journeys, spotlights, and insights',
    defaultColumns: ['title', 'category', 'featured', 'siteKey', 'published', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Site Configuration
    commonSiteKeyField,
    
    // Core Story Fields
    {
      name: 'title',
      label: 'Story Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the journey or story',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (auto-generated from title)',
      },
      hooks: {
        beforeValidate: [
          ({ value, originalDoc, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief summary for card displays (max 200 chars)',
      },
    },
    {
      name: 'fullDescription',
      label: 'Story Introduction',
      type: 'richText',
      admin: {
        description: 'Opening narrative or introduction for the story',
      },
    },
    
    // Content Blocks - Self-contained flexible content
    {
      name: 'contentBlocks',
      label: 'Content Blocks',
      type: 'blocks',
      admin: {
        description: 'Build your story with flexible content blocks',
      },
      blocks: [
        // Rich Text Block
        {
          slug: 'richText',
          labels: {
            singular: 'Rich Text',
            plural: 'Rich Text Blocks',
          },
          fields: [
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              required: true,
            },
          ],
        },
        
        // Full Width Image Block
        {
          slug: 'fullWidthImage',
          labels: {
            singular: 'Full Width Image',
            plural: 'Full Width Images',
          },
          fields: [
            {
              name: 'cloudinaryTag',
              label: 'Image Tag',
              type: 'text',
              required: true,
              admin: {
                description: 'Cloudinary tag for the image',
              },
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
              admin: {
                description: 'Optional image caption',
              },
            },
            {
              name: 'aspectRatio',
              label: 'Aspect Ratio',
              type: 'select',
              options: [
                { label: 'Landscape (16:9)', value: '16:9' },
                { label: 'Wide (21:9)', value: '21:9' },
                { label: 'Square (1:1)', value: '1:1' },
                { label: 'Standard (4:3)', value: '4:3' },
              ],
              defaultValue: '16:9',
            },
          ],
        },
        
        // Image Grid Block
        {
          slug: 'imageGrid',
          labels: {
            singular: 'Image Grid',
            plural: 'Image Grids',
          },
          fields: [
            {
              name: 'columns',
              label: 'Grid Columns',
              type: 'select',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
              defaultValue: '3',
            },
            {
              name: 'images',
              label: 'Images',
              type: 'array',
              minRows: 2,
              maxRows: 12,
              fields: [
                {
                  name: 'cloudinaryTag',
                  label: 'Image Tag',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'caption',
                  label: 'Caption',
                  type: 'text',
                },
              ],
            },
          ],
        },
        
        // Video Block - Cloudinary Only
        {
          slug: 'video',
          labels: {
            singular: 'Video',
            plural: 'Videos',
          },
          fields: [
            {
              name: 'cloudinaryVideoTag',
              label: 'Cloudinary Video Tag',
              type: 'text',
              required: true,
              admin: {
                description: 'Cloudinary public ID or tag for the video',
                placeholder: 'e.g., journey-pool-transformation-timelapse',
              },
            },
            {
              name: 'caption',
              label: 'Video Caption',
              type: 'text',
              admin: {
                description: 'Optional caption below the video',
              },
            },
          ],
        },
        
        // Quote Block
        {
          slug: 'quote',
          labels: {
            singular: 'Quote / Testimonial',
            plural: 'Quotes / Testimonials',
          },
          fields: [
            {
              name: 'text',
              label: 'Quote Text',
              type: 'textarea',
              required: true,
            },
            {
              name: 'author',
              label: 'Author',
              type: 'text',
              required: true,
            },
            {
              name: 'authorTitle',
              label: 'Author Title/Company',
              type: 'text',
            },
            {
              name: 'style',
              label: 'Quote Style',
              type: 'select',
              options: [
                { label: 'Centered Large', value: 'centered' },
                { label: 'Left Aligned', value: 'left' },
                { label: 'Pull Quote', value: 'pull' },
              ],
              defaultValue: 'centered',
            },
          ],
        },
        
        // Call to Action Block
        {
          slug: 'callToActionBlock',
          labels: {
            singular: 'Call to Action',
            plural: 'Calls to Action',
          },
          fields: [
            {
              name: 'heading',
              label: 'CTA Heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'CTA Description',
              type: 'textarea',
            },
            {
              name: 'buttonText',
              label: 'Button Text',
              type: 'text',
              required: true,
            },
            {
              name: 'buttonLink',
              label: 'Button Link',
              type: 'text',
              required: true,
            },
            {
              name: 'buttonStyle',
              label: 'Button Style',
              type: 'select',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' },
              ],
              defaultValue: 'primary',
            },
            {
              name: 'backgroundStyle',
              label: 'Background Style',
              type: 'select',
              options: [
                { label: 'Gray Background', value: 'gray' },
                { label: 'Blue Background', value: 'blue' },
                { label: 'White Background', value: 'white' },
              ],
              defaultValue: 'gray',
            },
          ],
        },
        
        // Divider Block
        {
          slug: 'divider',
          labels: {
            singular: 'Divider',
            plural: 'Dividers',
          },
          fields: [
            {
              name: 'style',
              label: 'Divider Style',
              type: 'select',
              options: [
                { label: 'Simple Line', value: 'line' },
                { label: 'Dots', value: 'dots' },
                { label: 'Spacing Only', value: 'space' },
              ],
              defaultValue: 'line',
            },
            {
              name: 'size',
              label: 'Size',
              type: 'select',
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ],
              defaultValue: 'medium',
            },
          ],
        },
      ],
    },
    
    // Categorization
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Client Story', value: 'client-story' },
        { label: 'Spotlight', value: 'spotlight' },
        { label: 'Insight', value: 'insight' },
        { label: 'Testimonial', value: 'testimonial' },
        { label: 'Guided Tour', value: 'guided-tour' },
        { label: 'Elements', value: 'elements' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Story category for filtering and organization',
      },
    },
    {
      name: 'projectCode',
      label: 'Related Project Code',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional: Link to portfolio project (e.g., ROD2301)',
        placeholder: 'ABC2301',
      },
    },
    {
      name: 'featured',
      label: 'Featured Story',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display prominently in story grids',
      },
    },
    
    // Visual Content
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary tag for the main story image',
        placeholder: 'e.g., journey-client-pool-transformation',
      },
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        description: 'Story publication date',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    
    // Story Details
    {
      name: 'storyDetails',
      label: 'Story Details',
      type: 'group',
      fields: [
        {
          name: 'readingTime',
          label: 'Reading Time',
          type: 'text',
          admin: {
            description: 'Estimated reading time',
            placeholder: 'e.g., 5 min read',
          },
        },
        {
          name: 'author',
          label: 'Author',
          type: 'text',
          admin: {
            description: 'Story author or contributor',
          },
        },
        {
          name: 'state',
          label: 'State',
          type: 'text',
          admin: {
            description: 'State abbreviation',
            placeholder: 'e.g., TX',
          },
        },
        {
          name: 'cityName',
          label: 'City Name',
          type: 'text',
          admin: {
            description: 'City where the project is located',
            placeholder: 'e.g., Dallas',
          },
        },
        {
          name: 'zipCode',
          label: 'Zip Code',
          type: 'text',
          admin: {
            description: 'Zip code for location',
            placeholder: 'e.g., 75201',
          },
        },
        {
          name: 'tags',
          label: 'Tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
          admin: {
            description: 'Keywords for search and filtering',
          },
        },
      ],
    },
    
    // Gallery Images (optional)
    {
      name: 'galleryImages',
      label: 'Gallery Images',
      type: 'array',
      admin: {
        description: 'Additional images for the story',
      },
      fields: [
        {
          name: 'cloudinaryTag',
          label: 'Cloudinary Tag',
          type: 'text',
          required: true,
          admin: {
            description: 'Tag for gallery image',
          },
        },
        {
          name: 'caption',
          label: 'Image Caption',
          type: 'text',
          admin: {
            description: 'Optional caption for this image',
          },
        },
      ],
    },
    
    // Call to Action (optional)
    {
      name: 'callToAction',
      label: 'Call to Action',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'CTA Text',
          type: 'text',
          admin: {
            description: 'Button or link text',
            placeholder: 'e.g., View This Project',
          },
        },
        {
          name: 'link',
          label: 'CTA Link',
          type: 'text',
          admin: {
            description: 'URL for the call to action',
            placeholder: 'e.g., /portfolio/residential/project-name',
          },
        },
        {
          name: 'style',
          label: 'CTA Style',
          type: 'select',
          options: [
            { label: 'Primary Button', value: 'primary' },
            { label: 'Secondary Button', value: 'secondary' },
            { label: 'Text Link', value: 'link' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    
    // Publishing Controls
    {
      name: 'published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: false,
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Make this story visible on the website',
      },
    },
    {
      name: 'scheduledPublishDate',
      label: 'Scheduled Publish Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Optional: Schedule when this story should be published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    
    // Version Control
    {
      name: 'versionNumber',
      label: 'Version Number',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Version tracking (e.g., 1.0, 1.1, 2.0)',
        placeholder: '1.0',
      },
    },
    {
      name: 'revisionNotes',
      label: 'Revision Notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Notes about changes in this version',
        placeholder: 'Initial publish, Updated images, etc.',
      },
    },
    
    // SEO Fields
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
          admin: {
            description: 'Override the default meta title',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          admin: {
            description: 'Override the default meta description',
          },
        },
      ],
    },
    
    // Timestamps
    ...timestampedFields,
  ],
  indexes: [
    {
      fields: ['slug', 'siteKey'],
      unique: true,
    },
    {
      fields: ['category', 'featured', 'publishedDate'],
    },
    {
      fields: ['siteKey', 'published', 'category'],
    },
    {
      fields: ['projectCode'],
    },
  ],
}

export default Journeys
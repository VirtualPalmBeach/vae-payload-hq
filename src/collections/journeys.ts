import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'
import { isAdmin } from '../access/helpers'

const Journeys: CollectionConfig = {
  slug: 'journeys',
  labels: {
    singular: 'Journey (Stories) Page',
    plural: 'Journeys (Stories) Pages',
  },
  admin: {
    useAsTitle: 'title',
    description:
      'Story-based content for client journeys, spotlights, and insights. Use content blocks to build rich, engaging narratives.',
    defaultColumns: [
      'title',
      'category',
      'published',
      'featured',
      'heroImage',
      'scheduledPublishDate',
      'updatedAt',
    ],
    listSearchableFields: ['title', 'shortDescription', 'projectCode', 'seriesKey'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // Site Configuration
    commonSiteKeyField,

    // === HERO & VISUAL SECTION ===
    // Core Story Fields
    {
      name: 'title',
      label: 'Story Title',
      type: 'text',
      required: true,
      admin: {
        description:
          'The main headline for your story. Keep it compelling and under 60 characters for best display.',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (auto-generated from title)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
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
        description:
          'Brief summary for card displays and SEO meta descriptions. Write a compelling hook that entices readers (max 200 chars).',
      },
    },
    {
      name: 'fullDescription',
      label: 'Story Introduction',
      type: 'richText',
      admin: {
        description:
          "Opening narrative that sets the scene. This appears before content blocks and should introduce the story's main themes.",
      },
    },

    // === CONTENT & BLOCKS SECTION ===
    // Content Blocks - Self-contained flexible content
    {
      name: 'contentBlocks',
      label: 'Content Blocks',
      type: 'blocks',
      admin: {
        description:
          'Build your story with flexible content blocks. Mix text, images, videos, timelines, stats, and more to create engaging narratives. Drag to reorder blocks.',
      },
      blocks: [
        // Rich Text Block
        {
          slug: 'richText',
          labels: {
            singular: 'Rich Text - Content & Formatting',
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
            singular: 'Video - Cloudinary Hosted',
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
            singular: 'Call to Action - Conversion Driver',
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

        // Feedback Form Block - Scaffolding for future Formbricks integration
        {
          slug: 'feedbackForm',
          labels: {
            singular: 'Feedback Form - User Engagement',
            plural: 'Feedback Forms',
          },
          fields: [
            {
              name: 'heading',
              label: 'Form Heading',
              type: 'text',
              defaultValue: 'Share Your Thoughts',
              admin: {
                description: 'Heading displayed above the feedback form',
              },
            },
            {
              name: 'description',
              label: 'Form Description',
              type: 'textarea',
              admin: {
                description: 'Optional description or instructions for the form',
              },
            },
            {
              name: 'formType',
              label: 'Form Type',
              type: 'select',
              options: [
                { label: 'General Feedback', value: 'general' },
                { label: 'Project Inquiry', value: 'inquiry' },
                { label: 'Testimonial', value: 'testimonial' },
                { label: 'Survey', value: 'survey' },
              ],
              defaultValue: 'general',
              admin: {
                description: 'Type of feedback form (for future Formbricks configuration)',
              },
            },
            {
              name: 'successMessage',
              label: 'Success Message',
              type: 'text',
              defaultValue: 'Thank you for your feedback!',
              admin: {
                description: 'Message shown after successful form submission',
              },
            },
            {
              name: 'formId',
              label: 'Formbricks Form ID',
              type: 'text',
              admin: {
                description:
                  'Optional: Connect a Formbricks form by entering its ID. Find this in your Formbricks dashboard under Form Settings > General.',
                placeholder: 'e.g., clh1234567890abcdef',
              },
            },
            {
              name: 'triggerMode',
              label: 'Form Trigger Mode',
              type: 'select',
              options: [
                { label: 'Inline Display', value: 'inline' },
                { label: 'Modal Popup', value: 'modal' },
                { label: 'Slide-in Panel', value: 'slide' },
              ],
              defaultValue: 'inline',
              admin: {
                description: 'How the form appears to users',
              },
            },
            {
              name: 'triggerDelay',
              label: 'Trigger Delay (seconds)',
              type: 'number',
              min: 0,
              max: 60,
              admin: {
                description: 'Optional: Delay before showing form (for modal/slide modes)',
              },
            },
          ],
        },

        // Timeline Block - v3.0
        // Display project milestones in chronological order. Perfect for renovation stories and multi-phase projects.
        {
          slug: 'timeline',
          labels: {
            singular: 'Timeline - Project Milestones',
            plural: 'Timelines',
          },
          fields: [
            {
              name: 'heading',
              label: 'Timeline Heading',
              type: 'text',
              defaultValue: 'Project Timeline',
            },
            {
              name: 'entries',
              label: 'Timeline Entries',
              type: 'array',
              minRows: 2,
              fields: [
                {
                  name: 'date',
                  label: 'Date',
                  type: 'date',
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
                {
                  name: 'title',
                  label: 'Event Title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Event Description',
                  type: 'textarea',
                },
                {
                  name: 'mediaTag',
                  label: 'Media Tag',
                  type: 'text',
                  admin: {
                    description: 'Optional: Cloudinary tag for event image/video',
                  },
                },
              ],
            },
          ],
        },

        // Stats Block - v3.0
        // Display numeric highlights with labels and optional suffixes
        {
          slug: 'stats',
          labels: {
            singular: 'Statistics - Numeric Highlights',
            plural: 'Statistics Blocks',
          },
          fields: [
            {
              name: 'heading',
              label: 'Stats Heading',
              type: 'text',
              defaultValue: 'Project Highlights',
            },
            {
              name: 'stats',
              label: 'Statistics',
              type: 'array',
              minRows: 2,
              maxRows: 6,
              fields: [
                {
                  name: 'value',
                  label: 'Statistic Value',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g., 25,000 gal',
                  },
                },
                {
                  name: 'label',
                  label: 'Statistic Label',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g., Pool Capacity',
                  },
                },
                {
                  name: 'suffix',
                  label: 'Value Suffix',
                  type: 'text',
                  admin: {
                    description: 'Optional: Unit or qualifier',
                    placeholder: 'e.g., per year',
                  },
                },
              ],
            },
          ],
        },

        // FAQ Block - v3.0
        // Question and answer pairs with optional categorization
        {
          slug: 'faq',
          labels: {
            singular: 'FAQ - Questions & Answers',
            plural: 'FAQ Sections',
          },
          fields: [
            {
              name: 'heading',
              label: 'FAQ Heading',
              type: 'text',
              defaultValue: 'Frequently Asked Questions',
            },
            {
              name: 'questions',
              label: 'Questions & Answers',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'question',
                  label: 'Question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  label: 'Answer',
                  type: 'richText',
                  required: true,
                },
                {
                  name: 'category',
                  label: 'FAQ Category',
                  type: 'text',
                  admin: {
                    description: 'Optional: Group similar questions',
                  },
                },
              ],
            },
            {
              name: 'expandedByDefault',
              label: 'Expanded by Default',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Show all answers expanded on page load',
              },
            },
          ],
        },
      ],
    },

    // === METADATA & ORGANIZATION SECTION ===
    // Categorization
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      index: true,
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
      index: true,
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
      validate: (value: string | null | undefined, { data }: { data: Record<string, unknown> }) => {
        // Required only when published is true
        if (data?.published === true && !value) {
          return 'Hero image is required for published stories'
        }
        return true
      },
      admin: {
        description:
          'Cloudinary tag for the main story image (required for published stories). This image appears in story cards and hero sections.',
        placeholder: 'e.g., journey-client-pool-transformation',
      },
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      required: true,
      index: true,
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
          name: 'locationPoint',
          label: 'Location Coordinates',
          type: 'group',
          admin: {
            description:
              'Optional: GPS coordinates for future mapping features. Use decimal degrees format (e.g., Dallas: 32.7767, -96.7970)',
          },
          fields: [
            {
              name: 'latitude',
              label: 'Latitude',
              type: 'number',
              min: -90,
              max: 90,
              admin: {
                placeholder: 'e.g., 32.7767',
                description: 'North/South position (-90 to 90)',
              },
            },
            {
              name: 'longitude',
              label: 'Longitude',
              type: 'number',
              min: -180,
              max: 180,
              admin: {
                placeholder: 'e.g., -96.7970',
                description: 'East/West position (-180 to 180)',
              },
            },
          ],
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
              validate: (value: string | null | undefined) => {
                if (!value) return true
                // Validate tag pattern: lowercase, alphanumeric with hyphens
                const pattern = /^[a-z0-9]+(-[a-z0-9]+)*$/
                if (!pattern.test(value)) {
                  return 'Tags must be lowercase, alphanumeric with hyphens (e.g., pool-renovation)'
                }
                return true
              },
            },
          ],
          admin: {
            description: 'Keywords for search and filtering (lowercase, hyphenated)',
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

    // === ORGANIZATION SECTION ===
    // Series Management
    {
      name: 'seriesKey',
      label: 'Series Key',
      type: 'text',
      admin: {
        description:
          'Optional: Group multi-part stories together. Use lowercase with hyphens (e.g., "pool-renovation-series"). Stories with the same key will be linked.',
        placeholder: 'renovation-series-2024',
      },
    },

    // === PUBLISHING & SEO SECTION ===
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
        description:
          'Track content versions for editorial workflow. Use semantic versioning (e.g., 1.0 for initial, 1.1 for minor updates, 2.0 for major rewrites).',
        placeholder: '1.0',
      },
    },
    {
      name: 'revisionNotes',
      label: 'Revision Notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description:
          'Document what changed in this version. Helpful for team collaboration and content audits.',
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

    // Advanced SEO/AEO - v3.0
    {
      name: 'structuredData',
      label: 'Structured Data (JSON-LD)',
      type: 'json',
      admin: {
        description:
          'Optional: Add schema.org JSON-LD markup for rich search results. Common types: Article, FAQPage, HowTo, Event. Validate at schema.org/validator before publishing.',
      },
    },
    {
      name: 'canonicalUrl',
      label: 'Canonical URL',
      type: 'text',
      admin: {
        description:
          'Optional: Override the default canonical URL. Use when content exists at multiple URLs or when migrating from another domain. Must be absolute URL.',
        placeholder: 'https://selah.pro/journeys/custom-url',
      },
    },
    {
      name: 'redirectHistory',
      label: 'Redirect History',
      type: 'array',
      admin: {
        description: 'Track previous URLs for future redirect management',
      },
      fields: [
        {
          name: 'oldSlug',
          label: 'Old Slug',
          type: 'text',
          required: true,
        },
        {
          name: 'redirectDate',
          label: 'Redirect Date',
          type: 'date',
          required: true,
          defaultValue: () => new Date().toISOString(),
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

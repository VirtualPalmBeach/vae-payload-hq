import { CollectionConfig } from 'payload'
import { commonSiteKeyField } from './commonSiteKeyField'
import { timestampedFields } from '../fields/timestampedFields'

const About: CollectionConfig = {
  slug: 'about',
  admin: {
    useAsTitle: 'title',
    description: 'Flagship brand reveal page with rich content blocks',
    defaultColumns: ['title', 'updatedAt', 'siteKey'],
    group: 'Content',
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
    
    // Core Fields
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      defaultValue: 'About Us',
      admin: {
        description: 'Main page title for the about section',
      },
    },
    
    // Hero Section
    {
      name: 'heroSection',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Hero Headline',
          type: 'text',
          required: true,
          maxLength: 100,
          admin: {
            description: 'Main headline displayed in hero section',
          },
        },
        {
          name: 'subheadline',
          label: 'Hero Subheadline',
          type: 'textarea',
          maxLength: 200,
          admin: {
            description: 'Supporting text below headline',
          },
        },
        {
          name: 'heroImage',
          label: 'Hero Image',
          type: 'text',
          required: true,
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!/^[a-z0-9-]+$/.test(value)) {
              return 'Hero image tag must contain only lowercase letters, numbers, and hyphens'
            }
            return true
          },
          admin: {
            description: 'Cloudinary tag for hero background image',
            placeholder: 'e.g., about-hero-luxury-pool',
          },
        },
      ],
    },
    
    // Content Blocks
    {
      name: 'contentBlocks',
      label: 'Content Blocks',
      type: 'blocks',
      minRows: 1,
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
              validate: (value: string | null | undefined) => {
                if (!value) return true
                if (!/^[a-z0-9-]+$/.test(value)) {
                  return 'Image tag must contain only lowercase letters, numbers, and hyphens'
                }
                return true
              },
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
              ],
              defaultValue: '16:9',
            },
          ],
        },
        
        // Image Gallery Block
        {
          slug: 'imageGallery',
          labels: {
            singular: 'Image Gallery',
            plural: 'Image Galleries',
          },
          fields: [
            {
              name: 'title',
              label: 'Gallery Title',
              type: 'text',
              maxLength: 100,
            },
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
              required: true,
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
                  validate: (value: string | null | undefined) => {
                    if (!value) return true
                    if (!/^[a-z0-9-]+$/.test(value)) {
                      return 'Image tag must contain only lowercase letters, numbers, and hyphens'
                    }
                    return true
                  },
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
        
        // Video Embed Block
        {
          slug: 'videoEmbed',
          labels: {
            singular: 'Video',
            plural: 'Videos',
          },
          fields: [
            {
              name: 'cloudinaryVideoTag',
              label: 'Video Tag',
              type: 'text',
              required: true,
              validate: (value: string | null | undefined) => {
                if (!value) return true
                if (!/^[a-z0-9-]+$/.test(value)) {
                  return 'Video tag must contain only lowercase letters, numbers, and hyphens'
                }
                return true
              },
              admin: {
                description: 'Cloudinary tag for the video',
              },
            },
            {
              name: 'title',
              label: 'Video Title',
              type: 'text',
              maxLength: 100,
            },
            {
              name: 'autoplay',
              label: 'Autoplay',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Enable autoplay (muted)',
              },
            },
          ],
        },
        
        // Quote Block
        {
          slug: 'quote',
          labels: {
            singular: 'Quote',
            plural: 'Quotes',
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
              maxLength: 100,
            },
            {
              name: 'authorTitle',
              label: 'Author Title',
              type: 'text',
              maxLength: 100,
            },
            {
              name: 'style',
              label: 'Style',
              type: 'select',
              options: [
                { label: 'Centered Large', value: 'centered' },
                { label: 'Left Aligned', value: 'left' },
              ],
              defaultValue: 'centered',
            },
          ],
        },
        
        // Team Showcase Block
        {
          slug: 'teamShowcase',
          labels: {
            singular: 'Team Showcase',
            plural: 'Team Showcases',
          },
          fields: [
            {
              name: 'heading',
              label: 'Section Heading',
              type: 'text',
              required: true,
              defaultValue: 'Meet Our Team',
              maxLength: 100,
            },
            {
              name: 'description',
              label: 'Section Description',
              type: 'textarea',
              maxLength: 500,
            },
            {
              name: 'displayMode',
              label: 'Display Mode',
              type: 'select',
              options: [
                { label: 'All Team Members', value: 'all' },
                { label: 'Featured Only', value: 'featured' },
                { label: 'Selected Members', value: 'selected' },
              ],
              defaultValue: 'featured',
              required: true,
            },
            {
              name: 'selectedMembers',
              label: 'Selected Team Members',
              type: 'relationship',
              relationTo: 'team',
              hasMany: true,
              admin: {
                condition: (data, siblingData) => siblingData?.displayMode === 'selected',
                description: 'Choose specific team members to display',
              },
            },
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
              required: true,
            },
          ],
        },
        
        // Company Values Block
        {
          slug: 'companyValues',
          labels: {
            singular: 'Company Values',
            plural: 'Company Values',
          },
          fields: [
            {
              name: 'heading',
              label: 'Section Heading',
              type: 'text',
              required: true,
              defaultValue: 'Our Values',
              maxLength: 100,
            },
            {
              name: 'values',
              label: 'Values',
              type: 'array',
              minRows: 2,
              maxRows: 6,
              fields: [
                {
                  name: 'title',
                  label: 'Value Title',
                  type: 'text',
                  required: true,
                  maxLength: 50,
                },
                {
                  name: 'description',
                  label: 'Description',
                  type: 'textarea',
                  required: true,
                  maxLength: 200,
                },
                {
                  name: 'icon',
                  label: 'Icon',
                  type: 'select',
                  options: [
                    { label: 'Star', value: 'star' },
                    { label: 'Shield', value: 'shield' },
                    { label: 'Heart', value: 'heart' },
                    { label: 'Trophy', value: 'trophy' },
                    { label: 'Sparkles', value: 'sparkles' },
                    { label: 'Lightning', value: 'lightning' },
                  ],
                },
              ],
            },
          ],
        },
        
        // Stats Block
        {
          slug: 'stats',
          labels: {
            singular: 'Statistics',
            plural: 'Statistics',
          },
          fields: [
            {
              name: 'heading',
              label: 'Section Heading',
              type: 'text',
              maxLength: 100,
            },
            {
              name: 'stats',
              label: 'Statistics',
              type: 'array',
              minRows: 2,
              maxRows: 4,
              fields: [
                {
                  name: 'value',
                  label: 'Value',
                  type: 'text',
                  required: true,
                  maxLength: 20,
                  admin: {
                    description: 'e.g., "100", "25K", "99%"',
                  },
                },
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true,
                  maxLength: 50,
                },
                {
                  name: 'suffix',
                  label: 'Suffix',
                  type: 'text',
                  maxLength: 10,
                  admin: {
                    description: 'e.g., "+", "%", "years"',
                  },
                },
              ],
            },
          ],
        },
        
        // Call to Action Block
        {
          slug: 'callToAction',
          labels: {
            singular: 'Call to Action',
            plural: 'Calls to Action',
          },
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'text',
              required: true,
              maxLength: 100,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              maxLength: 200,
            },
            {
              name: 'buttonText',
              label: 'Button Text',
              type: 'text',
              required: true,
              maxLength: 50,
            },
            {
              name: 'buttonLink',
              label: 'Button Link',
              type: 'text',
              required: true,
              admin: {
                description: 'Internal link (e.g., /contact) or external URL',
              },
            },
            {
              name: 'backgroundStyle',
              label: 'Background',
              type: 'select',
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Gray', value: 'gray' },
                { label: 'White', value: 'white' },
              ],
              defaultValue: 'blue',
            },
          ],
        },
      ],
    },
    
    // SEO Fields
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'Override page title for SEO (60 chars max)',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Page description for search results (160 chars max)',
          },
        },
        {
          name: 'metaImage',
          label: 'Meta Image',
          type: 'text',
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (!/^[a-z0-9-]+$/.test(value)) {
              return 'Meta image tag must contain only lowercase letters, numbers, and hyphens'
            }
            return true
          },
          admin: {
            description: 'Cloudinary tag for social sharing image',
          },
        },
      ],
    },
    
    // Timestamps
    ...timestampedFields,
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Ensure single document per site
        return data
      },
    ],
  },
  indexes: [
    {
      fields: ['siteKey'],
      unique: true, // One about page per site
    },
  ],
}

export default About
import { Block } from 'payload'

export const ContentSectionBlock: Block = {
  slug: 'contentSection',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    // Core Content
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      required: false,
      maxLength: 60,
      admin: {
        description: 'Optional pre-heading label (e.g., "Case Study", "Featured Project")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      maxLength: 120,
      admin: {
        description: 'Primary heading (H2-level)',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      required: false,
      maxLength: 240,
      admin: {
        description: 'Optional secondary heading',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Content',
      required: false,
      admin: {
        description: 'Story narrative with rich text formatting',
      },
    },
    {
      name: 'mediaPublicId',
      type: 'text',
      label: 'Media Public ID',
      required: false,
      admin: {
        description: 'Cloudinary public ID for image or video',
        placeholder: 'Project/ROD2301/photos/example-image',
      },
    },
    {
      name: 'mediaPosition',
      type: 'select',
      label: 'Media Position',
      required: false,
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        { label: 'Full Width', value: 'full' },
        { label: 'Stacked', value: 'stacked' },
      ],
      admin: {
        description: 'Position of media relative to content',
      },
    },
    {
      name: 'mediaStyle',
      type: 'select',
      label: 'Media Style',
      required: false,
      defaultValue: 'framed',
      options: [
        { label: 'Framed', value: 'framed' },
        { label: 'Overlap', value: 'overlap' },
        { label: 'Full Bleed', value: 'fullBleed' },
      ],
      admin: {
        description: 'Visual treatment for media element',
      },
    },

    // Narrative Enrichments
    {
      name: 'statsRow',
      type: 'array',
      label: 'Stats Row',
      required: false,
      maxRows: 4,
      admin: {
        description: 'Display key metrics or statistics (max 4 items)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          maxLength: 60,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
          maxLength: 40,
          admin: {
            description: 'Numeric value or short text',
          },
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
          required: false,
          maxLength: 20,
          admin: {
            description: 'Optional unit (e.g., "sqft", "%", "days")',
          },
        },
      ],
    },
    {
      name: 'quoteStrip',
      type: 'group',
      label: 'Quote Strip',
      admin: {
        description: 'Optional testimonial or quote callout',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
          required: false,
          maxLength: 500,
        },
        {
          name: 'attribution',
          type: 'text',
          label: 'Attribution',
          required: false,
          maxLength: 100,
          admin: {
            description: 'Name of person quoted',
          },
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role',
          required: false,
          maxLength: 100,
          admin: {
            description: 'Optional role or title',
          },
        },
        {
          name: 'showDivider',
          type: 'checkbox',
          label: 'Show Divider',
          defaultValue: false,
          admin: {
            description: 'Display visual divider above/below quote',
          },
        },
      ],
    },
    {
      name: 'iconList',
      type: 'array',
      label: 'Icon List',
      required: false,
      maxRows: 6,
      admin: {
        description: 'List of features or benefits with icons (max 6 items)',
      },
      fields: [
        {
          name: 'iconTag',
          type: 'text',
          label: 'Icon Tag',
          required: false,
          admin: {
            description: 'Cloudinary public ID or icon identifier',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          maxLength: 80,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: false,
          maxLength: 200,
        },
      ],
    },

    // Visual & Layout
    {
      name: 'backgroundStyle',
      type: 'select',
      label: 'Background Style',
      required: false,
      defaultValue: 'minimal',
      options: [
        { label: 'Minimal (White)', value: 'minimal' },
        { label: 'Light Gray', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Image', value: 'image' },
        { label: 'Custom Color', value: 'customColor' },
        { label: 'Gradient', value: 'gradient' },
      ],
      admin: {
        description: 'Background treatment for the section',
      },
    },
    {
      name: 'backgroundColorCustom',
      type: 'text',
      label: 'Custom Background Color',
      required: false,
      admin: {
        description: 'Hex color with hash prefix (e.g., #1a2b3c)',
        placeholder: '#1a2b3c',
        condition: (data: any, siblingData: any) => {
          const style = siblingData?.backgroundStyle || data?.backgroundStyle
          return style === 'customColor'
        },
      },
    },
    {
      name: 'backgroundImagePublicId',
      type: 'text',
      label: 'Background Image Public ID',
      required: false,
      admin: {
        description: 'Cloudinary public ID for background image',
        placeholder: 'Project/ROD2301/photos/background-image',
        condition: (data: any, siblingData: any) => {
          const style = siblingData?.backgroundStyle || data?.backgroundStyle
          return style === 'image'
        },
      },
    },
    {
      name: 'gradientStyle',
      type: 'select',
      label: 'Gradient Style',
      required: false,
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Top to Bottom', value: 'topToBottom' },
        { label: 'Left to Right', value: 'leftToRight' },
        { label: 'Radial', value: 'radial' },
      ],
      admin: {
        description: 'Gradient direction and style',
        condition: (data: any, siblingData: any) => {
          const style = siblingData?.backgroundStyle || data?.backgroundStyle
          return style === 'gradient'
        },
      },
    },
    {
      name: 'frostedGlass',
      type: 'checkbox',
      label: 'Frosted Glass Effect',
      defaultValue: false,
      admin: {
        description: 'Apply frosted glass (backdrop blur) effect to content container',
      },
    },
    {
      name: 'textColorScheme',
      type: 'select',
      label: 'Text Color Scheme',
      required: false,
      defaultValue: 'auto',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      admin: {
        description: 'Text color scheme (auto adapts to background)',
      },
    },
    {
      name: 'maxWidth',
      type: 'select',
      label: 'Max Width',
      required: false,
      defaultValue: 'standard',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Standard', value: 'standard' },
        { label: 'Wide', value: 'wide' },
      ],
      admin: {
        description: 'Maximum content width',
      },
    },
    {
      name: 'paddingSize',
      type: 'select',
      label: 'Padding Size',
      required: false,
      defaultValue: 'standard',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Standard', value: 'standard' },
        { label: 'Spacious', value: 'spacious' },
      ],
      admin: {
        description: 'Vertical padding for the section',
      },
    },

    // Interaction & Motion
    {
      name: 'animation',
      type: 'select',
      label: 'Animation',
      required: false,
      defaultValue: 'fadeIn',
      options: [
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide Up', value: 'slideUp' },
        { label: 'Parallax', value: 'parallax' },
        { label: 'None', value: 'none' },
      ],
      admin: {
        description: 'Entrance animation style',
      },
    },
    {
      name: 'animationDelay',
      type: 'number',
      label: 'Animation Delay (ms)',
      required: false,
      defaultValue: 0,
      min: 0,
      max: 2000,
      admin: {
        description: 'Delay before animation starts (milliseconds)',
      },
    },
    {
      name: 'animationDuration',
      type: 'number',
      label: 'Animation Duration (ms)',
      required: false,
      defaultValue: 600,
      min: 200,
      max: 2000,
      admin: {
        description: 'Animation duration (milliseconds)',
      },
    },
    {
      name: 'parallaxIntensity',
      type: 'number',
      label: 'Parallax Intensity',
      required: false,
      defaultValue: 0.5,
      min: 0,
      max: 1,
      admin: {
        description: 'Parallax effect intensity (0 = subtle, 1 = strong)',
        condition: (data: any, siblingData: any) => {
          const anim = siblingData?.animation || data?.animation
          return anim === 'parallax'
        },
      },
    },

    // Project & CTA
    {
      name: 'projectLocation',
      type: 'text',
      label: 'Project Location',
      required: false,
      maxLength: 100,
      admin: {
        description: 'Geographic location for project context',
      },
    },
    {
      name: 'projectDate',
      type: 'date',
      label: 'Project Date',
      required: false,
      admin: {
        description: 'Project completion or publication date',
      },
    },
    {
      name: 'projectCategory',
      type: 'text',
      label: 'Project Category',
      required: false,
      maxLength: 60,
      admin: {
        description: 'Project type or category',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      admin: {
        description: 'Optional CTA button',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          required: false,
          maxLength: 40,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
          required: false,
          admin: {
            description: 'Absolute or relative URL',
          },
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          required: false,
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Link Only', value: 'linkOnly' },
          ],
        },
        {
          name: 'ctaIcon',
          type: 'text',
          label: 'CTA Icon',
          required: false,
          admin: {
            description: 'Optional icon identifier or Cloudinary public ID',
          },
        },
      ],
    },

    // Supporting Metadata
    {
      name: 'altTextOverride',
      type: 'text',
      label: 'Alt Text Override',
      required: false,
      maxLength: 200,
      admin: {
        description: 'Override default media alt text for accessibility',
      },
    },
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: false,
      admin: {
        description: 'Anchor ID for in-page linking (lowercase, hyphenated)',
        placeholder: 'my-section-id',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        const pattern = /^[a-z0-9-]+$/
        if (!pattern.test(value)) {
          return 'Section ID must contain only lowercase letters, numbers, and hyphens'
        }
        return true
      },
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Keywords',
      required: false,
      maxRows: 10,
      admin: {
        description: 'SEO and content keywords (max 10)',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Keyword',
          required: false,
          maxLength: 60,
        },
      ],
    },
    {
      name: 'geoReference',
      type: 'text',
      label: 'Geographic Reference',
      required: false,
      maxLength: 100,
      admin: {
        description: 'Geographic metadata for local search optimization',
      },
    },
  ],
}

export default ContentSectionBlock

import { Block } from 'payload'

export const UniversalVideoPlayerBlock: Block = {
  slug: 'universalVideoPlayer',
  labels: {
    singular: 'Universal Video Player',
    plural: 'Universal Video Players',
  },
  fields: [
    // ===== GROUP 1: Core Media =====
    {
      name: 'videoPublicId',
      label: 'Video Public ID',
      type: 'text',
      required: true,
      admin: {
        description: 'Cloudinary public_id for the video asset (e.g., videos/client-story-001)',
        placeholder: 'videos/example-video',
      },
    },
    {
      name: 'posterPublicId',
      label: 'Poster Image Public ID',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional custom poster image public_id. Auto-generates from video first frame if empty.',
        placeholder: 'videos/poster-001',
      },
    },
    {
      name: 'ratio',
      label: 'Video Aspect Ratio',
      type: 'select',
      required: true,
      defaultValue: '9:16',
      options: [
        { label: 'Portrait (9:16)', value: '9:16' },
        { label: 'Widescreen (16:9)', value: '16:9' },
        { label: 'Cinematic (21:9)', value: '21:9' },
      ],
      admin: {
        description: 'Video aspect ratio - determines wrapper component',
      },
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'richText',
      required: false,
      admin: {
        description: 'Optional caption or description text with rich formatting support',
      },
    },
    {
      name: 'analyticsTag',
      label: 'Analytics Tag',
      type: 'text',
      required: false,
      admin: {
        description: "Custom event tracking label for analytics (e.g., 'hero-video', 'testimonial-001')",
        placeholder: 'hero-video',
      },
    },

    // ===== GROUP 2: Playback Behavior =====
    {
      name: 'startMuted',
      label: 'Start Muted',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Start video muted (required for autoplay compliance on mobile)',
      },
    },
    {
      name: 'autoplay',
      label: 'Autoplay',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Auto-play video when visible in viewport (muted autoplay only)',
      },
    },
    {
      name: 'loopPreview',
      label: 'Loop Preview',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Play a short muted loop preview (3-4 seconds) before user interaction',
      },
    },
    {
      name: 'hoverPreview',
      label: 'Hover Preview',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable hover-to-preview on desktop (fine pointer devices only)',
      },
    },
    {
      name: 'controlsVariant',
      label: 'Controls Variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Minimal', value: 'minimal' },
      ],
      admin: {
        description: 'Video controls display style',
      },
    },
    {
      name: 'startTime',
      label: 'Start Time (seconds)',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Start playback at N seconds into the video',
        step: 0.1,
      },
    },
    {
      name: 'previewDurationSec',
      label: 'Preview Duration (seconds)',
      type: 'number',
      defaultValue: 3,
      min: 0.5,
      max: 5.0,
      admin: {
        description: 'Duration of loop preview in seconds (0.5 to 5.0)',
        step: 0.5,
        condition: (data: any, siblingData: any) => {
          const loopPreview = siblingData?.loopPreview ?? data?.loopPreview
          return loopPreview === true
        },
      },
    },

    // ===== GROUP 3: Accessibility & Policy =====
    {
      name: 'reducedMotionOverride',
      label: 'Reduced Motion Override',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Force autoplay even when user has prefers-reduced-motion enabled (use sparingly)',
      },
    },
    {
      name: 'showNativeControls',
      label: 'Show Native Controls',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show browser native video controls (fallback safety for accessibility)',
      },
    },

    // ===== GROUP 4: UI Overlays =====
    {
      name: 'showShare',
      label: 'Show Share Button',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display share button overlay on video',
      },
    },
    {
      name: 'showCTAOnEnd',
      label: 'Show CTA On End',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show call-to-action overlay when video ends',
      },
    },
    {
      name: 'ctaLabel',
      label: 'CTA Button Text',
      type: 'text',
      required: false,
      maxLength: 40,
      admin: {
        description: 'CTA button text (required if Show CTA On End is enabled)',
        placeholder: 'Learn More',
        condition: (data: any, siblingData: any) => {
          const showCTA = siblingData?.showCTAOnEnd ?? data?.showCTAOnEnd
          return showCTA === true
        },
      },
    },
    {
      name: 'ctaHref',
      label: 'CTA Link URL',
      type: 'text',
      required: false,
      admin: {
        description: 'CTA button link URL (absolute or relative)',
        placeholder: '/contact',
        condition: (data: any, siblingData: any) => {
          const showCTA = siblingData?.showCTAOnEnd ?? data?.showCTAOnEnd
          return showCTA === true
        },
      },
    },
    {
      name: 'watermarkOverlay',
      label: 'Watermark Overlay',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional watermark text or Cloudinary public_id for overlay logo',
        placeholder: 'logos/brand-watermark',
      },
    },

    // ===== GROUP 5: Cinematic / Luxury (Collapsible Group) =====
    {
      name: 'cinematicFeatures',
      type: 'group',
      label: 'Cinematic Features (Phase 2)',
      admin: {
        description: 'Advanced visual enhancements - optional luxury features',
      },
      fields: [
        {
          name: 'enableCinematicReveal',
          label: 'Enable Cinematic Reveal',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable brand-tinted fade and blur transitions on play/pause',
          },
        },
        {
          name: 'enablePosterOpticalMatch',
          label: 'Enable Poster Optical Match',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Crossfade poster seamlessly into first video frame (optical continuity)',
          },
        },
        {
          name: 'enableAmbientGlow',
          label: 'Enable Ambient Glow',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Sample dominant frame color and tint page background during playback',
          },
        },
        {
          name: 'enableSpecularHighlight',
          label: 'Enable Specular Highlight',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Dynamic highlight following cursor or touch movement',
          },
        },
        {
          name: 'hdrPreferred',
          label: 'HDR Preferred',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Deliver HDR (HEVC/AVIF) streams when supported (auto-fallback to SDR)',
          },
        },
      ],
    },

    // ===== GROUP 6: Advanced Tuning (Admin-Only / Hidden Fields) =====
    {
      name: 'advancedTuning',
      type: 'group',
      label: 'Advanced Tuning',
      admin: {
        description: 'Advanced configuration options for fine-tuning (admin-only)',
      },
      fields: [
        {
          name: 'ioThresholdAutoplay',
          label: 'Intersection Threshold - Autoplay',
          type: 'number',
          defaultValue: 0.5,
          min: 0,
          max: 1,
          admin: {
            description: 'Intersection observer threshold for autoplay trigger (0-1)',
            step: 0.1,
          },
        },
        {
          name: 'ioThresholdPause',
          label: 'Intersection Threshold - Pause',
          type: 'number',
          defaultValue: 0.25,
          min: 0,
          max: 1,
          admin: {
            description: 'Intersection observer threshold for auto-pause (0-1)',
            step: 0.1,
          },
        },
        {
          name: 'networkPolicy',
          label: 'Network Quality Policy',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto', value: 'auto' },
            { label: 'Eco (q_auto:eco)', value: 'eco' },
            { label: 'Low (q_auto:low)', value: 'low' },
          ],
          admin: {
            description: 'Cloudinary quality optimization policy',
          },
        },
        {
          name: 'maxWidthClamp',
          label: 'Max Width Clamp (px)',
          type: 'number',
          required: false,
          min: 320,
          max: 3840,
          admin: {
            description: 'Maximum video width in pixels (optional constraint for widescreen)',
            placeholder: '1920',
          },
        },
      ],
    },

    // ===== GROUP 7: Background Options =====
    {
      name: 'backgroundType',
      label: 'Background Type',
      type: 'select',
      required: true,
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Image', value: 'image' },
      ],
      admin: {
        description: 'Background style for video section',
      },
    },
    {
      name: 'customBackgroundColor',
      label: 'Custom Background Color',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional hex color override (e.g., #1a2b3c)',
        placeholder: '#1a2b3c',
        condition: (data: any, siblingData: any) => {
          const bgType = siblingData?.backgroundType ?? data?.backgroundType
          return bgType === 'light' || bgType === 'dark'
        },
      },
    },
    {
      name: 'backgroundImagePublicId',
      label: 'Background Image Public ID',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary public_id for background image',
        placeholder: 'backgrounds/video-bg.jpg',
        condition: (data: any, siblingData: any) => {
          const bgType = siblingData?.backgroundType ?? data?.backgroundType
          return bgType === 'image'
        },
      },
    },
  ],
}

export default UniversalVideoPlayerBlock

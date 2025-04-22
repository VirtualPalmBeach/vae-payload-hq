import { validateUrl } from '../shared/validate';

const performanceFields = [
  {
    name: 'performance',
    type: 'group',
    label: 'Performance & Caching',
    fields: [
      {
        name: 'lazyLoadImages',
        label: 'Lazy Load Images',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description: 'Improve performance by delaying off-screen image loads',
        },
      },
      {
        name: 'lazyLoadThreshold',
        label: 'Lazy Load Threshold',
        type: 'number',
        defaultValue: 200,
        admin: {
          description: 'Distance from viewport (in px) before image loads',
          condition: (_, siblingData) => siblingData?.lazyLoadImages === true,
        },
      },
      {
        name: 'enableImageCompression',
        label: 'Image Compression',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description: 'Automatically compress uploaded images',
        },
      },
      {
        name: 'imageCompressionQuality',
        label: 'Compression Quality',
        type: 'number',
        min: 1,
        max: 100,
        defaultValue: 80,
        admin: {
          description: '1 (low) to 100 (max quality)',
          condition: (_, siblingData) => siblingData?.enableImageCompression === true,
        },
      },
      {
        name: 'cacheControlMaxAge',
        label: 'Cache-Control Max Age (seconds)',
        type: 'number',
        defaultValue: 86400,
        admin: {
          description: 'For static asset cache headers',
        },
      },
      {
        name: 'enableHtmlMinification',
        label: 'HTML Minification',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'enableGzip',
        label: 'Enable Gzip Compression',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'enableBrotli',
        label: 'Enable Brotli Compression',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        name: 'cdnEnabled',
        label: 'Use CDN',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'cdnUrl',
        label: 'CDN Base URL',
        type: 'text',
        validate: (value) => validateUrl(value, { https: false }),
        admin: {
          condition: (_, siblingData) => siblingData?.cdnEnabled === true,
        },
      },
    ],
  },
];

export default {
  label: 'Performance',
  fields: navigationFields,
};
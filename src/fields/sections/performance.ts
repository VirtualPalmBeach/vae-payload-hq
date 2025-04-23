const performanceTab = {
  label: 'Performance',
  name: 'performance',
  fields: [
    {
      name: 'lazyLoadMedia',
      label: 'Enable Lazy Loading for Media',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'imageCompressionEnabled',
      label: 'Enable Image Compression',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'cacheControl',
      label: 'Cache-Control Header (e.g. max-age=31536000)',
      type: 'text',
    },
    {
      name: 'cdnBaseUrl',
      label: 'CDN Base URL',
      type: 'text',
    },
  ],
}

export default performanceTab

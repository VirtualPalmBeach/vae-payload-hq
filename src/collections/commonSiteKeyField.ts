export const commonSiteKeyField = {
    name: 'siteKey',
    label: 'Site Key',
    type: 'select',
    required: true,
    options: [
      { label: 'Selah Pools', value: 'selahPools' },
      { label: 'Selah Pro', value: 'selahPro' },
      { label: 'DFW Pool Builder', value: 'dfwPoolBuilder' },
      { label: 'Southlake Outdoor', value: 'southlakeOutdoor' },
      { label: 'Omega Pool Services', value: 'omegaPoolServices' },
    ],
    defaultValue: 'selahPro',
    admin: {
      position: 'sidebar',
    },
  };
  
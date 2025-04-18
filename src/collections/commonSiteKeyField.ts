import { SelectField } from 'payload';

export const commonSiteKeyField: SelectField = {
  name: 'siteKey',
  label: 'Site Key',
  type: 'select',
  options: [
    { label: 'Selah Pools', value: 'selahPools' },
    { label: 'Selah Pro', value: 'selahPro' },
    { label: 'DFW Pool Builder', value: 'dfwPoolBuilder' },
    { label: 'Southlake Outdoor', value: 'southlakeOutdoor' },
    { label: 'Omega Pool Services', value: 'omegaPoolServices' },
  ],
  defaultValue: 'selahPro',
  required: true,
  admin: { position: 'sidebar' },
};
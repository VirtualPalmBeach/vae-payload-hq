// src/collections/siteSettings.ts
import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';

const SiteSettings: CollectionConfig = {
  slug: 'siteSettings',
  admin: {
    group: 'Settings',
    useAsTitle: 'siteName',
  },
  access: {
    // make site settings publicly readable if you need them client‑side
    read: (): boolean => true,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'defaultSeo',
      label: 'Default SEO',
      type: 'group',
      fields: [
        { name: 'metaTitleSuffix', label: 'Title Suffix', type: 'text' },
        { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
      ],
    },
  ],
};

export default SiteSettings;

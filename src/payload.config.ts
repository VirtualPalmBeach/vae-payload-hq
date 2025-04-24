// src/payload.config.ts
import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

// Components
import DevModeBanner from './components/DevModeBanner';

// Field modules
import { timestampedFields } from './fields/timestampedFields';
import { optionalDisplayFields, visibilityField, featuredField, sortOrderField } from './fields/optionalFields';

// Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import Homepage from './collections/homepage';
import Projects from './collections/projects';
import Tags from './collections/tags';
import Categories from './collections/categories';
import { FAQs } from './collections/faqs';
import { Testimonials } from './collections/testimonials';
import { BlogPosts } from './collections/blogposts';
import ContactForm from './collections/contactform';
import Events from './collections/events';
import Gallery from './collections/gallery';
import LimitedTimeOffers from './collections/limitedtimeoffers';
import Locations from './collections/locations';
import Navigation from './collections/navigation';
import Team from './collections/team';
import Ads from './collections/ads';
import Pages from './collections/pages';
import Blocks from './collections/blocks';
import Redirects from './collections/redirects';
import Services from './collections/services';
import SiteSettings from './collections/siteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // components: {
    //   afterNavLinks: [DevModeBanner],
    // },
  },

  graphQL: {
    disablePlaygroundInProduction: false,
  },

  collections: [
    Users,
    Media,
    Homepage,
    Projects,
    Tags,
    Categories,
    BlogPosts,
    ContactForm,
    Events,
    FAQs,
    Gallery,
    LimitedTimeOffers,
    Locations,
    Navigation,
    Team,
    Testimonials,
    Ads,
    Pages,
    Blocks,
    Redirects,
    Services,
    SiteSettings,
  ],

  globals: [
    // SiteConfig, // remove or keep as needed — deprecated by SiteSettings?
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
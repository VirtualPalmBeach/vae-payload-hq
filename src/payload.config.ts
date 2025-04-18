// storage-adapter-import-placeholder
import SiteConfig from './globals/SiteConfig';
import { mongooseAdapter } from '@payloadcms/db-mongodb'; // database-adapter-import
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import Homepage from './collections/homepage';
import { FAQs } from './collections/faqs';
import { Testimonials } from './collections/testimonials';
import { BlogPosts } from './collections/blogposts';
import Ads from './collections/ads';
import Categories from './collections/categories';
import ContactForm from './collections/contactform';
import Events from './collections/events';
import Gallery from './collections/gallery';
import LimitedTimeOffers from './collections/limitedtimeoffers';
import Locations from './collections/locations';
import Navigation from './collections/navigation';
import Projects from './collections/projects';
import Tags from './collections/tags';
import Team from './collections/team';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Homepage,
    Ads,
    BlogPosts,
    Categories,
    ContactForm,
    Events,
    FAQs,
    Gallery,
    LimitedTimeOffers,
    Locations,
    Navigation,
    Projects,
    Tags,
    Team,
    Testimonials,
  ],
  globals: [SiteConfig],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});

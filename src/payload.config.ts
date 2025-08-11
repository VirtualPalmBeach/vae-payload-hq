// src/payload.config.ts
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
// Components
import DevModeBanner from './components/DevModeBanner'
// Field modules
import { timestampedFields } from './fields/timestampedFields'
import {
  optionalDisplayFields,
  visibilityField,
  featuredField,
  sortOrderField,
} from './fields/optionalFields'
// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Homepage from './collections/homepage'
import Projects from './collections/projects'
import Tags from './collections/tags'
import Categories from './collections/categories'
import { FAQs } from './collections/faqs'
import { Testimonials } from './collections/testimonials'
import { BlogPosts } from './collections/blogposts'
import ContactForm from './collections/contactform'
import Events from './collections/events'
import FormSubmissions from './collections/formsubmissions'
import Galleries from './collections/galleries'
import LimitedTimeOffers from './collections/limitedtimeoffers'
import Locations from './collections/locations'
import Navigation from './collections/navigation'
import Team from './collections/team'
import Videos from './collections/videos'
import Ads from './collections/ads'
import Pages from './collections/pages'
import Blocks from './collections/blocks'
import Redirects from './collections/redirects'
import Services from './collections/services'
import LandingPages from './collections/landingPages'
import SiteSettings from './collections/siteSettings'
import Reals from './collections/reals'
import Scenes from './collections/scenes'
import Spotlights from './collections/spotlights'
import PortfolioLanding from './collections/portfolioLanding'
import PortfolioProjects from './collections/portfolioProjects'
import Journeys from './collections/journeys'
import About from './collections/About'
import SignatureServices from './collections/SignatureServices'
import ContactPage from './collections/ContactPage'
import RealsIndex from './collections/RealsIndex'
import journeysLanding from './collections/journeysLanding'
import AnswersLanding from './collections/answersLanding'
import AnswersEntries from './collections/answersEntries'
import GalleriesIndex from './collections/galleriesIndex'
import FooterNavigation from './collections/footerNavigation'
import SeoEntries from './collections/seoEntries'
import ServiceAreas from './collections/serviceAreas'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export default buildConfig({
  cors: [
    'https://vae-payload-hq.payloadcms.app',
    'https://selah.pro',
    'https://www.selah.pro',
    'https://selahpools.com',
    'https://www.selahpools.com',
    'https://selah-pro-catalyst-4mfx8xe65-selah-designs-projects.vercel.app',
    'https://selah-pro-catalyst-le0l93e6z-selah-designs-projects.vercel.app',
    'http://localhost:3000',
    'http://192.168.5.245:3000',
    'http://localhost:3001',
    'http://192.168.5.245:3001',
  ],
  csrf: [
    'https://vae-payload-hq.payloadcms.app',
    'https://selah.pro',
    'https://www.selah.pro',
    'https://selahpools.com',
    'https://www.selahpools.com',
    'https://selah-pro-catalyst-4mfx8xe65-selah-designs-projects.vercel.app',
    'https://selah-pro-catalyst-le0l93e6z-selah-designs-projects.vercel.app',
    'http://localhost:3000',
    'http://192.168.5.245:3000',
    'http://localhost:3001',
    'http://192.168.5.245:3001',
  ],
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
    About,
    Ads,
    AnswersLanding,
    AnswersEntries,
    Blocks,
    BlogPosts,
    Categories,
    ContactForm,
    ContactPage,
    Events,
    FAQs,
    FooterNavigation,
    FormSubmissions,
    Galleries,
    GalleriesIndex,
    Homepage,
    Journeys,
    journeysLanding,
    LandingPages,
    LimitedTimeOffers,
    Locations,
    Media,
    Navigation,
    Pages,
    PortfolioLanding,
    PortfolioProjects,
    Projects,
    Reals,
    RealsIndex,
    Redirects,
    Scenes,
    SeoEntries,
    ServiceAreas,
    Services,
    SignatureServices,
    SiteSettings,
    Spotlights,
    Tags,
    Team,
    Testimonials,
    Users,
    Videos,
  ],
  globals: [],
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
})

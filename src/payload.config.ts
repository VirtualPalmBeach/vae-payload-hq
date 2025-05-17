// src/payload.config.ts
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

// Components
import DevModeBanner from "./components/DevModeBanner";

// Field modules
import { timestampedFields } from "./fields/timestampedFields";
import {
  optionalDisplayFields,
  visibilityField,
  featuredField,
  sortOrderField,
} from "./fields/optionalFields";

// Collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import Homepage from "./collections/homepage";
import Projects from "./collections/projects";
import Tags from "./collections/tags";
import Categories from "./collections/categories";
import { FAQs } from "./collections/faqs";
import { Testimonials } from "./collections/testimonials";
import { BlogPosts } from "./collections/blogposts";
import ContactForm from "./collections/contactform";
import Events from "./collections/events";
import Gallery from "./collections/gallery";
import LimitedTimeOffers from "./collections/limitedtimeoffers";
import Locations from "./collections/locations";
import Navigation from "./collections/navigation";
import Team from "./collections/team";
import Ads from "./collections/ads";
import Pages from "./collections/pages";
import Blocks from "./collections/blocks";
import Redirects from "./collections/redirects";
import Services from "./collections/services";
import LandingPages from "./collections/landingPages";
import SiteSettings from "./collections/siteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Revalidation webhook configuration
const REVALIDATION_ENABLED = process.env.ENABLE_REVALIDATION === "true";
const REVALIDATION_URLS = {
  // Add more site keys and their respective revalidation URLs as needed
  dfwPoolBuilder: process.env.DFW_POOL_BUILDER_REVALIDATION_URL,
  // example: anotherSite: process.env.ANOTHER_SITE_REVALIDATION_URL,
};
const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN;

// Global hook for site revalidation
const triggerRevalidation = async ({ doc, collection, operation }) => {
  try {
    // Skip if revalidation is disabled
    if (!REVALIDATION_ENABLED) return;

    // Get the siteKey from the document
    const siteKey = doc.siteKey;

    // Skip if no siteKey or no revalidation URL for this siteKey
    if (!siteKey || !REVALIDATION_URLS[siteKey]) return;

    const revalidationUrl = REVALIDATION_URLS[siteKey];

    // Skip if revalidation URL is not set
    if (!revalidationUrl || !REVALIDATION_TOKEN) {
      console.log(
        `Revalidation skipped: missing URL or token for siteKey: ${siteKey}`
      );
      return;
    }

    // Append token as query parameter
    const urlWithToken = `${revalidationUrl}?token=${REVALIDATION_TOKEN}`;

    // Send webhook request to the revalidation endpoint using native fetch
    const response = await fetch(urlWithToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collection: collection.slug,
        operation,
        doc,
      }),
    });

    console.log(
      `Revalidation triggered for ${siteKey}: ${response.status} ${response.statusText}`
    );
  } catch (error) {
    console.error(
      `Revalidation error for ${doc.siteKey || "unknown site"}:`,
      error.message
    );
  }
};

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
    LandingPages,
    SiteSettings,
  ],
  globals: [
    // SiteConfig, // remove or keep as needed — deprecated by SiteSettings?
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  hooks: {
    afterChange: [triggerRevalidation],
    afterCreate: [triggerRevalidation],
    afterDelete: [triggerRevalidation],
  },
});

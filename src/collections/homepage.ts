import { CollectionConfig } from "payload/types";

const Homepage: CollectionConfig = {
  slug: "homepage",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "introText",
      type: "textarea",
      required: false,
    },
    {
      name: "ctaText",
      type: "text",
      required: false,
    },

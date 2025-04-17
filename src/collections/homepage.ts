export const Homepage = {
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
    {
      name: "ctaLink",
      type: "text",
      required: false,
    }
  ],
};

import { Block } from 'payload'

export const RatingBandBlock: Block = {
  slug: 'ratingBand',
  labels: {
    singular: 'Rating Band',
    plural: 'Rating Bands',
  },
  fields: [
    {
      name: 'rating',
      type: 'number',
      required: true,
      defaultValue: 4.9,
      min: 0,
      max: 5,
      admin: {
        description: 'Average rating (0-5, one decimal precision)',
        step: 0.1,
      },
    },
    {
      name: 'source',
      type: 'text',
      required: true,
      defaultValue: 'Ratings & Reviews',
      admin: {
        description: 'Review source name (e.g., "Ratings & Reviews")',
      },
    },
    {
      name: 'platforms',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional platforms line (e.g., "(Houzz, Home Advisor, BBB, Google Reviews)")',
      },
    },
    {
      name: 'reviewCount',
      type: 'number',
      required: false,
      defaultValue: 125,
      min: 0,
      admin: {
        description: 'Total number of reviews (whole number)',
      },
    },
  ],
}

export default RatingBandBlock

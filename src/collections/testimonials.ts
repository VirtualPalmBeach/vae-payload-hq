import { CollectionConfig } from 'payload';
import { commonSiteKeyField } from './commonSiteKeyField';
import { isAdmin, isAdminOrDesigner } from '../access/helpers';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    group: 'Content',
  },
  access: {
    read: () => true,
    create: isAdminOrDesigner,
    update: isAdminOrDesigner,
    delete: isAdmin,
  },
  fields: [
    commonSiteKeyField,
    {
      name: 'quote',
      label: 'Testimonial Quote',
      type: 'textarea',
      required: true,
      maxLength: 500,
      admin: {
        description: 'Testimonial content (recommended: 300-500 characters for optimal display)',
      },
    },
    {
      name: 'author',
      label: 'Author Name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
    },
    {
      name: 'rating',
      label: 'Rating (1–5)',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'authorImagePublicId',
      label: 'Author Image Public ID',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary public_id for author headshot (e.g., testimonials/john-doe.jpg)',
        placeholder: 'testimonials/author-headshot.jpg',
      },
    },
    {
      name: 'projectCode',
      label: 'Project Code',
      type: 'text',
      required: false,
      admin: {
        description: 'Reference code for related project',
        placeholder: 'ABC1234',
      },
    },
    {
      name: 'title',
      label: 'Title/Role',
      type: 'text',
      required: false,
      admin: {
        description: 'Job title or role (e.g., "Homeowner", "Project Manager")',
        placeholder: 'Homeowner',
      },
    },
    {
      name: 'isFeatured',
      label: 'Featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as featured testimonial for special display',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Control visibility - uncheck to hide from display',
        position: 'sidebar',
      },
    },
    {
      name: 'hasVideoTestimonial',
      label: 'Has Video Testimonial',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Indicates if this testimonial includes video content',
        position: 'sidebar',
      },
    },
  ],
};

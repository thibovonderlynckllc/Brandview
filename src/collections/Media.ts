import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'alt', 'tags', 'updatedAt'],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
    listSearchableFields: ['name', 'alt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Give this media a descriptive name for easy searching and identification.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility (used by screen readers).',
      },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Services', value: 'services' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Portfolio - Business', value: 'portfolio-business' },
        { label: 'Portfolio - Corporate Events', value: 'portfolio-corporate-events' },
        { label: 'Portfolio - Food', value: 'portfolio-food' },
        { label: 'Portfolio - Portraits', value: 'portfolio-portraits' },
        { label: 'Portfolio - Products', value: 'portfolio-products' },
        { label: 'Portfolio - Short Content', value: 'portfolio-short-content' },
      ],
      admin: {
        description: 'Select which page(s) this media belongs to. You can select multiple pages.',
      },
    },
  ],
  upload: true,
};

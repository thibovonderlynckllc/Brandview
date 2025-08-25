import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'page', 'updatedAt'],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
    listSearchableFields: ['name', 'page'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Use this name to search and organize your media (e.g., "home-bannerpic", "services-hero")',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Descriptive text for accessibility and SEO (e.g., "Hero banner showing our photography studio")',
      },
    },
    {
      name: 'page',
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
        { label: 'Portfolio - Short content', value: 'portfolio-short-content' },
        { label: 'About us', value: 'about-us' },
        { label: 'Our packages', value: 'our-packages' },
        { label: 'Contact', value: 'contact' },
      ],
      admin: {
        description: 'Select which page(s) this media belongs to. You can select multiple pages.',
      },
    },
  ],
  upload: true,
};

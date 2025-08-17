import type { CollectionConfig } from 'payload';
import { revalidateHook } from '../lib/revalidate-hook';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateHook],
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'tags', 'updatedAt'],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
    listSearchableFields: ['alt', 'customTags'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Business', value: 'business' },
        { label: 'Corporate Events', value: 'corporate-events' },
        { label: 'Food', value: 'food' },
        { label: 'Portraits', value: 'portraits' },
        { label: 'Products', value: 'products' },
        { label: 'Short Content', value: 'short-content' },
        { label: 'Icons', value: 'icons' },
        { label: 'Banners', value: 'banners' },
        { label: 'Decorative', value: 'decorative' },
      ],
      admin: {
        description: 'Tag this media to organize by gallery type or purpose. You can select multiple tags.',
      },
    },
    {
      name: 'customTags',
      type: 'text',
      admin: {
        description: 'Add custom tags separated by commas (e.g., "outdoor, summer, campaign")',
      },
    },
  ],
  upload: true,
};

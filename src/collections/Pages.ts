import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for this page (e.g., "homepage", "about", "services", "portfolio")',
      },
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        // Homepage specific fields
        {
          name: 'heroText',
          type: 'textarea',
          label: 'Hero Text',
          admin: {
            description: 'Main description text on the homepage',
            condition: (data) => data.slug === 'homepage',
          },
        },
        {
          name: 'portfolioItems',
          type: 'array',
          label: 'Portfolio Items',
          admin: {
            description: 'Portfolio cards displayed on the homepage',
            condition: (data) => data.slug === 'homepage',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Card title (e.g., "short content", "food", "portraits", "business")',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              admin: {
                description: 'URL path (e.g., "short-content", "food")',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Path to SVG icon (optional)',
              },
            },
          ],
        },

        // Services page specific fields
        {
          name: 'servicesHeroTitle',
          type: 'text',
          label: 'Services Hero Title',
          admin: {
            description: 'Main title in the hero section',
            condition: (data) => data.slug === 'services',
          },
        },
        {
          name: 'servicesHeroSubtitle',
          type: 'text',
          label: 'Services Hero Subtitle',
          admin: {
            description: 'Subtitle text below the main title',
            condition: (data) => data.slug === 'services',
          },
        },
        {
          name: 'serviceItems',
          type: 'array',
          label: 'Service Items',
          admin: {
            description: 'Individual service sections',
            condition: (data) => data.slug === 'services',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Service title (e.g., "short content", "food photography")',
              },
            },
            {
              name: 'subtitle',
              type: 'text',
              admin: {
                description: 'Service subtitle (optional)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Service description text',
              },
            },
            {
              name: 'portfolioSlug',
              type: 'text',
              required: true,
              admin: {
                description: 'Portfolio page slug (e.g., "short-content", "food")',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Path to decorative icon (optional)',
              },
            },
            {
              name: 'iconPosition',
              type: 'select',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Top Left', value: 'top-left' },
                { label: 'Top Right', value: 'top-right' },
              ],
              defaultValue: 'none',
              admin: {
                description: 'Position of the decorative icon',
              },
            },
          ],
        },
        {
          name: 'ratesTitle',
          type: 'text',
          label: 'Rates Section Title',
          admin: {
            description: 'Title for the rates section',
            condition: (data) => data.slug === 'services',
          },
        },
        {
          name: 'ratesDescription',
          type: 'textarea',
          label: 'Rates Section Description',
          admin: {
            description: 'Description text for the rates section',
            condition: (data) => data.slug === 'services',
          },
        },

        // Portfolio page specific fields
        {
          name: 'portfolioCategories',
          type: 'array',
          label: 'Portfolio Categories',
          admin: {
            description: 'Portfolio category cards displayed on the portfolio page',
            condition: (data) => data.slug === 'portfolio',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Category title (e.g., "business", "food", "portraits")',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              admin: {
                description: 'URL path (e.g., "business", "food", "portraits")',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Path to SVG icon (optional)',
              },
            },
            {
              name: 'hasIcon',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Whether this category should display an icon',
              },
            },
          ],
        },
      ],
    },
  ],
};

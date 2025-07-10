import { CollectionConfig } from 'payload';

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true, // Allow public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Portfolio category title (e.g., "Food Photography", "Business")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug for this portfolio (e.g., "food", "business")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of this portfolio category',
      },
    },
    // Visual Grid Layout - matching your masonry structure
    {
      name: 'galleryGrid',
      type: 'group',
      label: 'Gallery Grid Layout (32 positions)',
      admin: {
        description: 'Visual grid matching your website layout. Numbers correspond to positions in the masonry grid.',
      },
      fields: [
        // Row 1 (positions 1-3)
        {
          name: 'row1',
          type: 'group',
          label: 'Row 1 (Positions 1-3)',
          fields: [
            {
              name: 'position1',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 1 - Large image (600px height)',
              },
            },
            {
              name: 'position2',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 2 - Large image (600px height)',
              },
            },
            {
              name: 'position3',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 3 - Medium image (400px height)',
              },
            },
          ],
        },
        // Row 2 (positions 4-6)
        {
          name: 'row2',
          type: 'group',
          label: 'Row 2 (Positions 4-6)',
          fields: [
            {
              name: 'position4',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 4 - Large image (600px height)',
              },
            },
            {
              name: 'position5',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 5 - Medium image (400px height)',
              },
            },
            {
              name: 'position6',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 6 - Large image (600px height)',
              },
            },
          ],
        },
        // Row 3 (positions 7-9)
        {
          name: 'row3',
          type: 'group',
          label: 'Row 3 (Positions 7-9)',
          fields: [
            {
              name: 'position7',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 7 - Medium image (400px height)',
              },
            },
            {
              name: 'position8',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 8 - Large image (600px height)',
              },
            },
            {
              name: 'position9',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 9 - Large image (600px height)',
              },
            },
          ],
        },
        // Row 4 (positions 10-11)
        {
          name: 'row4',
          type: 'group',
          label: 'Row 4 (Positions 10-11)',
          fields: [
            {
              name: 'position10',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 10 - Large image (600px height)',
              },
            },
            {
              name: 'position11',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 11 - Large image (600px height)',
              },
            },
          ],
        },
        // Row 5 (positions 12-13)
        {
          name: 'row5',
          type: 'group',
          label: 'Row 5 (Positions 12-13)',
          fields: [
            {
              name: 'position12',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 12 - Large image (600px height)',
              },
            },
            {
              name: 'position13',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 13 - Large image (600px height)',
              },
            },
          ],
        },
        // Row 6 (positions 14-16)
        {
          name: 'row6',
          type: 'group',
          label: 'Row 6 (Positions 14-16)',
          fields: [
            {
              name: 'position14',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 14 - Large image (600px height)',
              },
            },
            {
              name: 'position15',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 15 - Medium image (400px height)',
              },
            },
            {
              name: 'position16',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 16 - Medium image (400px height)',
              },
            },
          ],
        },
        // Row 7 (positions 17-21)
        {
          name: 'row7',
          type: 'group',
          label: 'Row 7 (Positions 17-21)',
          fields: [
            {
              name: 'position17',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 17 - Large image (600px height)',
              },
            },
            {
              name: 'position18',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 18 - Large image (600px height)',
              },
            },
            {
              name: 'position19',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 19 - Large image (600px height)',
              },
            },
            {
              name: 'position20',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 20 - Large image (600px height)',
              },
            },
            {
              name: 'position21',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 21 - Large image (600px height)',
              },
            },
          ],
        },
        // Row 8 (positions 22-23)
        {
          name: 'row8',
          type: 'group',
          label: 'Row 8 (Positions 22-23)',
          fields: [
            {
              name: 'position22',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 22 - Large image (600px height)',
              },
            },
            {
              name: 'position23',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 23 - Large image (600px height)',
              },
            },
          ],
        },
        // Row 9 (positions 24-26)
        {
          name: 'row9',
          type: 'group',
          label: 'Row 9 (Positions 24-26)',
          fields: [
            {
              name: 'position24',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 24 - Large image (600px height)',
              },
            },
            {
              name: 'position25',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 25 - Medium image (400px height)',
              },
            },
            {
              name: 'position26',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 26 - Medium image (400px height)',
              },
            },
          ],
        },
        // Row 10 (positions 27-29)
        {
          name: 'row10',
          type: 'group',
          label: 'Row 10 (Positions 27-29)',
          fields: [
            {
              name: 'position27',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 27 - Large image (600px height)',
              },
            },
            {
              name: 'position28',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 28 - Large image (600px height)',
              },
            },
            {
              name: 'position29',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 29 - Large image (600px height)',
              },
            },
          ],
        },
        // Row 11 (positions 30-32)
        {
          name: 'row11',
          type: 'group',
          label: 'Row 11 (Positions 30-32)',
          fields: [
            {
              name: 'position30',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 30 - Large image (600px height)',
              },
            },
            {
              name: 'position31',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 31 - Large image (600px height)',
              },
            },
            {
              name: 'position32',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 32 - Large image (600px height)',
              },
            },
          ],
        },
      ],
    },
    // Decorative elements
    {
      name: 'decorativeElements',
      type: 'group',
      label: 'Decorative Icons & Elements',
      fields: [
        {
          name: 'icon1',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'First decorative icon (SVG recommended)',
          },
        },
        {
          name: 'icon1Position',
          type: 'text',
          admin: {
            description: 'CSS classes for icon 1 position (e.g., "absolute -bottom-35 -right-34 rotate-10 z-10")',
          },
        },
        {
          name: 'icon2',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Second decorative icon (optional)',
          },
        },
        {
          name: 'icon2Position',
          type: 'text',
          admin: {
            description: 'CSS classes for icon 2 position',
          },
        },
        {
          name: 'icon3',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Third decorative icon (optional)',
          },
        },
        {
          name: 'icon3Position',
          type: 'text',
          admin: {
            description: 'CSS classes for icon 3 position',
          },
        },
      ],
    },
    // Banner image
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Banner image displayed at the bottom of the portfolio page',
      },
    },
  ],
};

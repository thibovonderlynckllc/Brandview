import { CollectionConfig } from 'payload';

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    pagination: {
      defaultLimit: 10,
      limits: [5, 10, 20, 50],
    },
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
      name: 'portfolioType',
      type: 'select',
      required: true,
      options: [
        { label: 'Business Photography', value: 'business' },
        { label: 'Food Photography', value: 'food' },
        { label: 'Portraits', value: 'portraits' },
        { label: 'Products', value: 'products' },
        { label: 'Short Content', value: 'short-content' },
        { label: 'Corporate Events', value: 'corporate-events' },
      ],
      admin: {
        description: 'Type of portfolio - determines available decorative elements',
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
      label: 'Gallery Grid Layout (23 positions)',
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
                description: 'Position 1 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position2',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 2 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position3',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 3 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
                description: 'Position 4 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position5',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 5 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position6',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 6 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
                description: 'Position 7 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position8',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 8 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position9',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 9 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
                description: 'Position 10 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position11',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 11 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
                description: 'Position 12 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position13',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 13 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
                description: 'Position 14 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position15',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 15 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position16',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 16 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
                description: 'Position 17 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position18',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 18 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position19',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 19 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position20',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 20 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position21',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 21 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
                description: 'Position 22 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
              },
            },
            {
              name: 'position23',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Position 23 - Upload image (WebP, JPG, PNG) or video (WebM, MP4, MOV)',
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
      admin: {
        description: 'Decorative icons that appear at specific positions in the portfolio layout. Works for all portfolio types.',
      },
      fields: [
        {
          name: 'icon1',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'First decorative icon - positioned in first masonry section (position 2)',
          },
        },
        {
          name: 'icon2',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Second decorative icon - positioned in custom layout section (position 11)',
          },
        },
        {
          name: 'icon3',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Third decorative icon - positioned in final masonry section (position 31)',
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

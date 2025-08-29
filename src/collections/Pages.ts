import { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug for this page (e.g., "home", "services")',
      },
    },
    // Conditional fields based on page type
    {
      name: 'pageType',
      type: 'select',
      required: true,
      options: [
        { label: 'Home Page', value: 'home' },
        { label: 'Services Page', value: 'services' },
        { label: 'Portfolio Page', value: 'portfolio' },
        { label: 'About Page', value: 'about' },
        { label: 'Rates Page', value: 'rates' },
        { label: 'Contact Page', value: 'contact' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Select the type of page to show relevant fields',
      },
    },
    // Home Page Fields
    {
      name: 'heroText',
      type: 'textarea',
      admin: {
        description: 'Main text displayed on the homepage',
        condition: (data) => data.pageType === 'home',
      },
    },
    {
      name: 'serviceCards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional decorative icon (e.g., camera icon)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for the service card',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'URL or path this card should link to (e.g., /portfolio/portraits)',
          },
        },
      ],
      defaultValue: [
        {
          title: 'short content',
          link: '/portfolio/short-content',
        },
        {
          title: 'food',
          link: '/portfolio/food',
        },
        {
          title: 'portraits',
          link: '/portfolio/portraits',
        },
        {
          title: 'business',
          link: '/portfolio/business',
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'home',
        description: 'Service cards displayed on the homepage - easily editable titles and links',
      },
    },
    {
      name: 'masonryGalleryGrid',
      type: 'group',
      label: 'Masonry Gallery Grid (18 positions)',
      admin: {
        description: 'Visual grid for the homepage masonry layout. Numbers correspond to positions in the grid.',
        condition: (data) => data.pageType === 'home',
      },
      fields: [
        {
          name: 'position1',
          type: 'group',
          admin: { description: 'Position 1' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position2',
          type: 'group',
          admin: { description: 'Position 2' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position3',
          type: 'group',
          admin: { description: 'Position 3' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position4',
          type: 'group',
          admin: { description: 'Position 4' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position5',
          type: 'group',
          admin: { description: 'Position 5' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position6',
          type: 'group',
          admin: { description: 'Position 6' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position7',
          type: 'group',
          admin: { description: 'Position 7' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position8',
          type: 'group',
          admin: { description: 'Position 8' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position9',
          type: 'group',
          admin: { description: 'Position 9' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position10',
          type: 'group',
          admin: { description: 'Position 10' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position11',
          type: 'group',
          admin: { description: 'Position 11' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position12',
          type: 'group',
          admin: { description: 'Position 12' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position13',
          type: 'group',
          admin: { description: 'Position 13' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position14',
          type: 'group',
          admin: { description: 'Position 14' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position15',
          type: 'group',
          admin: { description: 'Position 15' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position16',
          type: 'group',
          admin: { description: 'Position 16' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position17',
          type: 'group',
          admin: { description: 'Position 17' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
        {
          name: 'position18',
          type: 'group',
          admin: { description: 'Position 18' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Background image' } },
            { name: 'text', type: 'text', admin: { description: 'Text overlay (optional)' } },
            { name: 'link', type: 'text', admin: { description: 'Link destination (optional, e.g., /portfolio/portraits)' } },
          ],
        },
      ],
    },
    // Portfolio Page Fields
    {
      name: 'portfolioCards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Portfolio category title (e.g., "business", "portraits")',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: 'URL slug for this portfolio category (e.g., "business", "short-content")',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional decorative icon (like camera icon for products)',
          },
        },
        {
          name: 'iconPosition',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Top Right', value: 'top-right' },
          ],
          defaultValue: 'none',
          admin: {
            description: 'Position of the decorative icon',
          },
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'portfolio',
        description: 'Portfolio category cards displayed in a grid',
      },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Banner image displayed at the bottom of the portfolio page',
        condition: (data) => data.pageType === 'portfolio',
      },
    },
    // About Page Fields
    {
      name: 'aboutHeroTitle',
      type: 'textarea',
      admin: {
        description: 'Main hero title for about page',
        condition: (data) => data.pageType === 'about',
      },
    },
    {
      name: 'aboutHeroSubtitle',
      type: 'text',
      admin: {
        description: 'Subtitle below hero title for about page',
        condition: (data) => data.pageType === 'about',
      },
    },
    {
      name: 'whatSetsUsApartTitle',
      type: 'text',
      admin: {
        description: 'Title for the "what sets us apart" section',
        condition: (data) => data.pageType === 'about',
      },
    },
    {
      name: 'aboutCards',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            description: 'Card number (e.g., "1", "2", "3")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'about',
        description: 'Cards explaining what sets you apart',
      },
    },
    {
      name: 'founderSection',
      type: 'group',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          defaultValue: 'creative force & founder',
        },
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Reinout Ghijs',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'founderImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for founder section',
          },
        },
        {
          name: 'brandviewIcon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Brandview decorative icon',
          },
        },
        {
          name: 'personIcon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Person decorative icon',
          },
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'about',
      },
    },
    {
      name: 'whatWeDoSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'what we do',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'At Brandview, we offer a versatile and focused range of services to help businesses grow through strong visual communication:',
        },
        {
          name: 'services',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
          defaultValue: [
            {
              title: 'business photography',
              description: 'Professional imagery that reflects and enhances your brand identity.',
            },
            {
              title: '(corporate) event photography',
              description: 'Candid, atmospheric images that capture key moments and energy.',
            },
            {
              title: 'food photography',
              description: 'Mouthwatering visuals that make your dishes stand out.',
            },
            {
              title: 'product photography',
              description: 'Clean, scroll-stopping shots for webshops, ads or catalogues.',
            },
            {
              title: 'portraits',
              description: 'Authentic and approachable images of you or your team.',
            },
            {
              title: 'short content',
              description: 'Fast-paced, engaging videos tailor-made for social media. From concept to final edit.',
            },
          ],
        },
        {
          name: 'bulbIcon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Bulb decorative icon',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for what we do section',
          },
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'about',
      },
    },
    // Services Page Fields
    {
      name: 'heroTitle',
      type: 'text',
      admin: {
        description: 'Main hero title for services page',
        condition: (data) => data.pageType === 'services',
      },
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      admin: {
        description: 'Subtitle below hero title for services page',
        condition: (data) => data.pageType === 'services',
      },
    },
    {
      name: 'serviceItems',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description: 'Optional subtitle (leave empty if not needed)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'portfolioSlug',
          type: 'text',
          required: true,
          admin: {
            description: 'Slug for portfolio link (e.g., "short-content")',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Service image or video (WebP, JPG, PNG, WebM, MP4, MOV)',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional decorative icon',
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
        },
        {
          name: 'linkText',
          type: 'text',
          defaultValue: 'photos',
          admin: {
            description: 'Text for the portfolio link (e.g., "photos", "videos", "gallery")',
          },
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'services',
      },
    },
    {
      name: 'pricingSection',
      type: 'group',
      fields: [
        {
          name: 'contentPlans',
          type: 'group',
          label: 'Content Plans',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'content plans',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'monthly packages',
            },
            {
              name: 'starterPackTitle',
              type: 'text',
              defaultValue: 'starter pack',
            },
            {
              name: 'starterPackDescription',
              type: 'text',
              defaultValue: '= basic package',
            },
            {
              name: 'brandBuilderTitle',
              type: 'text',
              defaultValue: 'brand builder',
            },
            {
              name: 'brandBuilderDescription',
              type: 'text',
              defaultValue: '= pro package',
            },
          ],
        },
        {
          name: 'flashDeals',
          type: 'group',
          label: 'Flash Deals',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'flash deals',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'one-time collaboration',
            },
            {
              name: 'focusTitle',
              type: 'text',
              defaultValue: 'focus',
            },
            {
              name: 'focusDescription',
              type: 'text',
              defaultValue: '= basic package',
            },
            {
              name: 'fullFrameTitle',
              type: 'text',
              defaultValue: 'full frame',
            },
            {
              name: 'fullFrameDescription',
              type: 'text',
              defaultValue: '= pro package',
            },
          ],
        },
        {
          name: 'addOns',
          type: 'group',
          label: 'Add-ons',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'add-ons',
            },
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
              ],
              defaultValue: [{ name: 'extra video' }, { name: 'extra photo' }, { name: 'fast delivery 48h' }, { name: 'fast delivery 72h' }, { name: 'social media post text' }, { name: 'subtitles' }],
            },
          ],
        },
        {
          name: 'ourRates',
          type: 'group',
          label: 'Our Rates',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'our rates',
            },
            {
              name: 'description',
              type: 'textarea',
              defaultValue: 'At Brandview, you choose how we team up: from one-time Flash Deals to monthly Content Plans that build long-term brand value. Need more? Add powerful Add-Ons to boost your content even further. Explore what fits your brand best.',
            },
            {
              name: 'linkText',
              type: 'text',
              defaultValue: 'prices',
            },
            {
              name: 'linkUrl',
              type: 'text',
              admin: {
                description: 'URL for the prices link',
              },
            },
          ],
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'services',
      },
    },
    // Rates Page Fields
    {
      name: 'ratesHeroTitle',
      type: 'text',
      admin: {
        description: 'Main hero title for rates page',
        condition: (data) => data.pageType === 'rates',
      },
    },
    {
      name: 'ratesHeroSubtitle',
      type: 'text',
      admin: {
        description: 'Subtitle below hero title for rates page',
        condition: (data) => data.pageType === 'rates',
      },
    },
    {
      name: 'ratesPricingSection',
      type: 'group',
      admin: {
        condition: (data) => data.pageType === 'rates',
      },
      fields: [
        {
          name: 'contentPlans',
          type: 'group',
          label: 'Content Plans',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'content plans',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'monthly packages (min. 6 months)',
            },
            {
              name: 'starterPack',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'starter pack',
                },
                {
                  name: 'description',
                  type: 'text',
                  defaultValue: '= basic package',
                },
                {
                  name: 'features',
                  type: 'array',
                  dbName: 'rates_starter_features',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                  ],
                  defaultValue: [{ feature: '2 shortform videos (max. 30 sec)' }, { feature: '8 edited photos' }, { feature: 'professional lightning' }, { feature: 'Simple image correction & color editing' }, { feature: 'Basic post-processing in your house style' }, { feature: 'Delivery within 14 working days' }],
                },
                {
                  name: 'price',
                  type: 'text',
                  defaultValue: '€ 950 exclusive btw',
                },
              ],
            },
            {
              name: 'brandBuilder',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'brand builder',
                },
                {
                  name: 'description',
                  type: 'text',
                  defaultValue: '= pro package',
                },
                {
                  name: 'features',
                  type: 'array',
                  dbName: 'rates_builder_features',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                  ],
                  defaultValue: [{ feature: '12 edited photos' }, { feature: '4 shortform video (max. 30 sec)' }, { feature: 'creative on set' }, { feature: 'Simple image correction & color editing' }, { feature: 'Basic post-processing in your house style' }, { feature: 'Delivery within 14 working days' }],
                },
                {
                  name: 'price',
                  type: 'text',
                  defaultValue: '€ 1.470 exclusive btw',
                },
              ],
            },
          ],
        },
        {
          name: 'flashDeals',
          type: 'group',
          label: 'Flash Deals',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'flash deals',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'one-time collaboration (1 month)',
            },
            {
              name: 'focus',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'focus',
                },
                {
                  name: 'description',
                  type: 'text',
                  defaultValue: '= basic package',
                },
                {
                  name: 'features',
                  type: 'array',
                  dbName: 'rates_focus_features',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                  ],
                  defaultValue: [{ feature: '2 shortform videos (max. 30 sec)' }, { feature: '8 edited photos' }, { feature: 'professional lightning' }, { feature: 'Simple image correction & color editing' }, { feature: 'Basic post-processing in your house style' }, { feature: 'Delivery within 14 working days' }],
                },
                {
                  name: 'price',
                  type: 'text',
                  defaultValue: '€ 1.100 exclusive btw',
                },
              ],
            },
            {
              name: 'fullFrame',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'full frame',
                },
                {
                  name: 'description',
                  type: 'text',
                  defaultValue: '= pro package',
                },
                {
                  name: 'features',
                  type: 'array',
                  dbName: 'rates_frame_features',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                  ],
                  defaultValue: [{ feature: '12 edited photos' }, { feature: '4 shortform video (max. 30 sec)' }, { feature: 'creative on set' }, { feature: 'Simple image correction & color editing' }, { feature: 'Basic post-processing in your house style' }, { feature: 'Delivery within 14 working days' }],
                },
                {
                  name: 'price',
                  type: 'text',
                  defaultValue: '€ 1.570 exclusive btw',
                },
              ],
            },
          ],
        },
        {
          name: 'addOns',
          type: 'group',
          label: 'Add-ons',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'add-ons',
            },
            {
              name: 'subtitle',
              type: 'text',
              defaultValue: 'optional extras',
            },
            {
              name: 'boostersTitle',
              type: 'text',
              defaultValue: 'boosters',
            },
            {
              name: 'items',
              type: 'array',
              dbName: 'rates_addon_items',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'price',
                  type: 'text',
                  required: true,
                },
              ],
              defaultValue: [
                { name: 'extra video', price: '€ 450 exclusive btw' },
                { name: "10 extra photo's", price: '€ 150 exclusive btw' },
                { name: 'fast delivery 48h', price: '€ 100 exclusive btw' },
                { name: 'fast delivery 72h', price: '€ 150 exclusive btw' },
                { name: 'stylist on set', price: '€ 500 exclusive btw' },
                { name: 'subtitles', price: '€ 50 exclusive btw' },
              ],
            },
            {
              name: 'megaphoneIcon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Megaphone decorative icon',
              },
            },
          ],
        },
      ],
    },
    // Contact Page Fields
    {
      name: 'contactHeroTitle',
      type: 'text',
      admin: {
        description: 'Main hero title for contact page',
        condition: (data) => data.pageType === 'contact',
      },
    },
    {
      name: 'contactHeroSubtitle',
      type: 'text',
      admin: {
        description: 'Subtitle below hero title for contact page',
        condition: (data) => data.pageType === 'contact',
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'brandName',
          type: 'text',
          defaultValue: 'brandview',
        },
        {
          name: 'phoneNumber',
          type: 'text',
          defaultValue: '(+32) 471 46 07 08',
        },
        {
          name: 'phoneNumberLink',
          type: 'text',
          defaultValue: 'tel:+32471460708',
          admin: {
            description: 'Phone number in tel: format for links',
          },
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'collab@brandview.be',
        },
        {
          name: 'emailLink',
          type: 'text',
          defaultValue: 'mailto:collab@brandview.be',
          admin: {
            description: 'Email in mailto: format for links',
          },
        },
        {
          name: 'addressLine1',
          type: 'text',
          defaultValue: 'Brugse Heirweg 111',
        },
        {
          name: 'addressLine2',
          type: 'text',
          defaultValue: '8211 Aartrijke',
        },
        {
          name: 'mapLink',
          type: 'text',
          defaultValue: 'https://www.google.com/maps/search/?api=1&query=Brugse+Heirweg+111,+8211+Aartrijke',
          admin: {
            description: 'Google Maps link for the address',
          },
        },
        {
          name: 'laptopIcon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Laptop decorative icon',
          },
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'contact',
      },
    },
    {
      name: 'contactFormSettings',
      type: 'group',
      fields: [
        {
          name: 'submitButtonText',
          type: 'text',
          defaultValue: 'send it off',
        },
        {
          name: 'firstNameLabel',
          type: 'text',
          defaultValue: 'first name',
        },
        {
          name: 'lastNameLabel',
          type: 'text',
          defaultValue: 'last name',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          defaultValue: 'phone number',
        },
        {
          name: 'emailLabel',
          type: 'text',
          defaultValue: 'email',
        },
        {
          name: 'messageLabel',
          type: 'text',
          defaultValue: 'message',
        },
        {
          name: 'requiredText',
          type: 'text',
          defaultValue: '(required)',
        },
      ],
      admin: {
        condition: (data) => data.pageType === 'contact',
      },
    },
    {
      name: 'contactBannerImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Banner image displayed at the bottom of the contact page',
        condition: (data) => data.pageType === 'contact',
      },
    },
    // Other page fields
    {
      name: 'content',
      type: 'textarea',
      admin: {
        description: 'General content for other page types',
        condition: (data) => data.pageType === 'other',
      },
    },
  ],
};

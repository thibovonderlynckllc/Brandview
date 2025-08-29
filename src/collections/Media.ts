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
        { label: 'Decorative', value: 'decorative' },
        { label: 'Home', value: 'home' },
        { label: 'About Us', value: 'about-us' },
        { label: 'Services', value: 'services' },
        { label: 'Portfolio - Business', value: 'portfolio-business' },
        { label: 'Portfolio - Corporate Events', value: 'portfolio-corporate-events' },
        { label: 'Portfolio - Food', value: 'portfolio-food' },
        { label: 'Portfolio - Portraits', value: 'portfolio-portraits' },
        { label: 'Portfolio - Products', value: 'portfolio-products' },
        { label: 'Portfolio - Short Content', value: 'portfolio-short-content' },
      ],
      admin: {
        description: 'Select the applicable tags for this media.',
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Poster/thumbnail image for videos (used on mobile devices)',
        condition: (data, siblingData) => {
          // Check if this is a video file
          const filename = data?.filename || siblingData?.filename || data?.name || siblingData?.name;
          if (!filename) return false;

          const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
          return videoExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
        },
      },
    },
    {
      name: 'cloudinaryMobileVideo',
      type: 'text',
      admin: {
        description: 'Cloudinary MP4 link for mobile devices (required when WebM file is uploaded)',
      },
      validate: (value: string | null | undefined, { data }: { data: any }) => {
        // Check if this is a WebM file
        const filename = data?.filename || data?.name;
        if (filename && filename.toLowerCase().endsWith('.webm')) {
          if (!value || value.trim() === '') {
            return 'Cloudinary MP4 link is required for WebM files to ensure mobile compatibility';
          }
        }
        return true;
      },
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Store the file extension for easier detection
        if (data?.filename) {
          const extension = data.filename.split('.').pop()?.toLowerCase();
          data.fileExtension = extension;
        }
        return data;
      },
    ],
  },
};

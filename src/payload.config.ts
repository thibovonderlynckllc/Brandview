// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { s3Storage } from '@payloadcms/storage-s3';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Portfolio } from './collections/Portfolio';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Prefer POSTGRES_URL (as per Supabase/Vercel convention), then fall back
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.DATABASE_URI || '';

// Performance optimization: Use non-pooled connection for better performance
const directConnectionString = connectionString.replace('-pooler.', '.');

// R2 Storage configuration for brandview
const storage = s3Storage({
  collections: {
    media: {
      disableLocalStorage: true,
      prefix: 'media',
      generateFileURL: ({ filename, prefix }) => {
        const publicUrl = process.env.S3_PUBLIC_URL;
        if (!publicUrl) return '';
        return `${publicUrl}/${prefix}/${filename}`;
      },
    },
  },
  bucket: process.env.S3_BUCKET || 'brandview-data',
  config: {
    endpoint: process.env.S3_ENDPOINT || 'https://d769879df266edf1eaf504e7027ee2a0.r2.cloudflarestorage.com',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: 'auto',
    forcePathStyle: true,
  },
});

// Alternative: Multiple bucket configuration (if you prefer separate buckets)
const createBucketStorage = (bucketName: string) =>
  s3Storage({
    collections: {
      media: {
        disableLocalStorage: true,
        prefix: 'media',
        generateFileURL: ({ filename, prefix }) => {
          const publicUrl = process.env.S3_PUBLIC_URL;
          if (!publicUrl) return '';
          return `${publicUrl}/${prefix}/${filename}`;
        },
      },
    },
    bucket: bucketName,
    config: {
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
      region: process.env.S3_REGION || 'auto',
      forcePathStyle: true,
    },
  });

// Uncomment these if you want separate buckets:
// const homeStorage = createBucketStorage('brandview-home');
// const portfolioStorage = createBucketStorage('brandview-portfolio');
// const packagesStorage = createBucketStorage('brandview-packages');
// const contactStorage = createBucketStorage('brandview-contact');

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Portfolio],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Performance optimizations
  indexSortableFields: true,
  defaultDepth: 1,
  maxDepth: 2,
  db: postgresAdapter({
    pool: {
      connectionString: directConnectionString, // Always use direct connection for better performance
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      // Neon-optimized connection pooling
      max: 20, // Maximum number of connections in the pool
      // Performance optimizations
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      maxUses: 7500,
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 50000000, // 50MB, adjust as needed
    },
  },
  plugins: [storage],
});

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

// Performance optimization: Use non-pooled connection for better performance targets (replace Neon pooler hostname)
const directConnectionString = connectionString.replace('-pooler.', '.');

// R2 Storage configuration
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
    endpoint: process.env.S3_ENDPOINT, // e.g. https://<account>.r2.cloudflarestorage.com
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || 'auto',
    forcePathStyle: true,
  },
});

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
      connectionString: directConnectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      // maxUses supported by some poolers; ignored if not supported
      maxUses: 7500,
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 50 * 1000 * 1000, // 50MB
    },
  },
  plugins: [storage],
});

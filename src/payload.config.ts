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

// Database connection string with SSL requirement
const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL || '';

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
    endpoint: process.env.S3_ENDPOINT || 'https://d769879df266edf1eaf504e7027ee2a0.eu.r2.cloudflarestorage.com',
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
  db: postgresAdapter({
    pool: {
      connectionString: connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      maxUses: 7500,
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 50000000, // 50MB
    },
  },
  plugins: [storage],
});

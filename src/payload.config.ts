// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Portfolio } from './collections/Portfolio';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  hooks: {
    afterChange: [
      async ({ req, doc, collection }) => {
        // Trigger revalidation when content changes
        if (req.headers && process.env.REVALIDATION_SECRET) {
          try {
            const revalidateUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/revalidate`;

            const response = await fetch(revalidateUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REVALIDATION_SECRET}`,
              },
              body: JSON.stringify({
                collection: collection?.slug,
                slug: doc.slug,
                action: 'update',
              }),
            });

            if (!response.ok) {
              console.warn(`Failed to revalidate after ${collection?.slug} change:`, response.statusText);
            } else {
              console.log(`Successfully triggered revalidation for ${collection?.slug}: ${doc.slug}`);
            }
          } catch (error) {
            console.warn('Error triggering revalidation:', error);
          }
        }
      },
    ],
  },
});

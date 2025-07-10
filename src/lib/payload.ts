import { getPayload } from 'payload';
import config from '@payload-config';

let payloadInstance: unknown = null;

export async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config });
  }
  return payloadInstance;
}

export async function getPageBySlug(slug: string) {
  try {
    const payload = await getPayloadInstance();
    const pages = await (payload as any).find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    return pages.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    return null;
  }
}

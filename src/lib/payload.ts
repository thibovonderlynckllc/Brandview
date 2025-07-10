import { getPayload } from 'payload';
import config from '@payload-config';

export const getPageBySlug = async (slug: string) => {
  try {
    const payload = await getPayload({ config });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (payload as any).find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    return result.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
};

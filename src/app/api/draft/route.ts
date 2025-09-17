import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages' as any,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    draft: true,
  });

  return result.docs[0] || null;
}

async function getPortfolioBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'portfolio' as any,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    draft: true,
  });

  return result.docs[0] || null;
}

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const collection = searchParams.get('collection');

  // Check the secret and next parameters
  // This secret should only be known to this Route Handler and the CMS
  if (secret !== process.env.PREVIEW_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  let item = null;
  if (collection === 'pages') {
    item = await getPageBySlug(slug);
  } else if (collection === 'portfolio') {
    item = await getPortfolioBySlug(slug);
  }

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!item) {
    return new Response('Invalid slug', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Construct the redirect path based on collection and slug
  let redirectPath = '/';
  if (collection === 'portfolio') {
    redirectPath = `/portfolio/${slug}`;
  } else if (collection === 'pages') {
    // Handle different page types
    if (slug === 'home') {
      redirectPath = '/';
    } else {
      redirectPath = `/${slug}`;
    }
  }

  // Redirect to the path from the fetched item
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(redirectPath);
}

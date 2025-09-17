import { getPayload } from 'payload';
import { draftMode } from 'next/headers';
import config from '../../../../payload.config';
import PortfolioDetailClient from './PortfolioDetailClient';

async function getPortfolioData(slug: string, isDraftMode: boolean) {
  const payload = await getPayload({ config });
  try {
    const portfolio = await payload.find({
      collection: 'portfolio' as any,
      where: {
        slug: { equals: slug }
      },
      depth: 2, // Increase depth to populate nested fields like poster
      limit: 1,
      draft: isDraftMode, // Include drafts when in draft mode
      overrideAccess: isDraftMode, // Override access restrictions in draft mode
    });
    return portfolio.docs[0] || null;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour, revalidate on demand

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const portfolioData = await getPortfolioData(slug, isDraftMode);

  if (!portfolioData) {
    return <div>Portfolio not found</div>;
  }

  return <PortfolioDetailClient data={portfolioData} />;
} 
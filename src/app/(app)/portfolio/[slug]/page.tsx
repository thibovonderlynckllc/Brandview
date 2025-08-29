import { getPayload } from 'payload';
import config from '../../../../payload.config';
import PortfolioDetailClient from './PortfolioDetailClient';

async function getPortfolioData(slug: string) {
  const payload = await getPayload({ config });
  try {
    const portfolio = await payload.find({
      collection: 'portfolio' as any,
      where: {
        slug: { equals: slug }
      },
      depth: 2, // Increase depth to populate nested fields like poster
      limit: 1
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
  const portfolioData = await getPortfolioData(slug);

  if (!portfolioData) {
    return <div>Portfolio not found</div>;
  }

  return <PortfolioDetailClient data={portfolioData} />;
} 
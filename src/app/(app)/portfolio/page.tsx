import Image from 'next/image';
import PortfolioCard from '../components/PortfolioCard';
import { getPayload } from 'payload';
import { draftMode } from 'next/headers';
import config from '../../../payload.config';

// Fallback data
const fallbackData = {
    portfolioCards: [
        {
            title: "business",
            slug: "business",
            iconPosition: "none",
        },
        {
            title: "(corporate) events",
            slug: "corporate-events",
            iconPosition: "none",
        },
        {
            title: "food",
            slug: "food",
            iconPosition: "none",
        },
        {
            title: "portraits",
            slug: "portraits",
            iconPosition: "none",
        },
        {
            title: "products",
            slug: "products",
            icon: "/images/icons/camera.svg",
            iconPosition: "top-right",
        },
        {
            title: "short content",
            slug: "short-content",
            iconPosition: "none",
        },
    ],
    bannerImage: "/images/banner.svg",
};

async function getPortfolioData(isDraftMode: boolean) {
    try {
        const payload = await getPayload({ config });
        const pages = await payload.find({
            collection: 'pages' as any,
            where: {
                and: [
                    {
                        slug: { equals: 'portfolio' }
                    },
                    {
                        pageType: { equals: 'portfolio' }
                    }
                ]
            },
            limit: 1,
            draft: isDraftMode,
            overrideAccess: isDraftMode,
        });
        
        if (pages.docs.length > 0) {
            return pages.docs[0];
        }
        
        return fallbackData;
    } catch (error) {
        console.warn('Error fetching portfolio data:', error);
        return fallbackData;
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour, revalidate on demand

interface PortfolioCard {
    title: string;
    slug: string;
    image?: { 
        url: string; 
        alt?: string;
        cloudinaryMobileVideo?: string;
        poster?: { url: string; alt?: string } | null;
        mimeType?: string;
    } | string | null;
    icon?: { url: string; alt?: string } | string | null;
    iconPosition: 'none' | 'top-right';
}

interface PortfolioData {
    portfolioCards: PortfolioCard[];
    bannerImage?: { url: string; alt?: string } | string | null;
}

const PortfolioPage = async () => {
    const { isEnabled: isDraftMode } = await draftMode();
    const data: PortfolioData = await getPortfolioData(isDraftMode);

    const getBannerSrc = () => {
        if (typeof data.bannerImage === 'object' && data.bannerImage !== null && 'url' in data.bannerImage) return data.bannerImage.url;
        return "/images/banner.svg"; // fallback banner
    };

    return (
        <div className="bg-blue">
            {isDraftMode && (
                <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white px-4 py-2 text-center font-bold text-sm shadow-lg z-50 border-t-4 border-red-800">
                    ⚠️ DRAFT PREVIEW - Not live yet! 
                    <span className="text-xs font-normal ml-2">
                        Only you see this. 
                        <a href="/api/exit-draft" className="underline ml-1 hover:text-red-200">
                            Exit
                        </a>
                    </span>
                </div>
            )}
            <div className="px-8 sm:px-16 pt-1">
                {/* Portfolio grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.portfolioCards.map((card, index) => (
                        <PortfolioCard
                            key={card.slug}
                            title={card.title}
                            slug={card.slug}
                            image={card.image}
                            icon={card.icon}
                            iconPosition={card.iconPosition}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            <Image src={getBannerSrc()} alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto pt-10 object-cover" />
        </div>
    )
}

export default PortfolioPage;
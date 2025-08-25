import Image from 'next/image';
import Link from 'next/link';

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

async function getPortfolioData() {
    try {
        // During build time, use fallback data
        if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SERVER_URL) {
            return fallbackData;
        }
        
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/pages?where[slug][equals]=portfolio`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.warn('Failed to fetch portfolio data, using fallback');
            return fallbackData;
        }
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
            const pageData = data.docs[0];
            // If it's a portfolio page, return the data, otherwise use fallback
            if (pageData.pageType === 'portfolio') {
                return pageData;
            }
        }
        return fallbackData;
    } catch (error) {
        console.warn('Error fetching portfolio data:', error);
        return fallbackData;
    }
}

interface PortfolioCard {
    title: string;
    slug: string;
    icon?: { url: string; alt?: string } | string | null;
    iconPosition: 'none' | 'top-right';
}

interface PortfolioData {
    portfolioCards: PortfolioCard[];
    bannerImage?: { url: string; alt?: string } | string | null;
}

const PortfolioPage = async () => {
    const data: PortfolioData = await getPortfolioData();

    const renderIcon = (card: PortfolioCard) => {
        const iconSrc =
          typeof card.icon === 'object' && card.icon !== null && 'url' in card.icon
            ? card.icon.url
            : typeof card.icon === 'string'
              ? card.icon
              : null;
        if (!iconSrc || card.iconPosition === 'none') return null;

        return (
            <div className="absolute -right-5 md:-right-28 -top-25 sm:-top-30 md:-top-32 w-32 sm:w-40 lg:w-48 rotate-10 z-10 transition-transform duration-300 group-hover:rotate-12">
                <Image src={iconSrc} alt={`${card.title} icon`} width={208} height={208} />
            </div>
        );
    };

    const getBannerSrc = () => {
        if (typeof data.bannerImage === 'object' && data.bannerImage !== null && 'url' in data.bannerImage) return data.bannerImage.url;
        return "/images/banner.svg"; // fallback banner
    };

    return (
        <div className="bg-blue">
            <div className="px-8 sm:px-16 pt-1">
                {/* Portfolio grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.portfolioCards.map((card) => {
                        const hasIcon = card.iconPosition !== 'none' && (
                          (typeof card.icon === 'object' && card.icon !== null && 'url' in card.icon && card.icon.url) ||
                          (typeof card.icon === 'string' && card.icon)
                        );
                        return (
                            <Link key={card.slug} href={`/portfolio/${card.slug}`} className={`cursor-pointer transform transition-transform duration-300 hover:scale-102 group ${hasIcon ? 'z-10' : ''}`}>
                                <div className="relative pt-6">
                                    <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                                    <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                                <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">{card.title}</span>
                                            </div>
                                        </div>
                                        {renderIcon(card)}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <Image src={getBannerSrc()} alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto pt-10 object-cover" />
        </div>
    )
}

export default PortfolioPage;
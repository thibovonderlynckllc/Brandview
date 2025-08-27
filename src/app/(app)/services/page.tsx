import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '../../../payload.config';

// Fallback data
const fallbackData = {
    heroTitle: "What we offer",
    heroSubtitle: "services",
    serviceItems: [
        {
            title: "short content",
            subtitle: "Fast-paced, engaging videos",
            description: "Tailor-made for social media. From concept to final edit.",
            portfolioSlug: "short-content",
            image: null,
            icon: null,
            iconPosition: "none" as const,
            linkText: "prices",
            linkUrl: "#",
        },
        {
            title: "food",
            subtitle: "Mouthwatering visuals",
            description: "That make your dishes stand out.",
            portfolioSlug: "food",
            image: null,
            icon: null,
            iconPosition: "none" as const,
            linkText: "prices",
            linkUrl: "#",
        },
        {
            title: "portraits",
            subtitle: "Authentic and approachable",
            description: "Images of you or your team.",
            portfolioSlug: "portraits",
            image: null,
            icon: null,
            iconPosition: "none" as const,
            linkText: "prices",
            linkUrl: "#",
        },
        {
            title: "business",
            subtitle: "Professional imagery",
            description: "That reflects and enhances your brand identity.",
            portfolioSlug: "business",
            image: null,
            icon: null,
            iconPosition: "none" as const,
            linkText: "prices",
            linkUrl: "#",
        },
        {
            title: "(corporate) events",
            subtitle: "Candid, atmospheric images",
            description: "That capture key moments and energy.",
            portfolioSlug: "corporate-events",
            image: null,
            icon: null,
            iconPosition: "none" as const,
            linkText: "prices",
            linkUrl: "#",
        },
        {
            title: "products",
            subtitle: "Clean, scroll-stopping shots",
            description: "For webshops, ads or catalogues.",
            portfolioSlug: "products",
            image: null,
            icon: "/images/icons/camera.svg",
            iconPosition: "top-right" as const,
            linkText: "prices",
            linkUrl: "#",
        },
    ],
    pricingSection: {
        contentPlans: {
            title: "content plans",
            subtitle: "Choose the plan that fits your needs",
            starterPackTitle: "starter pack",
            starterPackDescription: "Perfect for small businesses and startups",
            brandBuilderTitle: "brand builder",
            brandBuilderDescription: "Comprehensive visual content for growing brands",
        },
        flashDeals: {
            title: "flash deals",
            subtitle: "Limited time offers",
            focusTitle: "focus",
            focusDescription: "Quick, focused content creation",
            fullFrameTitle: "full frame",
            fullFrameDescription: "Complete visual storytelling package",
        },
        addOns: {
            title: "add-ons",
            items: [
                { name: "extra video" },
                { name: "10 extra photo's" },
                { name: "fast delivery 48h" },
                { name: "fast delivery 72h" },
                { name: "stylist on set" },
                { name: "subtitles" },
            ],
        },
        ourRates: {
            title: "our rates",
            description: "Transparent pricing for all our services",
            linkUrl: "/rates",
            linkText: "prices",
        },
    },
};

async function getServicesData() {
    const payload = await getPayload({ config });
    try {
        const pages = await payload.find({
            collection: 'pages' as any,
            where: {
                slug: { equals: 'services' }
            },
            limit: 1
        });
        
        if (pages.docs.length > 0) {
            const pageData = pages.docs[0];
            // If it's a services page, return the data, otherwise use fallback
            if (pageData.pageType === 'services') {
                return pageData;
            }
        }
        return fallbackData;
    } catch (error) {
        console.warn('Error fetching services data:', error);
        return fallbackData;
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour, revalidate on demand

interface ServiceItem {
    title: string;
    subtitle?: string;
    description: string;
    portfolioSlug: string;
    image?: MediaItem | string | null;
    icon?: { url: string; alt?: string } | string | null;
    iconPosition: 'none' | 'top-left' | 'top-right';
    linkText?: string;
}

interface MediaItem {
    id: string;
    alt: string;
    url: string;
    filename?: string;
    mimeType?: string;
}

interface PricingContentPlan {
    title: string;
    subtitle: string;
    starterPackTitle: string;
    starterPackDescription: string;
    brandBuilderTitle: string;
    brandBuilderDescription: string;
}
interface PricingFlashDeal {
    title: string;
    subtitle: string;
    focusTitle: string;
    focusDescription: string;
    fullFrameTitle: string;
    fullFrameDescription: string;
}
interface PricingAddOn {
    title: string;
    items: Array<{ name: string }>;
}
interface PricingOurRates {
    title: string;
    description: string;
    linkUrl?: string;
    linkText: string;
}
interface ServicesData {
    heroTitle: string;
    heroSubtitle: string;
    serviceItems: ServiceItem[];
    pricingSection: {
        contentPlans: PricingContentPlan;
        flashDeals: PricingFlashDeal;
        addOns: PricingAddOn;
        ourRates: PricingOurRates;
    };
}

export default async function ServicesPage() {
    const data: ServicesData = await getServicesData();
    
    // Split service items into two sections (first 3, last 3)
    const firstSectionServices = data.serviceItems.slice(0, 3);
    const secondSectionServices = data.serviceItems.slice(3);

    const renderIcon = (item: ServiceItem) => {
        const iconSrc = (typeof item.icon === 'object' && item.icon !== null && 'url' in item.icon)
            ? item.icon.url
            : (typeof item.icon === 'string' ? item.icon : null);
        if (!iconSrc || item.iconPosition === 'none') return null;

        const iconClasses = {
            'top-left': 'absolute -left-5 md:-left-28 -top-25 sm:-top-30 md:-top-32 w-32 sm:w-40 lg:w-48 -rotate-10 z-10 transition-transform duration-300 group-hover:-rotate-12',
            'top-right': 'absolute -right-5 md:-right-28 -top-25 sm:-top-30 md:-top-32 w-32 sm:w-40 lg:w-48 rotate-10 z-10 transition-transform duration-300 group-hover:rotate-12',
        };

        return (
            <div className={iconClasses[item.iconPosition]}>
                <Image src={iconSrc} alt={`${item.title} icon`} width={208} height={208} />
            </div>
        );
    };

    const renderServiceCard = (item: ServiceItem) => {
        const hasIcon = item.iconPosition !== 'none' && (
            (typeof item.icon === 'object' && item.icon !== null && 'url' in item.icon && item.icon.url) ||
            (typeof item.icon === 'string' && item.icon)
        );

        return (
            <div key={item.portfolioSlug} className={`relative group ${hasIcon ? 'z-10' : ''}`}>
                <div className="pt-6">
                    <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                    <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-medium text-red mb-2">{item.title}</h3>
                                {item.subtitle && (
                                    <p className="text-lg md:text-xl font-light text-red mb-4">{item.subtitle}</p>
                                )}
                                <p className="text-base md:text-lg font-light text-red">{item.description}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <Link 
                                    href={`/portfolio/${item.portfolioSlug}`}
                                    className="text-lg md:text-xl font-medium text-red hover:underline transition-colors duration-300"
                                >
                                    view portfolio
                                </Link>
                                {item.linkText && (
                                    <Link 
                                        href={item.linkUrl || '#'}
                                        className="text-lg md:text-xl font-medium text-red hover:underline transition-colors duration-300"
                                    >
                                        {item.linkText}
                                    </Link>
                                )}
                            </div>
                        </div>
                        {renderIcon(item)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-6xl font-medium">{data.heroTitle}</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">{data.heroSubtitle}</p>
            </div>

            {/* Services Grid */}
            <div className="bg-blue px-8 sm:px-16 pt-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {firstSectionServices.map(renderServiceCard)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {secondSectionServices.map(renderServiceCard)}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="px-8 sm:px-16 py-20 md:py-55">
                <div className="text-center mb-15">
                    <h2 className="text-4xl md:text-6xl font-medium mb-4">{data.pricingSection.contentPlans.title}</h2>
                    <p className="text-lg md:text-xl font-light">{data.pricingSection.contentPlans.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-15">
                    <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                        <h3 className="text-2xl md:text-3xl font-medium mb-4">{data.pricingSection.contentPlans.starterPackTitle}</h3>
                        <p className="text-lg font-light mb-6">{data.pricingSection.contentPlans.starterPackDescription}</p>
                        <Link 
                            href="/rates"
                            className="inline-block bg-red text-white px-6 py-3 rounded-full font-medium hover:bg-red/90 transition-colors duration-300"
                        >
                            view pricing
                        </Link>
                    </div>
                    <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                        <h3 className="text-2xl md:text-3xl font-medium mb-4">{data.pricingSection.contentPlans.brandBuilderTitle}</h3>
                        <p className="text-lg font-light mb-6">{data.pricingSection.contentPlans.brandBuilderDescription}</p>
                        <Link 
                            href="/rates"
                            className="inline-block bg-red text-white px-6 py-3 rounded-full font-medium hover:bg-red/90 transition-colors duration-300"
                        >
                            view pricing
                        </Link>
                    </div>
                </div>

                <div className="text-center mb-15">
                    <h2 className="text-4xl md:text-6xl font-medium mb-4">{data.pricingSection.flashDeals.title}</h2>
                    <p className="text-lg md:text-xl font-light">{data.pricingSection.flashDeals.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-15">
                    <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                        <h3 className="text-2xl md:text-3xl font-medium mb-4">{data.pricingSection.flashDeals.focusTitle}</h3>
                        <p className="text-lg font-light mb-6">{data.pricingSection.flashDeals.focusDescription}</p>
                        <Link 
                            href="/rates"
                            className="inline-block bg-red text-white px-6 py-3 rounded-full font-medium hover:bg-red/90 transition-colors duration-300"
                        >
                            view pricing
                        </Link>
                    </div>
                    <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                        <h3 className="text-2xl md:text-3xl font-medium mb-4">{data.pricingSection.flashDeals.fullFrameTitle}</h3>
                        <p className="text-lg font-light mb-6">{data.pricingSection.flashDeals.fullFrameDescription}</p>
                        <Link 
                            href="/rates"
                            className="inline-block bg-red text-white px-6 py-3 rounded-full font-medium hover:bg-red/90 transition-colors duration-300"
                        >
                            view pricing
                        </Link>
                    </div>
                </div>

                <div className="text-center mb-15">
                    <h2 className="text-4xl md:text-6xl font-medium mb-4">{data.pricingSection.addOns.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {data.pricingSection.addOns.items.map((item, index) => (
                            <div key={index} className="bg-white rounded-3xl border-[1.5px] border-red p-6">
                                <p className="text-lg font-medium">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-medium mb-4">{data.pricingSection.ourRates.title}</h2>
                    <p className="text-lg md:text-xl font-light mb-8">{data.pricingSection.ourRates.description}</p>
                    <Link 
                        href={data.pricingSection.ourRates.linkUrl || '/rates'}
                        className="inline-block bg-red text-white px-8 py-4 rounded-full text-xl font-medium hover:bg-red/90 transition-colors duration-300"
                    >
                        {data.pricingSection.ourRates.linkText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
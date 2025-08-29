import Image from 'next/image';
import SwirlArrow from '../components/SwirlArrow';
import Link from 'next/link';
import VideoPlayer from '../components/VideoPlayer';
import { getPayload } from 'payload';
import config from '../../../payload.config';

// Fallback data
const fallbackData = {
    heroTitle: "Visual content that connects and converts.",
    heroSubtitle: "services",
    serviceItems: [
        {
            title: "short content",
            subtitle: "Reels / social content / interviews / trailers",
            description: "Scroll-stopping short content tailored to your brand. We create bite-sized video stories that engage, inform and entertain, ideal for social media.",
            portfolioSlug: "short-content",
            iconPosition: "none",
            linkText: "photos",
        },
        {
            title: "(corporate) events",
            subtitle: "",
            description: "From conferences to company parties, we document the energy and key moments of your event with authenticity and flair. Relive the vibe, long after it's over.",
            portfolioSlug: "corporate-events",
            iconPosition: "none",
            linkText: "photos",
        },
        {
            title: "food photography",
            subtitle: "",
            description: "Delicious visuals that make your dishes irresistible. We style, light and shoot food in a way that triggers taste buds and boosts your brand's appetite appeal.",
            portfolioSlug: "food",
            icon: "/images/icons/mouth.svg",
            iconPosition: "top-left",
            linkText: "photos",
        },
        {
            title: "portraits",
            subtitle: "",
            description: "Authentic portraits with personality. Whether it's for your website, team page or social media, we ensure everyone looks approachable and confident.",
            portfolioSlug: "portraits",
            iconPosition: "none",
            linkText: "photos",
        },
        {
            title: "product photography",
            subtitle: "",
            description: "Sharp, stylish and scroll-stopping. We present your products in the best light, whether for e-commerce, campaigns or catalogues.",
            portfolioSlug: "products",
            iconPosition: "none",
            linkText: "photos",
        },
        {
            title: "business photography",
            subtitle: "",
            description: "We capture the essence of your brand with clean, professional visuals that make a lasting impression. From team portraits to workspaces, we showcase the people and story behind your business.",
            portfolioSlug: "business",
            icon: "/images/icons/eyes.svg",
            iconPosition: "top-right",
            linkText: "photos",
        },
    ],
    pricingSection: {
        contentPlans: {
            title: "content plans",
            subtitle: "monthly packages",
            starterPackTitle: "starter pack",
            starterPackDescription: "= basic package",
            brandBuilderTitle: "brand builder",
            brandBuilderDescription: "= pro package",
        },
        flashDeals: {
            title: "flash deals",
            subtitle: "one-time collaboration",
            focusTitle: "focus",
            focusDescription: "= basic package",
            fullFrameTitle: "full frame",
            fullFrameDescription: "= pro package",
        },
        addOns: {
            title: "add-ons",
            items: [
                { name: "extra video" },
                { name: "extra photo" },
                { name: "fast delivery 48h" },
                { name: "fast delivery 72h" },
                { name: "social media post text" },
                { name: "subtitles" },
            ],
        },
        ourRates: {
            title: "our rates",
            description: "At Brandview, you choose how we team up: from one-time Flash Deals to monthly Content Plans that build long-term brand value. Need more? Add powerful Add-Ons to boost your content even further. Explore what fits your brand best.",
            linkText: "prices",
            linkUrl: "#",
        },
    },
};

async function getServicesData() {
    try {
        const payload = await getPayload({ config });
        const pages = await payload.find({
            collection: 'pages' as any,
            where: {
                and: [
                    {
                        slug: { equals: 'services' }
                    },
                    {
                        pageType: { equals: 'services' }
                    }
                ]
            },
            limit: 1
        });
        
        if (pages.docs.length > 0) {
            return pages.docs[0];
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

const ServicesPage = async () => {
    const data: ServicesData = await getServicesData();
    
    // Split service items into two sections (first 3, last 3)
    const firstSectionServices = data.serviceItems.slice(0, 3);
    const secondSectionServices = data.serviceItems.slice(3);

    const renderIcon = (item: ServiceItem) => {
        const iconSrc = (typeof item.icon === 'object' && item.icon !== null && 'url' in item.icon)
            ? item.icon.url
            : (typeof item.icon === 'string' ? item.icon : null);
        if (!iconSrc || item.iconPosition === 'none') return null;

        const iconClasses: Record<string, string> = {
            'top-left': "absolute -top-10 left-4 sm:-top-15 lg:-top-10 xl:left-15 xl:-top-30 w-32 sm:w-40 lg:w-48",
            'top-right': "absolute -top-5 -right-4 md:-right-15 sm:-top-15 lg:right-[49%] lg:-top-5 xl:-top-23 xl:right-[44%] w-32 sm:w-40 lg:w-48 rotate-10",
        };

        return (
            <div className={iconClasses[item.iconPosition]}>
                <Image src={iconSrc} alt={`${item.title} icon`} width={208} height={208} />
            </div>
        );
    };

    const getImageSrc = (item: ServiceItem) => {
        if (typeof item.image === 'object' && item.image !== null && 'url' in item.image) return item.image.url;
        return "/images/services/image.png"; // fallback image
    };

    const getVideoSrc = (item: ServiceItem) => {
        if (typeof item.image === 'object' && item.image !== null && 'url' in item.image && isVideo(item.image)) {
            return item.image.url;
        }
        return null;
    };

    const getPosterSrc = (item: ServiceItem) => {
        if (typeof item.image === 'object' && item.image !== null && 'poster' in item.image && item.image.poster) {
            const poster = item.image.poster as { url: string } | string;
            return typeof poster === 'string' ? poster : poster.url;
        }
        return undefined;
    };

    const isVideo = (media: MediaItem) => {
        if (!media?.filename) return false;
        const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
        return videoExtensions.some(ext => media.filename?.toLowerCase().endsWith(ext));
    };

    return (
        <div className="relative">
            {/* Hero section */}
            <div className="px-6 md:px-16 lg:px-36 py-20 md:py-36 lg:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium">{data.heroTitle}</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">{data.heroSubtitle}</p>
            </div>

            {/* 1st Services section */}
            <div className="bg-blue py-8 md:py-10 px-6 md:px-16">
                <div className="flex flex-col gap-10">
                    {firstSectionServices.map((service) => (
                        <div key={service.title} className="flex flex-col lg:flex-row items-center gap-6 relative">
                            <div className="w-full lg:w-1/2 border-[.5px] border-red relative">
                                {getImageSrc(service) && !(typeof service.image === 'object' && service.image && isVideo(service.image as MediaItem)) && (
                                    <Image 
                                        src={getImageSrc(service)} 
                                        alt={service.title} 
                                        width={600} 
                                        height={400} 
                                        className="w-full h-full object-cover" 
                                    />
                                )}
                                {getVideoSrc(service) && (
                                    <VideoPlayer 
                                        src={getVideoSrc(service)!} 
                                        poster={getPosterSrc(service)} 
                                        className="w-full h-[400px]" 
                                    />
                                )}
                            </div>
                            {renderIcon(service)}
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">{service.title}</h1>
                                {service.subtitle && (
                                    <p className="text-lg md:text-xl lg:text-[23px] font-light mb-4">{service.subtitle}</p>
                                )}
                                <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">{service.description}</p>
                                <div className="flex items-end gap-2 justify-center lg:justify-start">
                                    <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-12" />
                                    <Link href={`/portfolio/${service.portfolioSlug}`}>
                                        <span className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer">
                                            {service.linkText || 'photos'}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rates section */}
            <div className='py-8 md:py-10 px-6 md:px-16 bg-red'>
                <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                    {/* Content plans */}
                    <div className="flex-1 relative pt-6 flex flex-col">
                        <div className="absolute inset-x-0 top-0 h-12 bg-blue rounded-t-3xl"></div>
                        <div className="bg-white rounded-3xl p-6 lg:p-4 xl:p-6 flex-1 text-center h-full flex flex-col justify-between relative">
                            <div>
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">{data.pricingSection.contentPlans.title}</h2>
                                <p className="text-lg md:text-[23px] font-light mb-6">{data.pricingSection.contentPlans.subtitle}</p>
                                <div className="h-[2px] bg-red mb-6"></div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">{data.pricingSection.contentPlans.starterPackTitle}</h2>
                                <p className="text-lg md:text-[23px] font-light mb-8">{data.pricingSection.contentPlans.starterPackDescription}</p>
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">{data.pricingSection.contentPlans.brandBuilderTitle}</h2>
                                <p className="text-lg md:text-[23px] font-light">{data.pricingSection.contentPlans.brandBuilderDescription}</p>
                            </div>
                        </div>
                    </div>

                    {/* Flash deals */}
                    <div className="flex-1 relative pt-6 flex flex-col">
                        <div className="absolute inset-x-0 top-0 h-12 bg-blue rounded-t-3xl"></div>
                        <div className="bg-white rounded-3xl p-6 lg:p-4 xl:p-6 flex-1 text-center h-full flex flex-col justify-between relative">
                            <div>
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">{data.pricingSection.flashDeals.title}</h2>
                                <p className="text-lg md:text-[23px] font-light mb-6">{data.pricingSection.flashDeals.subtitle}</p>
                                <div className="h-[2px] bg-red mb-6"></div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">{data.pricingSection.flashDeals.focusTitle}</h2>
                                <p className="text-lg md:text-[23px] font-light mb-8">{data.pricingSection.flashDeals.focusDescription}</p>
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">{data.pricingSection.flashDeals.fullFrameTitle}</h2>
                                <p className="text-lg md:text-[23px] font-light">{data.pricingSection.flashDeals.fullFrameDescription}</p>
                            </div>
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div className="flex-1 relative pt-6 flex flex-col">
                        <div className="absolute inset-x-0 top-0 h-12 bg-blue rounded-t-3xl"></div>
                        <div className="bg-white rounded-3xl p-6 lg:p-4 xl:p-6 flex-1 text-center h-full flex flex-col justify-between relative">
                            <div>
                                <h2 className="text-3xl md:text-4xl mb-4 font-medium">{data.pricingSection.addOns.title}</h2>
                                <div className="h-[2px] bg-red mb-4"></div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                {(data.pricingSection.addOns.items as { name: string }[]).map((item, index) => (
                                    <p key={index} className="text-xl md:text-[27px] font-light">{item.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Our rates */}
                    <div className="flex-1 text-white text-center lg:text-left mt-6 lg:mt-0 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl xl:text-6xl mb-4 font-medium">{data.pricingSection.ourRates.title}</h1>
                        <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3 leading-tight">{data.pricingSection.ourRates.description}</p>
                        <div className="flex items-end gap-2 justify-center lg:justify-start">
                            <SwirlArrow className="w-10 h-10 md:w-12 md:h-12" color="white" />
                            <Link href={data.pricingSection.ourRates.linkUrl || "#"}>
                                <span className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer">
                                    {data.pricingSection.ourRates.linkText}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2nd Services section */}
            <div className="bg-blue py-8 md:py-10 px-6 md:px-16">
                <div className="flex flex-col gap-10">
                    {secondSectionServices.map((service) => (
                        <div key={service.title} className="flex flex-col lg:flex-row items-center gap-6 relative">
                            <div className="w-full lg:w-1/2 border-[.5px] border-red relative">
                                {getImageSrc(service) && !(typeof service.image === 'object' && service.image && isVideo(service.image as MediaItem)) && (
                                    <Image 
                                        src={getImageSrc(service)} 
                                        alt={service.title} 
                                        width={600} 
                                        height={400} 
                                        className="w-full h-full object-cover" 
                                    />
                                )}
                                {getVideoSrc(service) && (
                                    <VideoPlayer src={getVideoSrc(service)!} className="w-full h-[400px]" />
                                )}
                            </div>
                            {renderIcon(service)}
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">{service.title}</h1>
                                {service.subtitle && (
                                    <p className="text-lg md:text-xl lg:text-[23px] font-light mb-4">{service.subtitle}</p>
                                )}
                                <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">{service.description}</p>
                                <div className="flex items-end gap-2 justify-center lg:justify-start">
                                    <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-12" />
                                    <Link href={`/portfolio/${service.portfolioSlug}`}>
                                        <span className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer">
                                            {service.linkText || 'photos'}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
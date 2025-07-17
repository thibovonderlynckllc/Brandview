import MasonryGallery from './components/MasonryGallery';
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@/payload.config';

interface ServiceCard {
    title: string;
    description?: string;
    icon?: string | { url: string; alt?: string } | null;
    link?: string;
}

interface PageData {
    heroText: string;
    serviceCards: ServiceCard[];
}

export default async function Home() {
    // Fallback data
    const fallbackData: PageData = {
        heroText: "Hire brandview for short content, (corporate) events, portraits, product, business and food photography. And so much more...",
        serviceCards: [
            { title: "short content", description: "", icon: null, link: "/portfolio/short-content" },
            { title: "food", description: "", icon: null, link: "/portfolio/food" },
            { title: "portraits", description: "", icon: "/images/icons/camera.svg", link: "/portfolio/portraits" },
            { title: "business", description: "", icon: null, link: "/portfolio/business" }
        ]
    };

    // Try to fetch dynamic data
    let pageData = fallbackData;
    try {
        const payload = await getPayload({ config });
        const pages = await payload.find({
            // @ts-ignore Payload types do not include 'pages' but it is valid
            collection: 'pages',
            where: {
                and: [
                    {
                        slug: {
                            equals: 'home'
                        }
                    },
                    {
                        pageType: {
                            equals: 'home'
                        }
                    }
                ]
            }
        });

        if (pages.docs.length > 0) {
            const homePage = pages.docs[0] as unknown as PageData;
            pageData = {
                heroText: homePage.heroText || fallbackData.heroText,
                serviceCards: homePage.serviceCards && homePage.serviceCards.length > 0 
                    ? homePage.serviceCards 
                    : fallbackData.serviceCards
            };
        }
    } catch (error) {
        console.log('Using fallback data:', error);
        // Use fallback data if Payload fails
    }

    return (
        <div>
            <div className="px-8 sm:px-16 bg-blue pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pageData.serviceCards.map((item, index) => (
                        <Link 
                            key={item.link || index} 
                            href={item.link || '#'} 
                            className={`cursor-pointer transform transition-transform duration-300 hover:scale-102 group ${item.icon ? 'z-10' : ''}`}
                        >
                            <div className="relative pt-6">
                                <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                                <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative">
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                            <span className="text-[23px] font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue">
                                                {item.title}
                                            </span>
                                        </div>
                                    </div>
                                    {item.icon && (
                                        <div className="absolute bottom-0 -right-6 lg:-right-26 sm:-right-15 sm:-bottom-5 lg:-bottom-23 w-32 sm:w-40 lg:w-48 rotate-10 z-10 transition-transform duration-300 group-hover:rotate-12">
                                            {typeof item.icon === 'string' ? (
                                                <Image 
                                                    src={item.icon} 
                                                    alt={`${item.title} icon`} 
                                                    width={192}
                                                    height={192}
                                                />
                                            ) : item.icon?.url ? (
                                                <Image 
                                                    src={item.icon.url} 
                                                    alt={item.icon.alt || `${item.title} icon`} 
                                                    width={192}
                                                    height={192}
                                                />
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <h2 className="text-[2.5rem] font-thin py-10 max-w-[100%] lg:max-w-[60%] leading-none">
                    {pageData.heroText}
                </h2>
            </div>
            
            <div className="bg-blue">
                <MasonryGallery />
            </div>
        </div>
    );
}

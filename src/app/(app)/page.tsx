// Removed automatic revalidation - now using on-demand revalidation
// export const revalidate = 60;
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
    image?: { url: string; alt?: string } | string | null;
    backgroundImage?: string; // legacy fallback
}

interface MasonryGalleryGrid {
    position1?: { url: string; alt?: string } | string | null;
    position2?: { url: string; alt?: string } | string | null;
    position3?: { url: string; alt?: string } | string | null;
    position4?: { url: string; alt?: string } | string | null;
    position5?: { url: string; alt?: string } | string | null;
    position6?: { url: string; alt?: string } | string | null;
    position7?: { url: string; alt?: string } | string | null;
    position8?: { url: string; alt?: string } | string | null;
    position9?: { url: string; alt?: string } | string | null;
    position10?: { url: string; alt?: string } | string | null;
    position11?: { url: string; alt?: string } | string | null;
    position12?: { url: string; alt?: string } | string | null;
    position13?: { url: string; alt?: string } | string | null;
    position14?: { url: string; alt?: string } | string | null;
    position15?: { url: string; alt?: string } | string | null;
    position16?: { url: string; alt?: string } | string | null;
    position17?: { url: string; alt?: string } | string | null;
    position18?: { url: string; alt?: string } | string | null;
}

interface PageData {
    heroText: string;
    serviceCards: ServiceCard[];
    masonryGalleryGrid?: MasonryGalleryGrid | null;
}

export default async function Home() {
    // Fallback data
    const fallbackData: PageData = {
        heroText: "Hire brandview for short content, (corporate) events, portraits, product, business and food photography. And so much more...",
        serviceCards: [
            { 
                title: "short content", 
                description: "", 
                icon: null, 
                link: "/portfolio/short-content",
                backgroundImage: "/images/aboutMe/short-content.webp" // Replace with actual image path
            },
            { 
                title: "food", 
                description: "", 
                icon: null, 
                link: "/portfolio/food",
                backgroundImage: "/images/aboutMe/food.webp" // Replace with actual image path
            },
            { 
                title: "portraits", 
                description: "", 
                icon: "/images/icons/camera.svg", 
                link: "/portfolio/portraits",
                backgroundImage: "/images/aboutMe/Portrait.webp" // Provided placeholder
            },
            { 
                title: "business", 
                description: "", 
                icon: null, 
                link: "/portfolio/business",
                backgroundImage: "/images/aboutMe/business.webp" // Replace with actual image path
            }
        ]
    };

    // Try to fetch dynamic data
    let pageData = fallbackData;
    let masonryGalleryGrid: MasonryGalleryGrid | null = null;
    try {
        const payload = await getPayload({ config });
        const pages = await payload.find({
            // @ts-expect-error Payload types do not include 'pages' but it is valid
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
            const homePage = pages.docs[0] as {
                heroText?: string;
                serviceCards?: ServiceCard[];
                masonryGalleryGrid?: MasonryGalleryGrid | null;
            };
            pageData = {
                heroText: homePage.heroText || fallbackData.heroText,
                serviceCards: homePage.serviceCards && homePage.serviceCards.length > 0 
                    ? homePage.serviceCards 
                    : fallbackData.serviceCards,
                masonryGalleryGrid: homePage.masonryGalleryGrid || null,
            };
            masonryGalleryGrid = homePage.masonryGalleryGrid || null;
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
                        <div className="relative group" key={item.link || index}>
                            <Link 
                                href={item.link || '#'} 
                                className="block cursor-pointer transform transition-transform duration-300 hover:scale-102"
                            >
                                <div className="pt-6">
                                    <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                                    <div className="h-80 w-full rounded-3xl border-[1.5px] border-red relative overflow-hidden">
                                        <Image
                                            src={
                                                (typeof item.image === 'object' && item.image?.url)
                                                    ? item.image.url
                                                    : item.backgroundImage || '/images/aboutMe/Portrait.webp'
                                            }
                                            alt={item.title}
                                            fill
                                            className="object-cover z-0"
                                            priority={index === 0}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                            <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                                <span className="text-[23px] font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {item.icon && (
                                <div className="absolute bottom-0 -right-6 lg:-right-26 sm:-right-15 sm:-bottom-5 lg:-bottom-23 w-32 sm:w-40 lg:w-48 rotate-10 z-[200] pointer-events-none transition-transform duration-300 group-hover:rotate-12 group-hover:scale-102">
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
                    ))}
                </div>
                <h2 className="text-2xl md:text-[2.5rem] font-thin py-10 max-w-[100%] lg:max-w-[60%] leading-none">
                    {pageData.heroText}
                </h2>
            </div>
            
            <div className="bg-blue">
                <MasonryGallery masonryGalleryGrid={masonryGalleryGrid} />
            </div>
        </div>
    );
}
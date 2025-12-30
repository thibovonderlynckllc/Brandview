export const revalidate = 60; // or 300 for 5 minutes
import MasonryGallery from './components/MasonryGallery';
import HomeServiceCard from './components/ServiceCard';
import { getPayload } from 'payload';
import { draftMode } from 'next/headers';
import config from '@/payload.config';

interface ServiceCard {
    title: string;
    description?: string;
    icon?: string | { url: string; alt?: string } | null;
    link?: string;
    image?: { 
        url: string; 
        alt?: string;
        cloudinaryMobileVideo?: string;
        poster?: { url: string; alt?: string } | null;
        mimeType?: string;
    } | string | null;
    backgroundImage?: string; // legacy fallback
}

interface MasonryPosition {
    image?: { url: string; alt?: string } | string | null;
    text?: string;
    link?: string;
}

interface MasonryGalleryGrid {
    position1?: MasonryPosition | { url: string; alt?: string } | string | null;
    position2?: MasonryPosition | { url: string; alt?: string } | string | null;
    position3?: MasonryPosition | { url: string; alt?: string } | string | null;
    position4?: MasonryPosition | { url: string; alt?: string } | string | null;
    position5?: MasonryPosition | { url: string; alt?: string } | string | null;
    position6?: MasonryPosition | { url: string; alt?: string } | string | null;
    position7?: MasonryPosition | { url: string; alt?: string } | string | null;
    position8?: MasonryPosition | { url: string; alt?: string } | string | null;
    position9?: MasonryPosition | { url: string; alt?: string } | string | null;
    position10?: MasonryPosition | { url: string; alt?: string } | string | null;
    position11?: MasonryPosition | { url: string; alt?: string } | string | null;
    position12?: MasonryPosition | { url: string; alt?: string } | string | null;
    position13?: MasonryPosition | { url: string; alt?: string } | string | null;
    position14?: MasonryPosition | { url: string; alt?: string } | string | null;
    position15?: MasonryPosition | { url: string; alt?: string } | string | null;
    position16?: MasonryPosition | { url: string; alt?: string } | string | null;
    position17?: MasonryPosition | { url: string; alt?: string } | string | null;
    position18?: MasonryPosition | { url: string; alt?: string } | string | null;
}

interface PageData {
    heroText: string;
    serviceCards: ServiceCard[];
    masonryGalleryGrid?: MasonryGalleryGrid | null;
}

export default async function Home() {
    const { isEnabled: isDraftMode } = await draftMode();
    
    // Debug draft mode status
    console.log('Homepage - Draft mode status:', isDraftMode);

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
            collection: 'pages' as any,
            depth: 2, // Increase depth to populate nested relations
            draft: isDraftMode,
            limit: 1,
            overrideAccess: isDraftMode,
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
            },
        });

        console.log('Pages query result:', { totalDocs: pages.totalDocs, docsLength: pages.docs.length });
        
        if (pages.docs.length > 0) {
            const homePage = pages.docs[0] as {
                heroText?: string;
                serviceCards?: ServiceCard[];
                masonryGalleryGrid?: MasonryGalleryGrid | null;
            };
            
            console.log('Home page data found:', {
                heroText: homePage.heroText,
                serviceCardsLength: homePage.serviceCards?.length || 0,
                masonryGalleryGrid: !!homePage.masonryGalleryGrid
            });
            
            pageData = {
                heroText: homePage.heroText || fallbackData.heroText,
                serviceCards: homePage.serviceCards && homePage.serviceCards.length > 0 
                    ? homePage.serviceCards 
                    : fallbackData.serviceCards,
                masonryGalleryGrid: homePage.masonryGalleryGrid || null,
            };
            masonryGalleryGrid = homePage.masonryGalleryGrid || null;
        } else {
            console.log('No home page found, using fallback data');
        }
    } catch (error) {
        console.log('Using fallback data:', error);
        // Use fallback data if Payload fails
    }

    return (
        <div>
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
            <div className="px-8 sm:px-16 bg-blue pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pageData.serviceCards.map((item, index) => (
                        <HomeServiceCard
                            key={item.link || index}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            link={item.link}
                            image={item.image}
                            backgroundImage={item.backgroundImage}
                            index={index}
                        />
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
import MasonryGallery from './components/MasonryGallery';
import Image from 'next/image';
import Link from 'next/link';
import { getPageBySlug } from '../../lib/payload';

interface PortfolioItem {
    title: string;
    slug: string;
    icon: string | null;
}

export default async function Home() {
    // Fetch homepage data from CMS
    const pageData = await getPageBySlug('homepage');
    
    // Fallback data in case CMS data is not available
    const defaultHeroText = "Hire brandview for short content, (corporate) events, portraits, product, business and food photography. And so much more...";
    const defaultPortfolioItems: PortfolioItem[] = [
        { title: "Short content", slug: "short-content", icon: null },
        { title: "food", slug: "food", icon: null },
        { title: "portraits", slug: "portraits", icon: "/images/icons/camera.svg" },
        { title: "business", slug: "business", icon: null }
    ];

    const heroText = pageData?.content?.heroText || defaultHeroText;
    const portfolioItems: PortfolioItem[] = pageData?.content?.portfolioItems || defaultPortfolioItems;

    return (
        <div>
            <div className="px-8 sm:px-16 bg-blue pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {portfolioItems.map((item: PortfolioItem) => (
                        <Link 
                            key={item.slug} 
                            href={`/portfolio/${item.slug}`} 
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
                                            <Image 
                                                src={item.icon} 
                                                alt={`${item.title} icon`} 
                                                width={192}
                                                height={192}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <h2 className="text-[2.5rem] font-thin py-10 max-w-[100%] lg:max-w-[60%] leading-none">
                    {heroText}
                </h2>
            </div>
            
            <div className="bg-blue">
                <MasonryGallery />
            </div>
        </div>
    );
}

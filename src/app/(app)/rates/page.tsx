import Image from 'next/image';
import { getPayload } from 'payload';
import config from '../../../payload.config';

// Fallback data
const fallbackData = {
    ratesHeroTitle: "A fixed package or customized?",
    ratesHeroSubtitle: "rates",
    ratesPricingSection: {
        contentPlans: {
            title: "content plans",
            subtitle: "monthly packages",
            starterPack: {
                title: "starter pack",
                description: "= basic package",
                features: [
                    { feature: "1 video per month" },
                    { feature: "5 photos per month" },
                    { feature: "Basic editing" },
                    { feature: "Social media optimization" },
                ],
                price: "€ 450 exclusive btw"
            },
            brandBuilder: {
                title: "brand builder",
                description: "= pro package",
                features: [
                    { feature: "2 videos per month" },
                    { feature: "10 photos per month" },
                    { feature: "Advanced editing" },
                    { feature: "Social media optimization" },
                    { feature: "Content strategy consultation" },
                ],
                price: "€ 850 exclusive btw"
            }
        },
        flashDeals: {
            title: "flash deals",
            subtitle: "one-time collaboration",
            focus: {
                title: "focus",
                description: "= basic package",
                features: [
                    { feature: "1 video" },
                    { feature: "5 photos" },
                    { feature: "Basic editing" },
                    { feature: "Social media optimization" },
                ],
                price: "€ 450 exclusive btw"
            },
            fullFrame: {
                title: "full frame",
                description: "= pro package",
                features: [
                    { feature: "2 videos" },
                    { feature: "10 photos" },
                    { feature: "Advanced editing" },
                    { feature: "Social media optimization" },
                    { feature: "Content strategy consultation" },
                ],
                price: "€ 850 exclusive btw"
            }
        },
        addOns: {
            title: "add-ons",
            subtitle: "optional extras",
            boostersTitle: "boosters",
            items: [
                { name: "extra video", price: "€ 450 exclusive btw" },
                { name: "10 extra photo's", price: "€ 150 exclusive btw" },
                { name: "fast delivery 48h", price: "€ 100 exclusive btw" },
                { name: "fast delivery 72h", price: "€ 150 exclusive btw" },
                { name: "stylist on set", price: "€ 500 exclusive btw" },
                { name: "subtitles", price: "€ 50 exclusive btw" }
            ],
            megaphoneIcon: "/images/icons/megaphone.svg"
        }
    }
};

async function getRatesData() {
    const payload = await getPayload({ config });
    try {
        const pages = await payload.find({
            collection: 'pages' as any,
            where: {
                slug: { equals: 'rates' }
            },
            limit: 1
        });
        
        if (pages.docs.length > 0) {
            const pageData = pages.docs[0];
            // If it's a rates page, return the data, otherwise use fallback
            if (pageData.pageType === 'rates') {
                return pageData;
            }
        }
        return fallbackData;
    } catch (error) {
        console.warn('Error fetching rates data:', error);
        return fallbackData;
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour, revalidate on demand

interface RatesData {
    ratesHeroTitle: string;
    ratesHeroSubtitle: string;
    ratesPricingSection: {
        contentPlans: {
            title: string;
            subtitle: string;
            starterPack: {
                title: string;
                description: string;
                features: Array<{ feature: string }>;
                price: string;
            };
            brandBuilder: {
                title: string;
                description: string;
                features: Array<{ feature: string }>;
                price: string;
            };
        };
        flashDeals: {
            title: string;
            subtitle: string;
            focus: {
                title: string;
                description: string;
                features: Array<{ feature: string }>;
                price: string;
            };
            fullFrame: {
                title: string;
                description: string;
                features: Array<{ feature: string }>;
                price: string;
            };
        };
        addOns: {
            title: string;
            subtitle: string;
            boostersTitle: string;
            items: Array<{ name: string; price: string }>;
            megaphoneIcon?: { url: string; alt?: string } | string | null;
        };
    };
}

export default async function RatesPage() {
    const data: RatesData = await getRatesData();

    const getIconSrc = (icon: { url: string; alt?: string } | string | null | undefined, fallback: string) => {
        if (typeof icon === 'object' && icon !== null && 'url' in icon) return icon.url;
        if (typeof icon === 'string') return icon;
        return fallback;
    };

    return (
        <div>
            {/* Hero section */}
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium">{data.ratesHeroTitle}</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">{data.ratesHeroSubtitle}</p>
            </div>

            <div className="bg-blue pt-10">
                <div className="px-8 sm:px-16">
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-center mb-2">{data.ratesPricingSection.contentPlans.title}</h1>
                    <p className="text-lg md:text-[23px] font-light text-center mb-8 md:mb-15">{data.ratesPricingSection.contentPlans.subtitle}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {/* Starter Pack */}
                        <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-medium mb-2">{data.ratesPricingSection.contentPlans.starterPack.title}</h2>
                                <p className="text-lg md:text-xl font-light mb-4">{data.ratesPricingSection.contentPlans.starterPack.description}</p>
                                <div className="text-2xl md:text-3xl font-medium text-red">{data.ratesPricingSection.contentPlans.starterPack.price}</div>
                            </div>
                            <ul className="space-y-4">
                                {data.ratesPricingSection.contentPlans.starterPack.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-red rounded-full mr-4"></div>
                                        <span className="text-lg font-light">{feature.feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Brand Builder */}
                        <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-medium mb-2">{data.ratesPricingSection.contentPlans.brandBuilder.title}</h2>
                                <p className="text-lg md:text-xl font-light mb-4">{data.ratesPricingSection.contentPlans.brandBuilder.description}</p>
                                <div className="text-2xl md:text-3xl font-medium text-red">{data.ratesPricingSection.contentPlans.brandBuilder.price}</div>
                            </div>
                            <ul className="space-y-4">
                                {data.ratesPricingSection.contentPlans.brandBuilder.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-red rounded-full mr-4"></div>
                                        <span className="text-lg font-light">{feature.feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Flash Deals */}
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-center mb-2">{data.ratesPricingSection.flashDeals.title}</h1>
                    <p className="text-lg md:text-[23px] font-light text-center mb-8 md:mb-15">{data.ratesPricingSection.flashDeals.subtitle}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {/* Focus */}
                        <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-medium mb-2">{data.ratesPricingSection.flashDeals.focus.title}</h2>
                                <p className="text-lg md:text-xl font-light mb-4">{data.ratesPricingSection.flashDeals.focus.description}</p>
                                <div className="text-2xl md:text-3xl font-medium text-red">{data.ratesPricingSection.flashDeals.focus.price}</div>
                            </div>
                            <ul className="space-y-4">
                                {data.ratesPricingSection.flashDeals.focus.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-red rounded-full mr-4"></div>
                                        <span className="text-lg font-light">{feature.feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Full Frame */}
                        <div className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-medium mb-2">{data.ratesPricingSection.flashDeals.fullFrame.title}</h2>
                                <p className="text-lg md:text-xl font-light mb-4">{data.ratesPricingSection.flashDeals.fullFrame.description}</p>
                                <div className="text-2xl md:text-3xl font-medium text-red">{data.ratesPricingSection.flashDeals.fullFrame.price}</div>
                            </div>
                            <ul className="space-y-4">
                                {data.ratesPricingSection.flashDeals.fullFrame.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-red rounded-full mr-4"></div>
                                        <span className="text-lg font-light">{feature.feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div className="text-center mb-15">
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-light mb-2">{data.ratesPricingSection.addOns.title}</h1>
                        <p className="text-lg md:text-[23px] font-light mb-4">{data.ratesPricingSection.addOns.subtitle}</p>
                        <h2 className="text-2xl md:text-3xl font-medium mb-8">{data.ratesPricingSection.addOns.boostersTitle}</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {data.ratesPricingSection.addOns.items.map((item, index) => (
                                <div key={index} className="bg-white rounded-3xl border-[1.5px] border-red p-6">
                                    <div className="text-center">
                                        <p className="text-lg font-medium mb-2">{item.name}</p>
                                        <p className="text-lg font-light text-red">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-15">
                            <Image 
                                src={getIconSrc(data.ratesPricingSection.addOns.megaphoneIcon, "/images/icons/megaphone.svg")} 
                                alt="Megaphone Icon" 
                                width={100} 
                                height={100} 
                                className="mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
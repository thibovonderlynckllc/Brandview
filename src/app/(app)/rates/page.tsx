import Image from 'next/image';

// Fallback data
const fallbackData = {
    ratesHeroTitle: "A fixed package or customized?",
    ratesHeroSubtitle: "our rates",
    ratesPricingSection: {
        contentPlans: {
            title: "content plans",
            subtitle: "monthly packages (min. 6 months)",
            starterPack: {
                title: "starter pack",
                description: "= basic package",
                features: [
                    { feature: "2 shortform videos (max. 30 sec)" },
                    { feature: "8 edited photos" },
                    { feature: "professional lightning" },
                    { feature: "Simple image correction & color editing" },
                    { feature: "Basic post-processing in your house style" },
                    { feature: "Delivery within 14 working days" }
                ],
                price: "€ 950 exclusive btw"
            },
            brandBuilder: {
                title: "brand builder",
                description: "= pro package",
                features: [
                    { feature: "12 edited photos" },
                    { feature: "4 shortform video (max. 30 sec)" },
                    { feature: "creative on set" },
                    { feature: "Simple image correction & color editing" },
                    { feature: "Basic post-processing in your house style" },
                    { feature: "Delivery within 14 working days" }
                ],
                price: "€ 1.470 exclusive btw"
            }
        },
        flashDeals: {
            title: "flash deals",
            subtitle: "one-time collaboration (1 month)",
            focus: {
                title: "focus",
                description: "= basic package",
                features: [
                    { feature: "2 shortform videos (max. 30 sec)" },
                    { feature: "8 edited photos" },
                    { feature: "professional lightning" },
                    { feature: "Simple image correction & color editing" },
                    { feature: "Basic post-processing in your house style" },
                    { feature: "Delivery within 14 working days" }
                ],
                price: "€ 1.100 exclusive btw"
            },
            fullFrame: {
                title: "full frame",
                description: "= pro package",
                features: [
                    { feature: "12 edited photos" },
                    { feature: "4 shortform video (max. 30 sec)" },
                    { feature: "creative on set" },
                    { feature: "Simple image correction & color editing" },
                    { feature: "Basic post-processing in your house style" },
                    { feature: "Delivery within 14 working days" }
                ],
                price: "€ 1.570 exclusive btw"
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
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/pages?where[slug][equals]=rates`);
        if (!response.ok) {
            console.warn('Failed to fetch rates data, using fallback');
            return fallbackData;
        }
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
            const pageData = data.docs[0];
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

const RatesPage = async () => {
    const data: RatesData = await getRatesData();

    const getIconSrc = (icon: any, fallback: string) => {
        if (icon?.url) return icon.url;
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-6 text-center pb-10">
                        {/* Starter pack */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">{data.ratesPricingSection.contentPlans.starterPack.title}</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">{data.ratesPricingSection.contentPlans.starterPack.description}</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    {data.ratesPricingSection.contentPlans.starterPack.features.map((item, index) => (
                                        <p key={index}>{item.feature}</p>
                                    ))}
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">{data.ratesPricingSection.contentPlans.starterPack.price}</p>
                                </div>
                            </div>
                        </div>
                        {/* Brand builder */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">{data.ratesPricingSection.contentPlans.brandBuilder.title}</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">{data.ratesPricingSection.contentPlans.brandBuilder.description}</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    {data.ratesPricingSection.contentPlans.brandBuilder.features.map((item, index) => (
                                        <p key={index}>{item.feature}</p>
                                    ))}
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">{data.ratesPricingSection.contentPlans.brandBuilder.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-center mb-2">{data.ratesPricingSection.flashDeals.title}</h1>
                    <p className="text-lg md:text-[23px] font-light text-center mb-8 md:mb-15">{data.ratesPricingSection.flashDeals.subtitle}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-6 text-center pb-10">
                        {/* Focus */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">{data.ratesPricingSection.flashDeals.focus.title}</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">{data.ratesPricingSection.flashDeals.focus.description}</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    {data.ratesPricingSection.flashDeals.focus.features.map((item, index) => (
                                        <p key={index}>{item.feature}</p>
                                    ))}
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">{data.ratesPricingSection.flashDeals.focus.price}</p>
                                </div>
                            </div>
                        </div>
                        {/* Full frame */}
                        <div className="relative pt-6 h-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">{data.ratesPricingSection.flashDeals.fullFrame.title}</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <p className="text-lg md:text-[23px] font-light text-center mb-4 pb-4 border-b-2 border-red">{data.ratesPricingSection.flashDeals.fullFrame.description}</p>
                                <div className="flex flex-col gap-2 text-base sm:text-lg md:text-[23px] font-light">
                                    {data.ratesPricingSection.flashDeals.fullFrame.features.map((item, index) => (
                                        <p key={index}>{item.feature}</p>
                                    ))}
                                </div>
                                <div className="mt-auto border-t-2 border-red">
                                    <p className="text-lg md:text-[23px] font-light pt-4">{data.ratesPricingSection.flashDeals.fullFrame.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-light text-center mb-2">{data.ratesPricingSection.addOns.title}</h1>
                    <p className="text-lg md:text-[23px] font-light text-center mb-8 md:mb-15">{data.ratesPricingSection.addOns.subtitle}</p>
                    <div className="flex justify-center pb-10">
                        {/* Boosters */}
                        <div className="relative pt-6 w-full md:w-[min(100%,800px)]">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue border-[2px] border-red flex items-center justify-center z-10 px-4 sm:px-8 py-4 sm:py-6 rounded-full">
                                <span className="text-2xl sm:text-3xl md:text-[3rem] font-medium leading-none whitespace-nowrap">{data.ratesPricingSection.addOns.boostersTitle}</span>
                            </div>
                            <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                            <div className="bg-white w-full h-full rounded-3xl border-2 border-red relative py-8 px-4 md:px-15 pt-16 flex flex-col">
                                <div className="absolute -top-20 right-0 md:-right-10 md:-top-40 lg:-right-25 w-18 sm:w-24 lg:w-52 md:w-42 2xl:w-64 2xl:-top-48 2xl:-right-54">
                                    <Image 
                                        src={getIconSrc(data.ratesPricingSection.addOns.megaphoneIcon, "/images/icons/megaphone.svg")} 
                                        alt="Megaphone" 
                                        width={256} 
                                        height={256} 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-base sm:text-lg md:text-[23px] font-light relative">
                                    <div className="flex flex-col items-end gap-4 pr-4 md:pr-8">
                                        {data.ratesPricingSection.addOns.items.map((item: { name: string; price: string }, index: number) => (
                                            <p key={index}>{item.name}</p>
                                        ))}
                                    </div>
                                    <div className="flex flex-col items-start gap-4 pl-4 md:pl-8 border-l-2 border-red">
                                        {data.ratesPricingSection.addOns.items.map((item: { name: string; price: string }, index: number) => (
                                            <p key={index}>{item.price}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 sm:px-16">
                    <div className="h-[2px] bg-red w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default RatesPage;
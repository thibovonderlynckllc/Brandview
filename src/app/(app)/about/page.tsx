import Image from 'next/image';

// Fallback data
const fallbackData = {
    aboutHeroTitle: "Less posing. More presence. \nWe capture the real story behind your brand.",
    aboutHeroSubtitle: "about us",
    whatSetsUsApartTitle: "what sets us apart…",
    aboutCards: [
        {
            number: "1",
            title: "young & driven",
            description: "We're a young team raised in the world of TikTok, Instagram and fast-paced visual culture. We understand what works on screen and in the scroll. And we bring that fresh perspective to every project.",
        },
        {
            number: "2",
            title: "small team, big focus",
            description: "Being a small team means smooth communication and hands-on production. No slow approvals or unclear contacts. You work directly with the maker who shapes your content.",
        },
        {
            number: "3",
            title: "from concept to creation",
            description: "We're not just executors, we help shape the idea too. Whether you need one visual or a full campaign, we think creatively and deliver with technical precision to make your content cohesive and effective.",
        },
    ],
    founderSection: {
        subtitle: "creative force & founder",
        name: "Reinout Ghijs",
        description: "A visual storyteller with a sharp eye for detail and a passion for purposeful content. I create short-form content, guide video productions and contribute to concept development and visual strategy.\n\nAt Foodphoto Ghent, I worked on projects for brands like Alpro, Lotus, Danone, Quick, and Vandemoortele. That experience shaped my professional approach to content. Efficient, creative, and always visually polished.\n\nWith Brandview, I focus on delivering sharp, brand-driven visuals that make an impact. From short video stories to styled photography, I merge technical skill with creative intuition to help businesses stand out.",
        brandviewIcon: "/images/icons/brandview.svg",
        personIcon: "/images/icons/person.svg",
    },
    whatWeDoSection: {
        title: "what we do",
        description: "At Brandview, we offer a versatile and focused range of services to help businesses grow through strong visual communication:",
        services: [
            {
                title: "business photography",
                description: "Professional imagery that reflects and enhances your brand identity.",
            },
            {
                title: "(corporate) event photography",
                description: "Candid, atmospheric images that capture key moments and energy.",
            },
            {
                title: "food photography",
                description: "Mouthwatering visuals that make your dishes stand out.",
            },
            {
                title: "product photography",
                description: "Clean, scroll-stopping shots for webshops, ads or catalogues.",
            },
            {
                title: "portraits",
                description: "Authentic and approachable images of you or your team.",
            },
            {
                title: "short content",
                description: "Fast-paced, engaging videos tailor-made for social media. From concept to final edit.",
            },
        ],
        bulbIcon: "/images/icons/bulb.svg",
    },
};

async function getAboutData() {
    try {
        // During build time, use fallback data
        if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SERVER_URL) {
            return fallbackData;
        }
        
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/pages?where[slug][equals]=about`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });
        
        if (!response.ok) {
            console.warn('Failed to fetch about data, using fallback');
            return fallbackData;
        }
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
            const pageData = data.docs[0];
            // If it's an about page, return the data, otherwise use fallback
            if (pageData.pageType === 'about') {
                return pageData;
            }
        }
        return fallbackData;
    } catch (error) {
        console.warn('Error fetching about data:', error);
        return fallbackData;
    }
}

interface AboutCard {
    number: string;
    title: string;
    description: string;
}

interface MediaItem {
    url: string;
    alt?: string;
}

interface AboutData {
    aboutHeroTitle: string;
    aboutHeroSubtitle: string;
    whatSetsUsApartTitle: string;
    aboutCards: AboutCard[];
    founderSection: {
        subtitle: string;
        name: string;
        description: string;
        founderImage?: MediaItem;
        brandviewIcon?: MediaItem;
        personIcon?: MediaItem;
    };
    whatWeDoSection: {
        title: string;
        description: string;
        services: Array<{
            title: string;
            description: string;
        }>;
        bulbIcon?: MediaItem;
    };
}

const AboutPage = async () => {
    const data: AboutData = await getAboutData();

    const getIconSrc = (icon: MediaItem | string | undefined, fallback: string) => {
        if (icon && typeof icon === 'object' && icon.url) return icon.url;
        if (typeof icon === 'string') return icon;
        return fallback;
    };

    return (
        <div>
            <div className="px-8 sm:px-16 py-20 md:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-3xl md:text-6xl font-medium">
                        {data.aboutHeroTitle.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < data.aboutHeroTitle.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">{data.aboutHeroSubtitle}</p>
            </div>
            <div className="bg-blue pt-10">
                <div className="px-8 sm:px-16">
                    <h1 className="text-4xl md:text-6xl font-light text-center mb-15">{data.whatSetsUsApartTitle}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-6 text-center pb-10">
                        {data.aboutCards.map((card, index) => (
                            <div key={index} className={`relative pt-6 h-full ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 bg-blue rounded-full border-[2px] border-red flex items-center justify-center z-10">
                                    <span className="text-[5.3rem] font-light leading-none flex items-center justify-center">{card.number}</span>
                                </div>
                                <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                                <div className="bg-white w-full h-full rounded-3xl border-[1.5px] border-red relative p-8 pt-18 flex flex-col">
                                    <h2 className="text-4xl font-medium text-red text-center mb-6">{card.title}</h2>
                                    <p className="text-lg xl:text-[23px] font-light leading-tight text-red">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 mb-20 xl:mb-40 px-8 sm:px-16 xl:pl-0 xl:pr-16">
                    <div className="w-full xl:w-1/2 flex justify-center">
                        <div 
                            className="w-full aspect-square gallery-item relative"
                            style={{
                                backgroundImage: data.founderSection.founderImage?.url 
                                    ? `url(${data.founderSection.founderImage.url})` 
                                    : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <Image 
                                src={getIconSrc(data.founderSection.brandviewIcon, "/images/icons/brandview.svg")} 
                                alt="Brandview logo" 
                                width={208} 
                                height={208} 
                                className="absolute -bottom-10 rotate-8 -right-5 md:-bottom-20 xl:-bottom-40 xl:-right-20 w-32 sm:w-40 lg:w-48"
                            />
                            <Image 
                                src={getIconSrc(data.founderSection.personIcon, "/images/icons/person.svg")} 
                                alt="Person icon" 
                                width={208} 
                                height={208} 
                                className="absolute left-52 -bottom-30 md:left-80 md:-bottom-25 xl:left-35 xl:-bottom-30 w-32 sm:w-40 lg:w-48 2xl:left-60 2xl:-bottom-50 hidden sm:block"
                            />
                        </div>
                    </div>
                    <div className="w-full xl:w-1/2 flex flex-col gap-4 mt-6 xl:mt-0 justify-center">
                        <p className="text-xl xl:text-[23px] font-light font-medium">{data.founderSection.subtitle}</p>
                        <h1 className="text-4xl md:text-6xl font-medium">{data.founderSection.name}</h1>
                        <p className="text-lg xl:text-[23px] font-light leading-tight">
                            {data.founderSection.description.split('\n\n').map((paragraph, index) => (
                                <span key={index}>
                                    {paragraph}
                                    {index < data.founderSection.description.split('\n\n').length - 1 && <><br /><br /></>}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col-reverse xl:flex-row gap-4 mt-6 px-8 sm:px-16 xl:pl-16 xl:pr-0">
                    <div className="w-full xl:w-1/2 flex flex-col gap-4 justify-center">
                        <h1 className="text-4xl md:text-6xl font-medium">{data.whatWeDoSection.title}</h1>
                        <p className="text-lg xl:text-[23px] font-light leading-tight mb-4">{data.whatWeDoSection.description}</p>
                        {data.whatWeDoSection.services.map((service, index) => (
                            <div key={index}>
                                <p className="font-medium text-xl xl:text-[23px]">{service.title}</p>
                                <p className="text-lg xl:text-[23px] font-light">{service.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full xl:w-1/2 flex justify-center">
                        <div className="w-full aspect-square gallery-item relative">
                            <Image 
                                src={getIconSrc(data.whatWeDoSection.bulbIcon, "/images/icons/bulb.svg")} 
                                alt="Bulb icon" 
                                width={208} 
                                height={208} 
                                className="absolute -top-15 xl:-top-40 xl:left-15 -rotate-3 left-15 w-32 sm:w-40 lg:w-48"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-8 sm:px-16 pt-10">
                    <div className="h-[2px] bg-red w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
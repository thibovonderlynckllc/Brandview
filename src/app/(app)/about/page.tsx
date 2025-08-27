import Image from 'next/image';
import { getPayload } from 'payload';
import config from '../../../payload.config';

// Fallback data
const fallbackData = {
    aboutHeroTitle: "We are brandview.\nWe create visual stories.",
    aboutHeroSubtitle: "about us",
    whatSetsUsApartTitle: "What sets us apart?",
    aboutCards: [
        {
            number: "1",
            title: "creative vision",
            description: "We don't just take photos or shoot videos. We craft visual narratives that tell your story in the most compelling way possible.",
        },
        {
            number: "2",
            title: "attention to detail",
            description: "Every frame, every angle, every moment is carefully considered to ensure the final result exceeds your expectations.",
        },
        {
            number: "3",
            title: "collaborative approach",
            description: "We work closely with you throughout the entire process, from concept to final delivery, ensuring your vision comes to life.",
        },
    ],
    founderSection: {
        subtitle: "meet the founder",
        name: "Reinout",
        description: "With over a decade of experience in visual storytelling, Reinout has developed a unique style that combines technical excellence with creative vision. His passion for capturing authentic moments and telling compelling stories has made him a trusted partner for businesses and individuals alike.",
        founderImage: "/images/aboutMe/Portrait.webp",
        brandviewIcon: "/images/logo.svg",
        personIcon: "/images/icons/person.svg",
    },
    whatWeDoSection: {
        title: "What we do",
        description: "We specialize in creating high-quality visual content that helps businesses and individuals tell their stories. From product photography to corporate events, from portraits to food photography, we bring your vision to life with creativity and precision.",
        services: [
            {
                title: "Product Photography",
                description: "Showcase your products in their best light with professional product photography that drives sales.",
            },
            {
                title: "Corporate Events",
                description: "Capture the energy and professionalism of your corporate events with dynamic event photography.",
            },
            {
                title: "Portrait Photography",
                description: "Professional portraits that capture personality and professionalism for individuals and teams.",
            },
            {
                title: "Food Photography",
                description: "Mouth-watering food photography that showcases your culinary creations and drives customer engagement.",
            },
            {
                title: "Short Content",
                description: "Engaging short-form video content for social media that tells your story and connects with your audience.",
            },
        ],
        bulbIcon: "/images/icons/bulb.svg",
    },
};

async function getAboutData() {
    const payload = await getPayload({ config });
    try {
        const pages = await payload.find({
            collection: 'pages' as any,
            where: {
                slug: { equals: 'about' }
            },
            limit: 1
        });
        
        if (pages.docs.length > 0) {
            const pageData = pages.docs[0];
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

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour, revalidate on demand

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

export default async function AboutPage() {
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
                                <div className="bg-white rounded-3xl border-[1.5px] border-red p-8 h-full flex flex-col justify-center">
                                    <h2 className="text-2xl md:text-3xl font-medium mb-4">{card.title}</h2>
                                    <p className="text-lg md:text-xl font-light">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Founder Section */}
            <div className="px-8 sm:px-16 py-20 md:py-55">
                <div className="text-center mb-15">
                    <p className="text-xl md:text-2xl font-light mb-4">{data.founderSection.subtitle}</p>
                    <h1 className="text-4xl md:text-6xl font-medium">{data.founderSection.name}</h1>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            <Image 
                                src={getIconSrc(data.founderSection.founderImage, "/images/aboutMe/Portrait.webp")} 
                                alt="Founder Portrait" 
                                width={600} 
                                height={800} 
                                className="w-full h-auto rounded-3xl"
                            />
                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue rounded-full border-[2px] border-red flex items-center justify-center">
                                <Image 
                                    src={getIconSrc(data.founderSection.brandviewIcon, "/images/logo.svg")} 
                                    alt="Brandview Logo" 
                                    width={80} 
                                    height={80} 
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue rounded-full border-[2px] border-red flex items-center justify-center">
                                <Image 
                                    src={getIconSrc(data.founderSection.personIcon, "/images/icons/person.svg")} 
                                    alt="Person Icon" 
                                    width={80} 
                                    height={80} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <p className="text-lg md:text-xl font-light leading-relaxed">{data.founderSection.description}</p>
                    </div>
                </div>
            </div>

            {/* What We Do Section */}
            <div className="bg-blue px-8 sm:px-16 py-20 md:py-55">
                <div className="text-center mb-15">
                    <h1 className="text-4xl md:text-6xl font-medium mb-4">{data.whatWeDoSection.title}</h1>
                    <p className="text-lg md:text-xl font-light max-w-4xl mx-auto">{data.whatWeDoSection.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.whatWeDoSection.services.map((service, index) => (
                        <div key={index} className="bg-white rounded-3xl border-[1.5px] border-red p-8">
                            <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                            <p className="text-lg font-light">{service.description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-15">
                    <Image 
                        src={getIconSrc(data.whatWeDoSection.bulbIcon, "/images/icons/bulb.svg")} 
                        alt="Bulb Icon" 
                        width={100} 
                        height={100} 
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}
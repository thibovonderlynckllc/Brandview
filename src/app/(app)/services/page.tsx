'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SwirlArrow from '../components/SwirlArrow';

const ServicesPage = () => {
    const router = useRouter();

    return (
        <div className="relative">
            {/* Hero section */}
            <div className="px-6 md:px-16 lg:px-36 py-20 md:py-36 lg:py-55 text-center">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium">Visual content that connects and converts.</h1>
                </div>
                <p className="text-xl md:text-2xl font-thin mt-2">services</p>
            </div>

            {/* 1st Services section */}
            <div className="bg-blue py-8 md:py-10 px-6 md:px-16">
                <div className="flex flex-col gap-10">
                    {/* Short content card */}
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <Image src="/images/services/image.png" alt="short content" width={600} height={400} className="w-full lg:w-1/2 border-[.5px] border-red" />
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">short content</h1>
                            <p className="text-lg md:text-xl lg:text-[23px] font-light mb-4">Reels / social content / interviews / trailers</p>
                            <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">Scroll-stopping short content tailored to your brand. 
                                We create bite-sized video stories that engage, inform and 
                                entertain, ideal for social media.</p>
                            <div className="flex items-end gap-2 justify-center lg:justify-start">
                                <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-12" />
                                <span 
                                    onClick={() => router.push('/portfolio/short-content')}
                                    className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer"
                                >
                                    photos
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Long form card */}
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <Image src="/images/services/image.png" alt="short content" width={600} height={400} className="w-full lg:w-1/2 border-[.5px] border-red" />
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">(corporate) events</h1>
                            <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">From conferences to company parties, we document the energy 
                                and key moments of your event with authenticity and flair. 
                                Relive the vibe, long after it&apos;s over.</p>
                            <div className="flex items-end gap-2 justify-center lg:justify-start">
                                <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-16" />
                                <span 
                                    onClick={() => router.push('/portfolio/corporate-events')}
                                    className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer"
                                >
                                    photos
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Food photography card */}
                    <div className="flex flex-col lg:flex-row items-center gap-6 relative">
                        <Image src="/images/services/image.png" alt="food photography" width={600} height={400} className="w-full lg:w-1/2 border-[.5px] border-red" />
                        <div className="absolute -top-10 left-4 sm:-top-15 lg:-top-10 xl:left-15 xl:-top-30 w-22 sm:w-40 lg:w-32 xl:w-64">
                            <Image src="/images/icons/mouth.svg" alt="Mouth" width={224} height={224} />
                        </div>
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">food photography</h1>
                            <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">Delicious visuals that make your dishes irresistible. We style, light and shoot food in a way that triggers taste buds and boosts your brand&apos;s appetite appeal.</p>
                            <div className="flex items-end gap-2 justify-center lg:justify-start">
                                <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-12" />
                                <span 
                                    onClick={() => router.push('/portfolio/food')}
                                    className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer"
                                >
                                    photos
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </div>
                        </div>
                    </div>
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
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">content plans</h2>
                                <p className="text-lg md:text-[23px] font-light mb-6">monthly packages</p>
                                <div className="h-[2px] bg-red mb-6"></div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">starter pack</h2>
                                <p className="text-lg md:text-[23px] font-light mb-8">= basic package</p>
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">brand builder</h2>
                                <p className="text-lg md:text-[23px] font-light">= pro package</p>
                            </div>
                        </div>
                    </div>

                    {/* Flash deals */}
                    <div className="flex-1 relative pt-6 flex flex-col">
                        <div className="absolute inset-x-0 top-0 h-12 bg-blue rounded-t-3xl"></div>
                        <div className="bg-white rounded-3xl p-6 lg:p-4 xl:p-6 flex-1 text-center h-full flex flex-col justify-between relative">
                            <div>
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">flash deals</h2>
                                <p className="text-lg md:text-[23px] font-light mb-6">one-time collaboration</p>
                                <div className="h-[2px] bg-red mb-6"></div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">focus</h2>
                                <p className="text-lg md:text-[23px] font-light mb-8">= basic package</p>
                                <h2 className="text-3xl md:text-4xl mb-1 font-medium">full frame</h2>
                                <p className="text-lg md:text-[23px] font-light">= pro package</p>
                            </div>
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div className="flex-1 relative pt-6 flex flex-col">
                        <div className="absolute inset-x-0 top-0 h-12 bg-blue rounded-t-3xl"></div>
                        <div className="bg-white rounded-3xl p-6 lg:p-4 xl:p-6 flex-1 text-center h-full flex flex-col justify-between relative">
                            <div>
                                <h2 className="text-3xl md:text-4xl mb-4 font-medium">add-ons</h2>
                                <div className="h-[2px] bg-red mb-4"></div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <p className="text-xl md:text-[27px] font-light">extra video</p>
                                <p className="text-xl md:text-[27px] font-light">extra photo</p>
                                <p className="text-xl md:text-[27px] font-light">fast delivery 48h</p>
                                <p className="text-xl md:text-[27px] font-light">fast delivery 72h</p>
                                <p className="text-xl md:text-[27px] font-light">social media post text</p>
                                <p className="text-xl md:text-[27px] font-light">subtitles</p>
                            </div>
                        </div>
                    </div>

                    {/* Our rates */}
                    <div className="flex-1 text-white text-center lg:text-left mt-6 lg:mt-0 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl xl:text-6xl mb-4 font-medium">our rates</h1>
                        <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3 leading-tight">At Brandview, you choose how we team up: from one-time Flash Deals to monthly Content Plans that build long-term brand value. Need more? Add powerful Add-Ons to boost your content even further. Explore what fits your brand best.</p>
                        <div className="flex items-end gap-2 justify-center lg:justify-start">
                            <SwirlArrow className="w-10 h-10 md:w-12 md:h-12" color="white" />
                            <span className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer">
                                prices
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2nd Services section */}
            <div className="bg-blue">
                <div className="py-8 md:py-10 px-6 md:px-16">
                    <div className="flex flex-col gap-10">
                        {/* Portraits card */}
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            <Image src="/images/services/image.png" alt="short content" width={600} height={400} className="w-full lg:w-1/2 border-[.5px] border-red" />
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">portraits</h1>
                                <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">Authentic portraits with personality. Whether it&apos;s for your website, team page or social media, we ensure everyone looks approachable and confident.</p>
                                <div className="flex items-end gap-2 justify-center lg:justify-start">
                                    <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-12" />
                                    <span 
                                        onClick={() => router.push('/portfolio/portraits')}
                                        className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer"
                                    >
                                        photos
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Product photography card */}
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            <Image src="/images/services/image.png" alt="short content" width={600} height={400} className="w-full lg:w-1/2 border-[.5px] border-red" />
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">product photography </h1>
                                <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">Sharp, stylish and scroll-stopping. We present your products in 
                                the best light, whether for e-commerce, campaigns or catalogues.</p>
                                <div className="flex items-end gap-2 justify-center lg:justify-start">
                                    <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-16" />
                                    <span 
                                        onClick={() => router.push('/portfolio/products')}
                                        className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer"
                                    >
                                        photos
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Business photography card */}
                        <div className="flex flex-col lg:flex-row items-center gap-6 relative">
                            <Image src="/images/services/image.png" alt="food photography" width={600} height={400} className="w-full lg:w-1/2 border-[.5px] border-red" />
                            <div className="absolute -top-5 -right-4 md:-right-15 sm:-top-15 lg:right-[49%] lg:-top-5 xl:-top-23 xl:right-[44%] w-22 sm:w-40 lg:w-32 xl:w-60 rotate-10">
                                <Image src="/images/icons/eyes.svg" alt="Eyes" width={240} height={240} />
                            </div>
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-4">business photography</h1>
                                <p className="text-lg md:text-xl lg:text-[23px] font-light mb-3">We capture the essence of your brand with clean, professional visuals that make a lasting impression. From team portraits to workspaces, we showcase the people and story behind your business.</p>
                                <div className="flex items-end gap-2 justify-center lg:justify-start">
                                    <SwirlArrow className="w-10 h-10 md:w-12 md:h-12 ml-0 lg:ml-12" />
                                    <span 
                                        onClick={() => router.push('/portfolio/business')}
                                        className="text-lg md:text-xl lg:text-[23px] font-medium leading-none relative group cursor-pointer"
                                    >
                                        photos
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Border bottom */}
                <div className="px-6 md:px-14">
                    <div className="h-[2px] bg-red w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPage;
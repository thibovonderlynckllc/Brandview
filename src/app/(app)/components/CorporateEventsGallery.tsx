'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { useMemo } from 'react';

export default function CorporateEventsMasonryGallery() {
    const breakpointColumnsObj = useMemo(() => ({
        default: 3,
        1100: 2,
        768: 1  // Changed to match Tailwind's md breakpoint
    }), []);

    return (
        <div className="space-y-0">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column !space-y-0"
            >
                {/* First row (3-3-2) */}
                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/corporateEvents/VDM-0861.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/corporateEvents/VDM-47.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                    <Image src="/images/icons/klapbord.svg" alt="Klapbord" width={200} height={200} className="absolute -bottom-17 -left-0 -rotate-10 z-10" />
                </div>

                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-30.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Second row (3-2-3) */}
                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-17.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/corporateEvents/VDM-0021.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-49.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Third row (2-3-3) */}
                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/corporateEvents/TAM-9318.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/corporateEvents/VDM-0845.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-108.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
            </Masonry>
            <img src="/images/banner.svg" alt="banner" className="w-full h-52 md:h-auto object-cover" />
            
            <div className="w-full space-y-0">
                <div className="flex flex-col md:flex-row justify-between items-start gap-0">
                    <div className="w-full md:w-1/3 self-stretch flex flex-col space-y-0">
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/VDM-0830.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/VDM-0733.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/VDM-162.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/VDM-0053.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                            <Image src="/images/icons/eyes.svg" alt="Eyes" width={248} height={248} className="absolute -top-16 right-10 md:bottom-13 md:-right-40 z-10 rotate-10" />
                        </div>
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/VDM-0040.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[405px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/TAM-9242.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 mt-0 space-y-0">
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/TAM-9234.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 67vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/TAM-9230.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 67vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/corporateEvents/TAM-9188.webp" 
                                    alt="Corporate Event" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/corporateEvents/TAM-8870.webp" 
                                    alt="Corporate Event" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/corporateEvents/TAM-8786.webp" 
                                    alt="Corporate Event" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-0">
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                                    <Image 
                                        src="/images/corporateEvents/TAM-8645.webp" 
                                        alt="Corporate Event" 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                                    <Image 
                                        src="/images/corporateEvents/Kokkerelleke VOKA-98.webp" 
                                        alt="Corporate Event" 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/corporateEvents/Kokkerelleke VOKA-50.webp" 
                                alt="Corporate Event" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 67vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <img src="/images/banner.svg" alt="banner" className="w-full h-52 md:h-auto object-cover" />

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column !space-y-0"
            >
                {/* First row (3-3-2) */}
                <div className="gallery-item h-[600px] relative">
                    <Image 
                        src="/images/corporateEvents/Kokkerelleke VOKA-7.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-273.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[400px] relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-176.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Second row (3-2-3) */}
                <div className="gallery-item h-[600px] relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-122.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[400px] relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-27.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] relative">
                    <Image 
                        src="/images/corporateEvents/10jFOODBAG-65.webp" 
                        alt="Corporate Event" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Third row (2-3-3) */}
                <div className="gallery-item h-[400px]">
                </div>

                <div className="gallery-item h-[600px] relative">
                </div>

                <div className="gallery-item h-[600px] relative">
                    <Image src="/images/icons/bulb.svg" alt="Bulb" width={224} height={224} className="absolute -top-35 right-12 z-10" />
                </div>
            </Masonry>
        </div>
    );
} 
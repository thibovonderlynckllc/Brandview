'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { useMemo } from 'react';

export default function FoodMasonryGallery() {
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
                        src="/images/food/FERRIER30-22.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                    <Image src="/images/icons/brandview.svg" alt="BrandView" width={248} height={200} className="absolute -bottom-35 md:-bottom-35 md:-right-34 rotate-10 z-10" />
                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/food/FERRIER30-24.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                    <div className="absolute w-64 bottom-11 -right-38 z-10 flex items-center justify-center">
                        
                    </div>
                </div>

                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/food/FERRIER30-32.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Second row (3-2-3) */}
                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/food/FERRIER30-35.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/food/FERRIER30-37.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/food/FERRIER30-39 (1).webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Third row (2-3-3) */}
                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/food/FERRIER30-43.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/food/FERRIER30-45.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/food/FERRIER30-58.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
            </Masonry>
            <Image src="/images/banner.svg" alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto object-cover" />
            
            <div className="w-full space-y-0">
                <div className="flex flex-col md:flex-row justify-between items-start gap-0">
                    <div className="w-full md:w-1/3 self-stretch flex flex-col space-y-0">
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/FERRIER30-61.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/KokkerellekeVOKA-23.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/KokkerellekeVOKA-45.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/KokkerellekeVOKA-66.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/Matterhornantwerp-19.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[405px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/Matterhornantwerp-23.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 mt-0 space-y-0">
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/Matterhornantwerp-5.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/Matterhornantwerp-51.webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/food/Portfolio11 (2).webp" 
                                    alt="Food Photography" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/food/Portfolio18 (1).webp" 
                                    alt="Food Photography" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/food/Portfolio2 (1).webp" 
                                    alt="Food Photography" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-0">
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                                    <Image 
                                        src="/images/food/Portfolio3.webp" 
                                        alt="Food Photography" 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                    <Image src="/images/icons/megaphone.svg" alt="Megaphone" width={248} height={200} className="absolute -top-30 md:-left-20 md:-top-28 z-10" />
                                </div>
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                                    <Image 
                                        src="/images/food/Portfolio4.webp" 
                                        alt="Food Photography" 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/food/Portfolio5 (1).webp" 
                                alt="Food Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Image src="/images/banner.svg" alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto object-cover" />

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column !space-y-0"
            >
                {/* First row (3-3-2) */}
                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/food/Verso-19.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/food/Verso-24.webp" 
                        alt="Food Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[400px] mb-0">
                </div>

                {/* Second row (3-2-3) */}
                <div className="gallery-item h-[600px] mb-0"></div>

                <div className="gallery-item h-[400px] mb-0">
                </div>

                <div className="gallery-item h-[600px] relative mb-0"></div>

                {/* Third row (2-3-3) */}
                <div className="gallery-item h-[400px] mb-0">
                    
                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image src="/images/icons/camera.svg" alt="Camera" width={200} height={200} className="absolute right-30 -top-25 rotate-10 z-10" />
                </div>

                <div className="gallery-item h-[600px] mb-0"></div>
            </Masonry>
        </div>
    );
} 
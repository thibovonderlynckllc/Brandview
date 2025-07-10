'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { useMemo } from 'react';

export default function ShortContentMasonryGallery() {
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

                </div>

                <div className="gallery-item h-[600px] relative mb-0">
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
                    <Image src="/images/icons/camera.svg" alt="Camera" width={200} height={200} className="absolute -top-26 right-20 rotate-10 z-10" />
                </div>

                <div className="gallery-item h-[600px] mb-0"></div>
            </Masonry>
            <Image src="/images/banner.svg" alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto object-cover" />
            
            <div className="w-full space-y-0">
                <div className="flex flex-col md:flex-row justify-between items-start gap-0">
                    <div className="w-full md:w-1/3 self-stretch flex flex-col space-y-0">
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item">
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item">
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item">
                        </div>
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item">
                        </div>
                        <div className="bg-white h-[405px] flex items-center justify-center gallery-item">
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 mt-0 space-y-0">
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
 
                        </div>
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item">
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                            <Image src="/images/icons/brandview.svg" alt="Brandview" width={248} height={200} className="absolute hidden md:block -bottom-33 -right-33 rotate-8 z-10" />
                            <Image src="/images/icons/brandview.svg" alt="Brandview" width={248} height={200} className="absolute md:hidden -bottom-33 right-10 rotate-8 z-10" />
                            </div>
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item">
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item">
                            </div>
                            <div className="w-full md:w-1/2 space-y-0">
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">

                                </div>
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item">
                                </div>
                            </div>
                        </div>

                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item">
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

                </div>

                <div className="gallery-item h-[600px] relative mb-0">

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
                    <Image src="/images/icons/klapbord.svg" alt="Klapbord" width={200} height={200} className="absolute hidden md:block -top-20 -left-18 -rotate-5 z-10" />
                    <Image src="/images/icons/klapbord.svg" alt="Klapbord" width={200} height={200} className="absolute md:hidden -top-20 left-18 -rotate-5 z-10" />
                </div>

                <div className="gallery-item h-[600px] mb-0"></div>
            </Masonry>
        </div>
    );
} 
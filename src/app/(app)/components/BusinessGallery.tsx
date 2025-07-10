'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';

export default function BusinessMasonryGallery() {
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        768: 1  // Changed to match Tailwind's md breakpoint
    };

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
                    <div className="absolute w-64 -top-33 right-5 lg:bottom-11 lg:-right-38 z-10 flex items-center justify-center">
                        <Image src="/images/icons/brandview.svg" alt="BrandView" width={248} height={200} />
                    </div>
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

                <div className="gallery-item h-[600px] mb-0"></div>

                <div className="gallery-item h-[600px] mb-0"></div>
            </Masonry>
            <Image src="/images/banner.svg" alt="banner" width={1920} height={200} className="w-full h-52 md:h-auto object-cover" />
            
            <div className="w-full space-y-0">
                <div className="flex flex-col md:flex-row justify-between items-start gap-0">
                    <div className="w-full md:w-1/3 self-stretch flex flex-col space-y-0">
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item">
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image src="/images/icons/laptop.svg" alt="Laptop" width={248} height={200} className="absolute -top-25 left-10 md:-bottom-40 md:-right-30" />
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
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item">
                        </div>
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item">
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item">
                            </div>
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item">
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item">
                            </div>
                            <div className="w-full md:w-1/2 space-y-0">
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item">
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

                <div className="gallery-item h-[600px] relative mb-0"></div>

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
                    <Image src="/images/icons/mouth.svg" alt="Mouth" width={224} height={224} className="absolute -top-20 right-10 lg:-top-20 lg:-right-35 z-10" />
                </div>

                <div className="gallery-item h-[600px] mb-0"></div>
            </Masonry>
        </div>
    );
} 
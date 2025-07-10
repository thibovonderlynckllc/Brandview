'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { useMemo } from 'react';

export default function PortraitsMasonryGallery() {
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
                        src="/images/portraits/Viavé-9.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/portraits/PortrettenSnowball-3943.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                    <Image src="/images/icons/person.svg" alt="Person" width={248} height={200} className="absolute hidden lg:block -bottom-29 -right-25 z-10" />
                    <Image src="/images/icons/person.svg" alt="Person" width={248} height={200} className="absolute lg:hidden -bottom-29 right-20 z-10" />
                </div>

                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/portraits/TAM-9999.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Second row (3-2-3) */}
                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/portraits/PortrettenSnowball-3932.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/portraits/TAM-9975.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image 
                        src="/images/portraits/PortrettenSnowball-3856.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Third row (2-3-3) */}
                <div className="gallery-item h-[400px] mb-0 relative">
                    <Image 
                        src="/images/portraits/TAM-9929.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/portraits/PortrettenSnowball-3804.webp" 
                        alt="Portrait Photography" 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                <div className="gallery-item h-[600px] mb-0 relative">
                    <Image 
                        src="/images/portraits/TAM-9914.webp" 
                        alt="Portrait Photography" 
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
                                src="/images/portraits/PortrettenSnowball-3801.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/TAM-9823.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                            <Image src="/images/icons/mouth.svg" alt="Mouth" width={248} height={200} className="absolute hidden md:block -bottom-37 -right-42 z-10" />
                            <Image src="/images/icons/mouth.svg" alt="Mouth" width={248} height={200} className="absolute md:hidden -bottom-24 right-20 z-10" />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/PortrettenSnowball-3739.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[400px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/TAM-0083.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[600px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/PortrettenSnowball-3727.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[405px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/PortrettenSnowball-3716.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 mt-0 space-y-0">
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/Viavé-3.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 67vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/ViaveJanuari 2025-9.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 67vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/portraits/Snowball-2.webp" 
                                    alt="Portrait Photography" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/portraits/Snowball--3.webp" 
                                    alt="Portrait Photography" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            <div className="bg-white h-[600px] w-full md:w-1/2 flex items-center justify-center gallery-item relative">
                                <Image 
                                    src="/images/portraits/ApotheekDegroote-6.webp" 
                                    alt="Portrait Photography" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/2 space-y-0">
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                                    <Image 
                                        src="/images/portraits/ApotheekDegroote-4.webp" 
                                        alt="Portrait Photography" 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="bg-white h-[300px] flex items-center justify-center gallery-item relative">
                                    <Image 
                                        src="/images/portraits/ApotheekDegroote-12.webp" 
                                        alt="Portrait Photography" 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white h-[535px] flex items-center justify-center gallery-item relative">
                            <Image 
                                src="/images/portraits/Verso-19.webp" 
                                alt="Portrait Photography" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 67vw"
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

                </div>

                <div className="gallery-item h-[600px] relative mb-0">
                    <Image src="/images/icons/laptop.svg" alt="Laptop" width={248} height={200} className="absolute hidden lg:block -bottom-15 -right-27 rotate-5 z-10" />
                    <Image src="/images/icons/laptop.svg" alt="Laptop" width={248} height={200} className="absolute lg:hidden -bottom-30 right-20 rotate-5 z-10" />
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
                   
                </div>

                <div className="gallery-item h-[600px] mb-0"></div>
            </Masonry>
        </div>
    );
} 
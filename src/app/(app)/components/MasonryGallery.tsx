'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useState, useMemo } from 'react';

export default function MasonryGallery() {
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        setMounted(true);
    }, []);

    const breakpointColumnsObj = useMemo(() => ({
        default: 3,
        1100: 2,
        700: 1
    }), []);

    const galleryItems = useMemo(() => [
        {
            height: "h-[600px]",
            content: (
                <>
                    <Link href="/portfolio/portraits" className="block">
                        <h1 className="text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">portraits</h1>
                    </Link>
                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 md:left-[30%] md:translate-x-0 w-32 sm:w-40 lg:w-48 rotate-[-5deg] z-10">
                        <Image 
                            src="/images/icons/klapbord.svg" 
                            alt="Klapbord" 
                            width={208}
                            height={208}
                            priority
                        />
                    </div>
                </>
            )
        },
        { height: "h-[600px]" },
        {
            height: "h-[400px]",
            content: (
                <>
                    <Link href="/portfolio/business" className="block">
                        <h1 className="text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">business<br/>photography</h1>
                    </Link>
                    <div className="hidden absolute -top-[30%] right-35 w-50 z-10">
                        <Image 
                            src="/images/icons/bulb.svg" 
                            alt="Bulb" 
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
                </>
            )
        },
        { height: "h-[600px]" },
        {
            height: "xl:h-[400px] h-[600px]",
            content: (
                <Link href="/portfolio/short-content" className="block">
                    <h1 className="text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">short content</h1>
                </Link>
            )
        },
        { height: "h-[600px]" },
        {
            height: "xl:h-[400px] h-[600px]",
            content: (
                <Link href="/portfolio/products" className="block">
                    <h1 className="text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">product<br/>photography</h1>
                </Link>
            )
        },
        { height: "h-[600px]" },
        {
            height: "h-[600px]",
            content: (
                <div className="absolute -bottom-15 left-1/2 -translate-x-1/2 md:-bottom-20 md:left-10 md:translate-x-0 xl:-bottom-20 xl:-left-18 w-32 sm:w-40 lg:w-48 z-10">
                    <Image 
                        src="/images/icons/mouth.svg" 
                        alt="Mouth" 
                        width={224}
                        height={224}
                        priority
                    />
                </div>
            )
        },
        {
            height: "h-[600px]",
            content: (
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:-bottom-30 md:right-10 md:left-auto md:translate-x-0 xl:-bottom-25 xl:-right-22 w-32 sm:w-40 lg:w-48 z-10">
                    <Image 
                        src="/images/icons/person.svg" 
                        alt="Person" 
                        width={224}
                        height={224}
                        priority
                    />
                </div>
            )
        },
        { height: "h-[600px]" },
        {
            height: "h-[600px]",
            content: (
                <Link href="/portfolio/corporate-events" className="block">
                    <h1 className="text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">(corporate)<br/>events</h1>
                </Link>
            )
        },
        { height: "h-[600px]" },
        {
            height: "h-[600px]",
            content: (
                <Link href="/portfolio/food" className="block">
                    <h1 className="text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">food<br/>photography</h1>
                </Link>
            )
        },
        { height: "h-[600px] xl:h-[400px]" },
        { height: "h-[400px]" },
        { height: "h-[600px] min-[1101px]:h-[400px]" },
        { height: "h-[600px]" }
    ], []);

    return (
        <div className="overflow-x-hidden" suppressHydrationWarning>
            {mounted ? (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {galleryItems.map((item, index) => (
                        <div key={`gallery-item-${index}`} className={`gallery-item ${item.height} relative`}>
                            {item.content}
                        </div>
                    ))}
                </Masonry>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {galleryItems.map((item, index) => (
                        <div key={`gallery-item-${index}`} className={`gallery-item ${item.height} relative`}>
                            {item.content}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 
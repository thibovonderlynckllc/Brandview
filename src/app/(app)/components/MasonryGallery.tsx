'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useState, useMemo, useEffect } from 'react';
import VideoJS from './VideoJS';

interface MasonryPosition {
    image?: { url: string; alt?: string; cloudinaryMobileVideo?: string } | string | null;
    text?: string;
    link?: string;
}

interface MasonryGalleryGrid {
    position1?: MasonryPosition | { url: string; alt?: string } | string | null;
    position2?: MasonryPosition | { url: string; alt?: string } | string | null;
    position3?: MasonryPosition | { url: string; alt?: string } | string | null;
    position4?: MasonryPosition | { url: string; alt?: string } | string | null;
    position5?: MasonryPosition | { url: string; alt?: string } | string | null;
    position6?: MasonryPosition | { url: string; alt?: string } | string | null;
    position7?: MasonryPosition | { url: string; alt?: string } | string | null;
    position8?: MasonryPosition | { url: string; alt?: string } | string | null;
    position9?: MasonryPosition | { url: string; alt?: string } | string | null;
    position10?: MasonryPosition | { url: string; alt?: string } | string | null;
    position11?: MasonryPosition | { url: string; alt?: string } | string | null;
    position12?: MasonryPosition | { url: string; alt?: string } | string | null;
    position13?: MasonryPosition | { url: string; alt?: string } | string | null;
    position14?: MasonryPosition | { url: string; alt?: string } | string | null;
    position15?: MasonryPosition | { url: string; alt?: string } | string | null;
    position16?: MasonryPosition | { url: string; alt?: string } | string | null;
    position17?: MasonryPosition | { url: string; alt?: string } | string | null;
    position18?: MasonryPosition | { url: string; alt?: string } | string | null;
}

interface MasonryGalleryProps {
    masonryGalleryGrid?: MasonryGalleryGrid | null;
}

export default function MasonryGallery({ masonryGalleryGrid }: MasonryGalleryProps) {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const breakpointColumnsObj = useMemo(() => ({
        default: 3,
        1100: 2,
        700: 1
    }), []);

    const isVideoUrl = (url: string | null | undefined): boolean => {
        if (!url) return false;
        const lower = url.toLowerCase();
        return lower.endsWith('.webm') || lower.endsWith('.mp4') || lower.includes('format=webm');
    };

    const getVideoSource = (position: any): string | null => {
        if (!position) return null;
        
        // Handle different position formats
        let imageData = null;
        
        if (typeof position === 'string') {
            imageData = { url: position };
        } else if ('url' in position) {
            imageData = position;
        } else if (position.image) {
            imageData = typeof position.image === 'string' ? { url: position.image } : position.image;
        }
        
        if (!imageData?.url || !isVideoUrl(imageData.url)) return null;
        
        // On mobile, use Cloudinary MP4 if available
        if (isMobile && imageData.cloudinaryMobileVideo) {
            return imageData.cloudinaryMobileVideo;
        }
        
        return imageData.url;
    };

    const getPosterSource = (position: any): string | undefined => {
        if (!position) return undefined;
        
        // Handle different position formats
        let imageData = null;
        
        if (typeof position === 'string') {
            imageData = { url: position };
        } else if ('url' in position) {
            imageData = position;
        } else if (position.image) {
            imageData = typeof position.image === 'string' ? { url: position.image } : position.image;
        }
        
        if (!imageData?.url || !isVideoUrl(imageData.url)) return undefined;
        
        // Handle poster field - it's a relation to another media item
        if (imageData.poster) {
            if (typeof imageData.poster === 'object' && 'url' in imageData.poster) {
                return imageData.poster.url;
            } else if (typeof imageData.poster === 'string') {
                return imageData.poster;
            }
        }
        
        return undefined;
    };

    const RenderMedia = ({
        src,
        alt,
        position,
    }: { src: string; alt: string; position?: any }) => {
        // Get the appropriate video source (handles mobile vs desktop)
        const videoSrc = position ? getVideoSource(position) : src;
        const posterSrc = position ? getPosterSource(position) : undefined;
        
        if (isVideoUrl(videoSrc || src)) {
            return (
                <VideoJS 
                    src={videoSrc || src} 
                    className="absolute inset-0 w-full h-full" 
                    poster={posterSrc}
                />
            );
        }
        return (
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover z-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        );
    };

    // Helper to get position data (backward compatible)
    const getPositionData = (pos: number) => {
        if (!masonryGalleryGrid) return null;
        const key = `position${pos}` as keyof MasonryGalleryGrid;
        const position = masonryGalleryGrid[key];
        
        if (!position) return null;
        
        // Handle old format (direct image string)
        if (typeof position === 'string') {
            return { image: position, text: null, link: null };
        }
        
        // Handle old format (image object with url)
        if ('url' in position && position.url) {
            return { image: position.url, text: null, link: null };
        }
        
        // Handle new format (position object)
        const newPosition = position as MasonryPosition;
        let imageUrl = null;
        
        if (newPosition.image) {
            if (typeof newPosition.image === 'string') {
                imageUrl = newPosition.image;
            } else {
                imageUrl = newPosition.image.url;
            }
        }
        
        return {
            image: imageUrl,
            text: newPosition.text || null,
            link: newPosition.link || null
        };
    };

    const getAltForPosition = (pos: number) => {
        if (!masonryGalleryGrid) return '';
        const key = `position${pos}` as keyof MasonryGalleryGrid;
        const img = masonryGalleryGrid[key];
        if (!img) return '';
        if (typeof img === 'object' && 'alt' in img && img.alt) return img.alt;
        return '';
    };

    const galleryItems = useMemo(() => [
        {
            height: "h-[600px]",
            content: (
                <>
                    <Link href="/portfolio/portraits" className="block">
                        <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">portraits</h1>
                    </Link>
                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 md:left-[30%] md:translate-x-0 w-32 sm:w-40 lg:w-48 rotate-[-5deg] z-10">
                        <Image 
                            src="/images/icons/klapbord.svg" 
                            alt="Klapbord" 
                            width={208}
                            height={208}
                            priority
                            quality={90}
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
                        <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">business<br/>photography</h1>
                    </Link>
                    <div className="hidden absolute -top-[30%] right-35 w-50 z-10">
                        <Image 
                            src="/images/icons/bulb.svg" 
                            alt="Bulb" 
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
            height: "xl:h-[400px] h-[600px]",
            content: (
                <Link href="/portfolio/short-content" className="block">
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">short content</h1>
                </Link>
            )
        },
        { height: "h-[600px]" },
        {
            height: "xl:h-[400px] h-[600px]",
            content: (
                <Link href="/portfolio/products" className="block">
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">product<br/>photography</h1>
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
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">(corporate)<br/>events</h1>
                </Link>
            )
        },
        { height: "h-[600px]" },
        {
            height: "h-[600px]",
            content: (
                <Link href="/portfolio/food" className="block">
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-center hover:scale-103 transition-all duration-300 cursor-pointer">food<br/>photography</h1>
                </Link>
            )
        },
        { height: "h-[600px] xl:h-[400px]" },
        { height: "h-[400px]" },
        { height: "h-[600px] min-[1101px]:h-[400px]" },
        { height: "h-[600px]" }
    ], []);

    return (
        <div className="overflow-visible relative" suppressHydrationWarning>
            {mounted ? (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {galleryItems.map((item, index) => {
                        const positionData = getPositionData(index + 1);
                        const hasImage = positionData?.image;
                        const hasText = positionData?.text && positionData.text.trim() !== '';
                        const hasLink = positionData?.link;
                        
                        return (
                            <div key={`gallery-item-${index}`} className={`gallery-item ${item.height} relative`}>
                                {/* Render CMS image if present for this position */}
                                {hasImage && (
                                    <RenderMedia
                                        src={positionData.image!}
                                        alt={getAltForPosition(index + 1) || `Gallery image ${index + 1}`}
                                        position={masonryGalleryGrid?.[`position${index + 1}` as keyof MasonryGalleryGrid]}
                                    />
                                )}
                                
                                {/* Render CMS text overlay with link if present */}
                                {hasText && (
                                    hasLink ? (
                                        <Link href={positionData.link!} className="block">
                                            <h1 className={`text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center hover:scale-103 transition-all duration-300 cursor-pointer z-20 ${positionData.text!.includes('\\n') ? '' : 'whitespace-nowrap'}`}>
                                                {positionData.text!.split('\\n').map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index < positionData.text!.split('\\n').length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </h1>
                                        </Link>
                                    ) : (
                                        <h1 className={`text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center z-20 ${positionData.text!.includes('\\n') ? '' : 'whitespace-nowrap'}`}>
                                            {positionData.text!.split('\\n').map((line, index) => (
                                                <span key={index}>
                                                    {line}
                                                    {index < positionData.text!.split('\\n').length - 1 && <br />}
                                                </span>
                                            ))}
                                        </h1>
                                    )
                                )}
                                
                                {/* Hardcoded decorative icons for specific positions */}
                                {index === 0 && (
                                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 md:left-[30%] md:translate-x-0 w-32 sm:w-40 lg:w-48 rotate-[-5deg] z-10">
                                        <Image 
                                            src="/images/icons/klapbord.svg" 
                                            alt="Klapbord" 
                                            width={208}
                                            height={208}
                                            priority
                                        />
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className="hidden xl:block absolute -top-[30%] right-35 w-50 z-10">
                                        <Image 
                                            src="/images/icons/bulb.svg" 
                                            alt="Bulb" 
                                            width={200}
                                            height={200}
                                            priority
                                        />
                                    </div>
                                )}
                                {index === 8 && (
                                    <div className="absolute -bottom-15 left-1/2 -translate-x-1/2 md:-bottom-20 md:left-10 md:translate-x-0 xl:-bottom-20 xl:-left-18 w-32 sm:w-40 lg:w-48 z-10">
                                        <Image 
                                            src="/images/icons/mouth.svg" 
                                            alt="Mouth" 
                                            width={224}
                                            height={224}
                                            priority
                                        />
                                    </div>
                                )}
                                {index === 9 && (
                                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:-bottom-30 md:right-10 md:left-auto md:translate-x-0 xl:-bottom-25 xl:-right-22 w-32 sm:w-40 lg:w-48 z-10">
                                        <Image 
                                            src="/images/icons/person.svg" 
                                            alt="Person" 
                                            width={224}
                                            height={224}
                                            priority
                                        />
                                    </div>
                                )}

                                {/* Fallback to existing static content only if no CMS position data exists at all */}
                                {!positionData && item.content}
                            </div>
                        );
                    })}
                </Masonry>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {galleryItems.map((item, index) => {
                        const positionData = getPositionData(index + 1);
                        const hasImage = positionData?.image;
                        const hasText = positionData?.text && positionData.text.trim() !== '';
                        const hasLink = positionData?.link;
                        
                        return (
                            <div key={`gallery-item-${index}`} className={`gallery-item ${item.height} relative`}>
                                {/* Render CMS image if present for this position */}
                                {hasImage && (
                                    <RenderMedia
                                        src={positionData.image!}
                                        alt={getAltForPosition(index + 1) || `Gallery image ${index + 1}`}
                                        position={masonryGalleryGrid?.[`position${index + 1}` as keyof MasonryGalleryGrid]}
                                    />
                                )}
                                
                                {/* Render CMS text overlay with link if present */}
                                {hasText && (
                                    hasLink ? (
                                        <Link href={positionData.link!} className="block">
                                            <h1 className={`text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center hover:scale-103 transition-all duration-300 cursor-pointer z-20 ${positionData.text!.includes('\\n') ? '' : 'whitespace-nowrap'}`}>
                                                {positionData.text!.split('\\n').map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index < positionData.text!.split('\\n').length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </h1>
                                        </Link>
                                    ) : (
                                        <h1 className={`text-3xl md:text-5xl xl:text-6xl font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center z-20 ${positionData.text!.includes('\\n') ? '' : 'whitespace-nowrap'}`}>
                                            {positionData.text!.split('\\n').map((line, index) => (
                                                <span key={index}>
                                                    {line}
                                                    {index < positionData.text!.split('\\n').length - 1 && <br />}
                                                </span>
                                            ))}
                                        </h1>
                                    )
                                )}
                                
                                {/* Hardcoded decorative icons for specific positions */}
                                {index === 0 && (
                                    <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 md:left-[30%] md:translate-x-0 w-32 sm:w-40 lg:w-48 rotate-[-5deg] z-10">
                                        <Image 
                                            src="/images/icons/klapbord.svg" 
                                            alt="Klapbord" 
                                            width={208}
                                            height={208}
                                            priority
                                        />
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className="hidden xl:block absolute -top-[30%] right-35 w-50 z-10">
                                        <Image 
                                            src="/images/icons/bulb.svg" 
                                            alt="Bulb" 
                                            width={208}
                                            height={208}
                                            priority
                                        />
                                    </div>
                                )}
                                {index === 8 && (
                                    <div className="absolute -bottom-15 left-1/2 -translate-x-1/2 md:-bottom-20 md:left-10 md:translate-x-0 xl:-bottom-20 xl:-left-18 w-32 sm:w-40 lg:w-48 z-10">
                                        <Image 
                                            src="/images/icons/mouth.svg" 
                                            alt="Mouth" 
                                            width={208}
                                            height={208}
                                            priority
                                        />
                                    </div>
                                )}
                                {index === 9 && (
                                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:-bottom-30 md:right-10 md:left-auto md:translate-x-0 xl:-bottom-25 xl:-right-22 w-32 sm:w-40 lg:w-48 z-10">
                                        <Image 
                                            src="/images/icons/person.svg" 
                                            alt="Person" 
                                            width={208}
                                            height={208}
                                            priority
                                        />
                                    </div>
                                )}

                                {/* Fallback to existing static content only if no CMS position data exists at all */}
                                {!positionData && item.content}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
} 
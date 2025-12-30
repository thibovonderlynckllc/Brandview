'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import VideoJS from './VideoJS';
import { isMobile as deviceIsMobile, isTablet, isIOS } from 'react-device-detect';

interface MediaItem {
    id?: string;
    alt?: string;
    url: string;
    filename?: string;
    mimeType?: string;
    cloudinaryMobileVideo?: string;
    poster?: { url: string; alt?: string } | null;
}

interface PortfolioCardProps {
    title: string;
    slug: string;
    image?: MediaItem | string | null;
    icon?: string | { url: string; alt?: string } | null;
    iconPosition: 'none' | 'top-right';
    index: number;
}

const PortfolioCard = ({ title, slug, image, icon, iconPosition, index }: PortfolioCardProps) => {
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
        
        const checkDevice = () => {
            const mobile = deviceIsMobile || isTablet || isIOS;
            setIsMobile(mobile);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, [isClient]);

    const isVideo = (media: MediaItem | string | null | undefined): boolean => {
        if (!media) return false;
        if (typeof media === 'string') {
            const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
            return videoExtensions.some(ext => media.toLowerCase().includes(ext));
        }
        if (typeof media === 'object' && 'url' in media && media.url) {
            const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
            return videoExtensions.some(ext => media.url.toLowerCase().includes(ext));
        }
        return false;
    };

    const getImageSrc = (): string | null => {
        if (typeof image === 'object' && image !== null && 'url' in image) {
            return image.url;
        }
        if (typeof image === 'string') {
            return image;
        }
        return null;
    };

    const getVideoSrc = (): string | null => {
        if (typeof image === 'object' && image !== null && 'url' in image && isVideo(image)) {
            return image.url;
        }
        return null;
    };

    const getMobileVideoSrc = (): string | null => {
        if (typeof image === 'object' && image !== null && 'cloudinaryMobileVideo' in image && image.cloudinaryMobileVideo) {
            return image.cloudinaryMobileVideo;
        }
        return null;
    };

    const getPosterSrc = (): string | undefined => {
        if (typeof image === 'object' && image !== null && 'poster' in image && image.poster) {
            if (typeof image.poster === 'object' && image.poster !== null && 'url' in image.poster) {
                return image.poster.url;
            }
        }
        return undefined;
    };

    const hasVideo = typeof image === 'object' && image !== null && isVideo(image);
    const videoSrc = getVideoSrc();
    const mobileVideoSrc = getMobileVideoSrc();
    const finalVideoSrc = isMobile && mobileVideoSrc ? mobileVideoSrc : (videoSrc || null);
    const posterSrc = getPosterSrc();
    const imageSrc = getImageSrc();

    const handlePlayPause = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (videoContainerRef.current) {
            const videoElement = videoContainerRef.current.querySelector('video');
            if (videoElement) {
                if (videoElement.paused) {
                    videoElement.play();
                    setIsPlaying(true);
                } else {
                    videoElement.pause();
                    setIsPlaying(false);
                }
            }
        }
    };

    const renderIcon = () => {
        const iconSrc =
            typeof icon === 'object' && icon !== null && 'url' in icon
                ? icon.url
                : typeof icon === 'string'
                    ? icon
                    : null;
        if (!iconSrc || iconPosition === 'none') return null;

        return (
            <div className="absolute -right-5 md:-right-28 -top-19 sm:-top-24 md:-top-26 w-32 sm:w-40 lg:w-48 rotate-10 z-30 transition-transform duration-300 group-hover:rotate-12 pointer-events-none">
                <Image src={iconSrc} alt={`${title} icon`} width={208} height={208} />
            </div>
        );
    };

    const hasIcon = iconPosition !== 'none' && (
        (typeof icon === 'object' && icon !== null && 'url' in icon && icon.url) ||
        (typeof icon === 'string' && icon)
    );

    if (!isClient) {
        return (
            <div className={`cursor-pointer transform transition-transform duration-300 hover:scale-102 group ${hasIcon ? 'z-10' : ''}`}>
                <div className="relative pt-6">
                    <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                    <div className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative overflow-hidden bg-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <Link 
            href={`/portfolio/${slug}`} 
            className={`cursor-pointer transform transition-transform duration-300 hover:scale-102 group ${hasIcon ? 'z-10' : ''}`}
        >
            <div className="relative pt-6">
                <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                <div ref={videoContainerRef} className="bg-white h-80 w-full rounded-3xl border-[1.5px] border-red relative overflow-hidden">
                    {hasVideo && finalVideoSrc ? (
                        <>
                            <VideoJS 
                                src={finalVideoSrc} 
                                className="w-full h-full absolute inset-0"
                                poster={posterSrc}
                                autoPlay={true}
                                loop={true}
                                muted={true}
                                controls={false}
                            />
                            {/* Custom Play Button for Mobile - Top Right Corner */}
                            {isMobile && (
                                <button
                                    onClick={handlePlayPause}
                                    className="absolute top-4 right-4 z-40 bg-blue/80 backdrop-blur-sm text-red rounded-full p-3 transition-all duration-200 transform hover:scale-110 focus:outline-none pointer-events-auto shadow-lg"
                                    aria-label={isPlaying ? "Pause video" : "Play video"}
                                    type="button"
                                >
                                    {!isPlaying ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </>
                    ) : imageSrc ? (
                        <Image 
                            src={imageSrc} 
                            alt={title} 
                            fill 
                            className="object-cover opacity-90 z-0"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : null}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                            <span className="text-[23px] font-medium text-red whitespace-nowrap transition-colors duration-300 group-hover:text-blue">
                                {title}
                            </span>
                        </div>
                    </div>
                </div>
                {renderIcon()}
            </div>
        </Link>
    );
};

export default PortfolioCard;


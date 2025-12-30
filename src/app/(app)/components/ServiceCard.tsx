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

interface ServiceCardProps {
    title: string;
    description?: string;
    icon?: string | { url: string; alt?: string } | null;
    link?: string;
    image?: MediaItem | string | null;
    backgroundImage?: string;
    index: number;
}

const HomeServiceCard = ({ title, description, icon, link, image, backgroundImage, index }: ServiceCardProps) => {
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

    const getImageSrc = (): string => {
        if (typeof image === 'object' && image !== null && 'url' in image) {
            return image.url;
        }
        if (typeof image === 'string') {
            return image;
        }
        return backgroundImage || '/images/aboutMe/Portrait.webp';
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

    if (!isClient) {
        return (
            <div className="relative group">
                <div className="pt-6">
                    <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                    <div className="h-80 w-full rounded-3xl border-[1.5px] border-red relative overflow-hidden bg-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group">
            <Link 
                href={link || '#'} 
                className="block cursor-pointer transform transition-transform duration-300 hover:scale-102"
            >
                <div className="pt-6">
                    <div className="absolute inset-x-0 top-0 h-12 bg-red rounded-t-3xl"></div>
                    <div ref={videoContainerRef} className="h-80 w-full rounded-3xl border-[1.5px] border-red relative overflow-hidden">
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
                                        className="absolute top-4 right-4 z-50 bg-blue/80 backdrop-blur-sm text-red rounded-full p-3 transition-all duration-200 transform hover:scale-110 focus:outline-none pointer-events-auto shadow-lg"
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
                        ) : (
                            <Image
                                src={getImageSrc()}
                                alt={title}
                                fill
                                className="object-cover z-0"
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                quality={85}
                            />
                        )}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="bg-blue rounded-full px-6 py-[6.5px] transition-colors duration-300 group-hover:bg-red">
                                <span className="text-[23px] font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-blue">
                                    {title}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {icon && (
                <div className="absolute bottom-0 -right-6 lg:-right-26 sm:-right-15 sm:-bottom-5 lg:-bottom-23 w-32 sm:w-40 lg:w-48 rotate-10 z-[30] pointer-events-none transition-transform duration-300 group-hover:rotate-12 group-hover:scale-102">
                    {typeof icon === 'string' ? (
                        <Image 
                            src={icon} 
                            alt={`${title} icon`} 
                            width={208}
                            height={208}
                            quality={90}
                        />
                    ) : icon?.url ? (
                        <Image 
                            src={icon.url} 
                            alt={icon.alt || `${title} icon`} 
                            width={208}
                            height={208}
                            quality={90}
                        />
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default HomeServiceCard;


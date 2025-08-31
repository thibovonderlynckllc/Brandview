"use client";

import { useEffect, useState } from 'react';
import VideoJS from './VideoJS';

interface MediaItem {
    id: string;
    alt: string;
    url: string;
    filename?: string;
    mimeType?: string;
    cloudinaryMobileVideo?: string;
    poster?: { url: string; alt?: string } | null;
}

interface ServiceVideoProps {
    service: {
        image?: MediaItem | string | null;
    };
}

const ServiceVideo = ({ service }: ServiceVideoProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
        
                const checkDevice = () => {
          // More reliable mobile detection
          const isMobileDevice = () => {
            // Check user agent for mobile/tablet devices - this is the primary method
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileUA = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
            
            // If user agent indicates mobile/tablet, always treat as mobile regardless of screen size
            if (isMobileUA) {
              return true;
            }
            
            // Fallback: check for touch capability (for edge cases)
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            // Only use screen size as a last resort for non-mobile user agents
            const isSmallScreen = window.innerWidth <= 768;
            
            return hasTouch && isSmallScreen;
          };
          
          const mobile = isMobileDevice();
          console.log('ServiceVideo Device detection:', {
            userAgent: navigator.userAgent,
            hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            screenWidth: window.innerWidth,
            isMobile: mobile
          });
          setIsMobile(mobile);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, [isClient]);

    const getVideoSrc = () => {
        if (typeof service.image === 'object' && service.image !== null && 'url' in service.image) {
            return service.image.url;
        }
        return null;
    };

    const getMobileVideoSrc = () => {
        if (typeof service.image === 'object' && service.image !== null && 'cloudinaryMobileVideo' in service.image && service.image.cloudinaryMobileVideo) {
            return service.image.cloudinaryMobileVideo;
        }
        return null;
    };

    const getPosterSrc = () => {
        if (typeof service.image === 'object' && service.image !== null && 'poster' in service.image && service.image.poster) {
            if (typeof service.image.poster === 'object' && service.image.poster !== null && 'url' in service.image.poster) {
                return service.image.poster.url;
            }
        }
        return null;
    };

    const isVideo = (media: MediaItem) => {
        if (!media?.url) return false;
        const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
        return videoExtensions.some(ext => media.url.toLowerCase().includes(ext));
    };

    if (!isClient) {
        return (
            <div className="w-full h-[400px] bg-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    const videoSrc = getVideoSrc();
    if (!videoSrc || !(typeof service.image === 'object' && service.image && isVideo(service.image as MediaItem))) {
        return null;
    }

    // Use mobile video for mobile devices (including iPads), fallback to regular video
    const finalVideoSrc = isMobile ? (getMobileVideoSrc() || videoSrc) : videoSrc;

    return (
        <VideoJS 
            src={finalVideoSrc} 
            className="w-full h-[400px]" 
            poster={getPosterSrc() || undefined}
        />
    );
};

export default ServiceVideo;

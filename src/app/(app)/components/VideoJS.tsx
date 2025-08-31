"use client";

import { useEffect, useRef, useState } from 'react';

// TypeScript declarations for Video.js
declare global {
  interface Window {
    videojs: any;
  }
}

// VideoJS Component using the Video.js library
const VideoJS = ({ 
  src, 
  className, 
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  width = '100%',
  height = '100%'
}: { 
  src: string; 
  className?: string; 
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect device type
  useEffect(() => {
    if (!isClient) return;
    
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, [isClient]);

  // Initialize Video.js with proper timing
  useEffect(() => {
    if (!isClient || !isVideoReady) return;

    // Wait for Video.js to be available
    const initVideoJS = () => {
      if (typeof window === 'undefined' || !window.videojs) {
        // Retry after a short delay if Video.js isn't loaded yet
        setTimeout(initVideoJS, 100);
        return;
      }

      const videoElement = videoRef.current;
      if (!videoElement || !videoElement.parentNode) {
        // Retry if video element isn't ready
        setTimeout(initVideoJS, 100);
        return;
      }

      // Check if player is already initialized
      if (playerRef.current) {
        return;
      }

      try {
        const player = window.videojs(videoElement, {
          controls: isMobile ? true : controls,
          autoplay: isMobile ? false : autoPlay,
          loop: loop,
          muted: muted,
          preload: 'metadata',
          responsive: false,
          fluid: false,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          userActions: {
            hotkeys: true
          }
        }, () => {
          setIsLoaded(true);
          setHasError(false);
          
          // Add event listeners
          player.on('error', () => {
            console.error('Video error occurred');
            setHasError(true);
          });

          player.on('loadeddata', () => {
            setIsLoaded(true);
          });

          player.on('ended', () => {
            if (loop) {
              player.currentTime(0);
              player.play();
            }
          });
        });

        playerRef.current = player;
      } catch (error) {
        console.error('Error initializing Video.js:', error);
        setHasError(true);
      }
    };

    initVideoJS();

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (error) {
          console.error('Error disposing player:', error);
        }
      }
    };
  }, [src, autoPlay, loop, muted, controls, isMobile, isClient, isVideoReady]);

  // Update player when props change
  useEffect(() => {
    if (playerRef.current && isClient) {
      try {
        playerRef.current.src(src);
        playerRef.current.muted(muted);
        playerRef.current.loop(loop);
      } catch (error) {
        console.error('Error updating player:', error);
      }
    }
  }, [src, muted, loop, isClient]);

  // Mark video as ready when it's mounted
  useEffect(() => {
    if (isClient && videoRef.current) {
      setIsVideoReady(true);
    }
  }, [isClient]);

  // Don't render video element until client-side
  if (!isClient) {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-gray-800 flex items-center justify-center absolute inset-0">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin absolute inset-0 w-full h-full"
        data-setup="{}"
        style={{
          objectFit: 'cover'
        }}
      >
        <source src={src} type="video/mp4" />
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">
            supports HTML5 video
          </a>
        </p>
      </video>
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center">
            <p className="text-sm">Video unavailable</p>
            <p className="text-xs opacity-75">Please try again later</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoJS;

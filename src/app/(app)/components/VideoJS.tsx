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
  height = '100%',
  poster
}: { 
  src: string; 
  className?: string; 
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  poster?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [showMuteButton, setShowMuteButton] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect device type
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
      console.log('Device detection:', {
        userAgent: navigator.userAgent,
        hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        screenWidth: window.innerWidth,
        isMobile: mobile
      });
      setIsMobile(mobile);
      setShowMuteButton(!mobile); // Show mute button only on desktop
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, [isClient]);

  // Handle mute toggle
  const toggleMute = () => {
    if (playerRef.current) {
      try {
        const newMutedState = !isMuted;
        playerRef.current.muted(newMutedState);
        setIsMuted(newMutedState);
      } catch (error) {
        console.error('Error toggling mute:', error);
      }
    }
  };

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
          preload: isMobile ? 'none' : 'metadata', // Don't preload on mobile to prevent crashes
          responsive: false,
          fluid: false,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          userActions: {
            hotkeys: true
          },
          poster: poster
        }, () => {
          setIsLoaded(true);
          setHasError(false);
          setIsMuted(muted);
          
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

          // Listen for mute state changes
          player.on('volumechange', () => {
            setIsMuted(player.muted());
          });

          // Explicitly trigger autoplay for desktop
          if (!isMobile && autoPlay && muted) {
            // Small delay to ensure everything is ready
            setTimeout(() => {
              try {
                player.play();
              } catch (error) {
                console.log('Autoplay failed (this is normal in some browsers):', error);
              }
            }, 100);
          }
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
  }, [src, autoPlay, loop, muted, controls, isMobile, isClient, isVideoReady, poster]);

  // Update player when props change
  useEffect(() => {
    if (playerRef.current && isClient) {
      try {
        playerRef.current.src(src);
        playerRef.current.muted(muted);
        playerRef.current.loop(loop);
        if (poster) {
          playerRef.current.poster(poster);
        }
      } catch (error) {
        console.error('Error updating player:', error);
      }
    }
  }, [src, muted, loop, isClient, poster]);

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
        poster={poster}
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
      
      {/* Custom Mute Button for Desktop */}
      {showMuteButton && isLoaded && !hasError && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-10 text-white rounded-full p-2 transition-all duration-200 transform hover:scale-110 focus:outline-none"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.794L4.5 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.5l3.883-2.794a1 1 0 011.617.794zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.794L4.5 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.5l3.883-2.794a1 1 0 011.617.794z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}
      
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

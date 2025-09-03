"use client";

import { useEffect, useRef, useState } from 'react';
import { isMobile as deviceIsMobile, isTablet, isIOS } from 'react-device-detect';

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
  const [isOnMobile, setIsOnMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [showMuteButton, setShowMuteButton] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect device type using react-device-detect
  useEffect(() => {
    if (!isClient) return;
    
    const checkDevice = () => {
      // Use react-device-detect for more reliable device detection
      const mobile = deviceIsMobile || isTablet || isIOS;
      
      console.log('Device detection:', {
        userAgent: navigator.userAgent,
        isMobile: mobile,
        isTablet: isTablet,
        isIOS: isIOS,
        screenWidth: window.innerWidth,
        finalMobile: mobile
      });
      
      setIsOnMobile(mobile);
      setShowMuteButton(!mobile); // Show mute button only on desktop
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, [isClient]);

  // Detect Safari browser
  useEffect(() => {
    const isSafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

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

  // Get the correct video type based on file extension
  const getVideoType = (videoSrc: string) => {
    const extension = videoSrc.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'mov':
        return 'video/quicktime';
      case 'avi':
        return 'video/x-msvideo';
      default:
        return 'video/mp4'; // fallback
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
          controls: isOnMobile ? true : controls,
          autoplay: isOnMobile ? false : autoPlay,
          loop: loop,
          muted: muted,
          preload: isSafari ? 'metadata' : (isOnMobile ? 'metadata' : 'auto'),
          responsive: false,
          fluid: false,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          userActions: {
            hotkeys: true
          },
          poster: poster,
          // Safari-specific options
          html5: {
            hls: {
              overrideNative: true
            }
          }
        }, () => {
          setIsLoaded(true);
          setHasError(false);
          setIsMuted(muted);
          
          // Add event listeners
          player.on('error', (error: any) => {
            console.error('Video error occurred:', error);
            setHasError(true);
            
            // Safari-specific error handling
            if (isSafari) {
              console.log('Safari video error - trying fallback');
              // Try to reload with different settings
              setTimeout(() => {
                try {
                  player.src(src);
                  player.load();
                } catch (e) {
                  console.error('Safari fallback failed:', e);
                }
              }, 1000);
            }
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
          if (!isOnMobile && autoPlay && muted) {
            // Safari-compatible autoplay
            const playPromise = player.play();
            if (playPromise !== undefined) {
              playPromise.catch((error: any) => {
                console.log('Autoplay failed (this is normal in some browsers):', error);
                // Safari often blocks autoplay - this is expected behavior
              });
            }
          }
        });

        // As an extra safeguard, try to play once canplay fires (first visit cases)
        player.on('canplay', () => {
          if (!isOnMobile && autoPlay && muted) {
            try { player.play(); } catch {}
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
  }, [src, autoPlay, loop, muted, controls, isOnMobile, isClient, isVideoReady, poster, isSafari]);

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
        playsInline
        muted={muted}
        controls={isOnMobile}
        style={{
          objectFit: 'cover'
        }}
      >
        {/* Use dynamic MIME type detection for better compatibility */}
        <source src={src} type={getVideoType(src)} />
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
      
      {/* Loading indicator (don't cover poster if provided) and never on mobile */}
      {!isLoaded && !hasError && !poster && !isOnMobile && (
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
